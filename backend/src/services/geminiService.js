const { 
  GoogleGenerativeAI, 
  HarmCategory, 
  HarmBlockThreshold 
} = require('@google/generative-ai');
const Screening = require('../models/Screening');
const PatternDetector = require('./patternDetector');
const AdaptiveRecommendationEngine = require('./recommendationEngine');

require('dotenv').config(); 

// Verificación de seguridad
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("ERROR FATAL: No se encontró GEMINI_API_KEY en las variables de entorno.");
} else {
  console.log("API Key cargada: " + apiKey.substring(0, 5) + "..."); 
}

const genAI = new GoogleGenerativeAI(apiKey);

// Configuración de generación
const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 16000,
  responseMimeType: "application/json", 
};

// --- CONFIGURACIÓN DE SEGURIDAD ---
const safetySettings = [
  {category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE,},
  {category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE,},
  {category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE,},
  {category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE,},
];

// --- FUNCIÓN 1: ANÁLISIS INICIAL Y GENERACIÓN MASIVA ---
async function analizarConGemini(perfil, resultados_test, userId = null) {
  try {
    const patternDetector = new PatternDetector();
    const recommendationEngine = new AdaptiveRecommendationEngine();
    
    // A. Obtener historial
    let userHistory = [];
    if (userId) {
       userHistory = await Screening.find({ userId: userId }).sort({ fecha: -1 }).limit(5);
    }
    
    // B. Detectar patrones
    const detectedPatterns = await patternDetector.detectPatterns(
      { resultados_test, perfil },
      userHistory
    );
    
    // C. Construir Prompt Maestro
    const prompt = buildAdvancedPrompt(
      perfil,
      resultados_test,
      detectedPatterns,
      userHistory
    );
    
    // D. Llamar a Gemini
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-pro', 
      generationConfig,
      safetySettings
    });
    
    console.log("Analizando perfil y generando ejercicios adaptados...");
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let texto = response.text()
    
    // E. Extracción y Limpieza de JSON
    const jsonString = extractJSON(texto);
    if (!jsonString) throw new Error("La IA no generó un formato JSON válido.");

    let analisisBase;
    try {
      analisisBase = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Error parseando JSON:', parseError);
      // Fallback básico
      analisisBase = {
          perfil_identificado: "Análisis completado con datos parciales.",
          areas_fortaleza: ["Participación"],
          areas_a_practicar: ["Práctica general"],
          explicacion_amigable: "Hemos registrado tus resultados. Por favor intenta generar los ejercicios nuevamente.",
          ejercicios_generados: [] // Usará el fallback estático
      };
    }
    
    // 4. Fusión Inteligente: Priorizar contenido generado por IA
    let ejerciciosFinales = [];

    // Verificamos si la IA devolvió la lista de ejercicios generados
    if (analisisBase.ejercicios_generados && Array.isArray(analisisBase.ejercicios_generados)) {
        // Mapeamos para asegurar consistencia con lo que espera el frontend
        for (const iaEx of analisisBase.ejercicios_generados) {
             // Obtenemos metadatos base (título, color, icono) del motor estático
             const staticInfo = await recommendationEngine.getExerciseInfo(iaEx.id_ejercicio);
             
             ejerciciosFinales.push({
                 ...staticInfo, // Mantiene consistencia visual
                 id_ejercicio: iaEx.id_ejercicio,
                 es_prioritario: iaEx.es_prioritario || false, // La IA decide si es prioritario
                 descripcion_corta: iaEx.descripcion_corta || staticInfo.descripcion_corta,
                 contenido_generado: iaEx.contenido_generado // ¡El contenido nuevo!
             });
        }
    } else {
        console.warn("Fallback: La IA no generó ejercicios, usando estáticos.");
        const recomendacionesEstaticas = await recommendationEngine.generateRecommendations(detectedPatterns, perfil);
        ejerciciosFinales = recomendacionesEstaticas.map(ex => ({
            id_ejercicio: ex.id,
            es_prioritario: true,
            titulo: ex.titulo,
            descripcion_corta: ex.descripcion_corta,
            contenido_generado: null 
        }));
    }
    
    // G. Construcción del Objeto Final
    const analisisCompleto = {
      ...analisisBase, // Mantiene perfil, fortalezas, explicación de la IA
      analisis_avanzado: {
        patrones_detectados: detectedPatterns.map(p => ({
          tipo: p.pattern,
          confianza: Math.round(p.confidence * 100),
          indicadores: p.indicators
        })),
        tendencias: userHistory.length > 1 ? calcularTendencias(userHistory) : null,
        nivel_adaptativo: determinarNivelAdaptativo(resultados_test, perfil.edad)
      },
      // Aquí asignamos la lista fusionada que respeta el contenido de la IA
      ejercicios_recomendados: ejerciciosFinales 
    };
    
    return analisisCompleto;
    
  } catch (error) {
    console.error('Error crítico en analizarConGemini:', error);
    throw new Error("Hubo un problema generando el análisis. Por favor intenta de nuevo.");
  }
}

function buildAdvancedPrompt(perfil, resultados_test, patterns, history) {
  const baremos = new PatternDetector().getAdaptiveBaremos(perfil.edad);

  // Cálculos de tasas
  const concienciaRate = (resultados_test.modulo_a_aciertos / resultados_test.modulo_a_total) * 100;
  const nonwordsRate = (resultados_test.modulo_b_nonwords_aciertos / resultados_test.modulo_b_nonwords_total) * 100;
  const palabrasPorMinuto = (resultados_test.modulo_c_fluidez_palabras_texto / resultados_test.modulo_c_fluidez_tiempo_s) * 60;
  const comprensionRate = (resultados_test.modulo_c_comprension_aciertos /  resultados_test.modulo_c_comprension_total) * 100;
  const ortografiaRate = (resultados_test.modulo_d_ortografia_aciertos / resultados_test.modulo_d_ortografia_total) * 100;
  
  const patternsDescription = patterns.length > 0 
    ? patterns.map(p => `- ${p.pattern}`).join(', ')
    : 'No se detectaron patrones específicos de riesgo';
  
  const historyContext = history.length > 0 
    ? `\nHistorial del usuario (últimas ${history.length} evaluaciones): Este usuario ha realizado evaluaciones previas, lo que permite análisis de tendencias.`
    : '\nEsta es la primera evaluación del usuario.';

  return `Eres un experto clínico en Dislexia y Dificultades de Aprendizaje.
OBJETIVO: Detectar riesgo de dislexia y crear un plan de intervención personalizado.

CONTEXTO:
- Edad: ${perfil.edad} años
- Escolaridad: ${perfil.escolaridad}
${historyContext}

PATRONES:
${patternsDescription}

RESULTADOS:
1. Conciencia Fonológica: ${concienciaRate.toFixed(1)}% (Baremo: >${(baremos.conciencia_fonologica * 100).toFixed(0)}%)
2. Ruta Fonológica (No-palabras): ${nonwordsRate.toFixed(1)}% - ${resultados_test.modulo_b_nonwords_tiempo_ms}ms (Baremo: >${(baremos.nonwords_rate * 100).toFixed(0)}%)
3. Fluidez Lectora: ${palabrasPorMinuto.toFixed(0)} PPM (Baremo: >${baremos.palabras_por_minuto} PPM)
4. Comprensión: ${comprensionRate.toFixed(1)}% (Baremo: >${(baremos.comprension * 100).toFixed(0)}%)
5. Ortografía: ${ortografiaRate.toFixed(1)}% (Baremo: >${(baremos.ortografia * 100).toFixed(0)}%)

TAREA:
1. **Análisis:** Redacta una explicación empática pero técnica sobre las fortalezas y áreas de mejora. Evita diagnosticar, usa términos como "riesgo", "dificultad en", "oportunidad".
2. **Selección:** Identifica los 4 ejercicios MÁS CRÍTICOS para este perfil y márcalos como "es_prioritario": true.
3. **GENERACIÓN DE CONTENIDO (El corazón de la intervención):**
   Genera contenido para TODOS los 9 ejercicios (E01-E09), adaptando la dificultad:
   - **Si hay fallo fonológico:** E01, E02, E03 deben ser intensivos.
   - **Si hay fallo visual/ortográfico:** E04, E05 deben usar palabras trampas visuales (b/d, p/q).
   - **Adaptación por Edad:**
     * 7-9 años: Palabras cortas, concretas, frecuentes (sol, casa, pan). Rimas simples.
     * 10-12 años: Palabras trísílabas/polisílabas, vocabulario escolar medio.
     * 13+ años/Adultos: Vocabulario académico, palabras abstractas, oraciones complejas.

IMPORTANTE:
- NO emitas diagnósticos clínicos (no uses palabras como "dislexia", "trastorno", "déficit")
- Usa lenguaje claro, motivador y constructivo
- Basa conclusiones en datos objetivos
- Considera el desarrollo normativo según edad
- Enfócate en áreas de mejora como oportunidades de crecimiento

ESTRUCTURAS JSON REQUERIDAS (contenido_generado):
- E01 (Rimas): { "preguntas": [{ "palabra": "...", "opciones": ["...", "...", "...", "..."], "correcta": "..." }] } (Generar 10 items)
- E02 (Sílabas): { "preguntas": [{ "palabra": "...", "opciones": [num1, num2, num3, num4], "correcta": num_correcto }] } (Generar 7 items)
- E03 (Sonidos): { "preguntas": [{ "sonido": "/s/", "opciones": ["s", "c", "z"], "correcta": "s" }] } (Generar 10 items) (IMPORTANTE: Opciones son letras sueltas)
- E04 (Palabras Reales): { "palabras": [{ "palabra": "...", "esReal": boolean }] } (Generar 10 items mezclados)
- E05 (Ortografía): { "preguntas": [{ "imagen": "EMOJI_AQUI", "opciones": ["mal", "bien"], "correcta": "bien" }] } (Generar 10 items usando emojis representativos)
- E06 (Lectura): { "texto": "Un texto de 50-100 palabras adaptado al nivel...", "preguntas": [{ "pregunta": "...", "opciones": ["...", "...", "..."], "correcta": "..." }] } (Generar 1 texto y 5 preguntas)
- E07 (Comprensión): { "textos": [{ "texto": "Párrafo breve...", "preguntas": [{ "pregunta": "...", "opciones": ["...", "...", "..."], "correcta": "..." }] }] } (Generar 1 texto y 5 preguntas)
- E08 (Predicción): { "oraciones": [{ "texto": "Inicio de oración...", "opciones": ["...", "...", "..."], "correcta": "..." }] } (Generar 8 items)
- E09 (Oraciones): { "ejercicios": [{ "palabras": ["desordenada1", "desordenada2", ...], "correcta": "Oración ordenada" }] } (Generar 4 items)

REGLAS ESTRICTAS DE FORMATO:
1. Tu respuesta DEBE SER exclusivamente un JSON válido. NO incluyas explicaciones, saludos, comentarios, markdown, ni texto fuera del JSON.
2. No incluyas saltos de línea fuera de los valores del JSON.
3. No incluyas comas finales, comentarios o código adicional.
4. Todos los textos deben ir entre comillas dobles.
5. Si algún valor no es aplicable, usa "" o [].
6. Antes de responder, valida internamente que el JSON sea válido según RFC 8259.
7. Si algo del contenido solicitado NO puede generarse, reemplaza con valores vacíos.

RESPUESTA JSON ESTRICTA:
{
  "perfil_identificado": "Descripción del perfil lector en 2-3 frases...",
  "areas_fortaleza": ["Habilidad 1", "Habilidad 2"],
  "areas_a_practicar": ["Área 1", "Área 2"],
  "explicacion_amigable": "Explicación para el usuario...",
  "hipotesis_cognitiva": "Explicación técnica...",
  "aviso_profesional": "Recuerda que esta herramienta es de apoyo educativo..."
  "ejercicios_generados": [
    {
      "id_ejercicio": "E01",
      "es_prioritario": true/false,
      "descripcion_corta": "Razón específica de recomendación...",
      "contenido_generado": { ...JSON ESPECIFICO... }
    },
    ... (REPETIR PARA TODOS LOS EJERCICIOS DEL E01 AL E09) ...
  ]
}`;
}

async function generarNuevosEjerciciosConGemini(screening, ejerciciosAActualizar = []) {
  try {
    const perfil = screening.perfil;
    const areasDebiles = screening.analisis_ia?.areas_a_practicar?.join(", ") || "General";
    
    // Si no nos pasan ejercicios específicos, elegimos 3 por defecto (comportamiento anterior)
    // Pero si nos pasan una lista (ej: ['E01', 'E05']), la IA se enfocará solo en esos.
    const enfoqueInstruccion = ejerciciosAActualizar.length > 0
      ? `Genera NUEVO contenido EXCLUSIVAMENTE para estos ejercicios: ${ejerciciosAActualizar.join(', ')}.`
      : `Genera 4 ejercicios recomendados (Elegir de IDs E01 a E09) enfocados en las áreas débiles.`;

    const prompt = `
      Actúa como especialista en Dificultades de Aprendizaje y Dislexia.
      OBJETIVO: Crear material de refuerzo fresco y adaptado para evitar la memorización.
      
      PERFIL: Edad ${perfil.edad}, ${perfil.escolaridad}.
      ÁREAS DÉBILES: ${areasDebiles}.

      INSTRUCCIÓN:
      ${enfoqueInstruccion}
      El contenido debe ser distinto al anterior. Usa vocabulario acorde a la edad.

      ESTRUCTURAS JSON REQUERIDAS (Mismos formatos):
      - E01 (Rimas): { "preguntas": [{ "palabra": "...", "opciones": ["...", "...", "...", "..."], "correcta": "..." }] } (Generar 10 items)
      - E02 (Sílabas): { "preguntas": [{ "palabra": "...", "opciones": [num1, num2, num3, num4], "correcta": num_correcto }] } (Generar 7 items)
      - E03 (Sonidos): { "preguntas": [{ "sonido": "/s/", "opciones": ["s", "c", "z"], "correcta": "s" }] } (Generar 10 items) (IMPORTANTE: Opciones son letras sueltas)
      - E04 (Palabras Reales): { "palabras": [{ "palabra": "...", "esReal": boolean }] } (Generar 10 items mezclados)
      - E05 (Ortografía): { "preguntas": [{ "imagen": "EMOJI_AQUI", "opciones": ["mal", "bien"], "correcta": "bien" }] } (Generar 10 items usando emojis representativos)
      - E06 (Lectura): { "texto": "Un texto de 50-100 palabras adaptado al nivel...", "preguntas": [{ "pregunta": "...", "opciones": ["...", "...", "..."], "correcta": "..." }] } (Generar 1 texto y 5 preguntas)
      - E07 (Comprensión): { "textos": [{ "texto": "Párrafo breve...", "preguntas": [{ "pregunta": "...", "opciones": ["...", "...", "..."], "correcta": "..." }] }] } (Generar 1 texto y 5 preguntas)
      - E08 (Predicción): { "oraciones": [{ "texto": "Inicio de oración...", "opciones": ["...", "...", "..."], "correcta": "..." }] } (Generar 8 items)
      - E09 (Oraciones): { "ejercicios": [{ "palabras": ["desordenada1", "desordenada2", ...], "correcta": "Oración ordenada" }] } (Generar 4 items)
      
      FORMATO RESPUESTA (JSON Estricto):
      {
        "ejercicios_generados": [
          {
            "id_ejercicio": "ID",
            "es_prioritario": true,
            "descripcion_corta": "Nueva serie de práctica",
            "contenido_generado": { ...ESTRUCTURA... }
          }
        ]
      }
    `;

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-pro', 
      generationConfig,
      safetySettings
    });

    console.log(`🔄 Regenerando ejercicios específicos: ${ejerciciosAActualizar.join(', ') || 'AUTO'} ...`);

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const texto = response.text();
    const jsonString = extractJSON(texto);
    
    if (!jsonString) throw new Error("Error generando JSON");
    
    const data = JSON.parse(jsonString);
    return data.ejercicios_generados || data.ejercicios_recomendados;

  } catch (error) {
    console.error("Error regenerando ejercicios:", error);
    throw error;
  }
}

function calcularTendencias(history) {
  if (history.length < 2) return null;
  const comprensiones = history.map(h => h.resultados_test.modulo_c_comprension_aciertos / h.resultados_test.modulo_c_comprension_total);
  const ortografias = history.map(h => h.resultados_test.modulo_d_ortografia_aciertos / h.resultados_test.modulo_d_ortografia_total);
  return {
    comprension: calcularTendenciaSimple(comprensiones),
    ortografia: calcularTendenciaSimple(ortografias)
  };
}

function calcularTendenciaSimple(values) {
  const first = values[values.length - 1];
  const last = values[0];
  const change = ((last - first) / first) * 100;
  if (change > 10) return 'mejora_significativa';
  if (change > 5) return 'mejora_moderada';
  if (change < -10) return 'declive';
  return 'estable';
}

function determinarNivelAdaptativo(resultados, edad) {
  const baremos = new PatternDetector().getAdaptiveBaremos(edad);
  const features = new PatternDetector().extractFeatures({ resultados_test: resultados, perfil: { edad } });
  let score = 0;
  let total = 0;
  Object.keys(features).forEach(key => {
    if (key.startsWith('bajo_')) {
      total++;
      if (!features[key]) score++;
    }
  });
  const percentage = total > 0 ? (score / total) * 100 : 80;
  if (percentage >= 80) return 'avanzado';
  if (percentage >= 60) return 'intermedio';
  if (percentage >= 40) return 'basico';
  return 'refuerzo';
}

function extractJSON(text) {
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    return text.substring(firstBrace, lastBrace + 1);
  }
  return null;
}


module.exports = {
  analizarConGemini,
  generarNuevosEjerciciosConGemini
};