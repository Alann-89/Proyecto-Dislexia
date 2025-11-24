class AdaptiveRecommendationEngine {
  constructor() {
    this.exerciseDatabase = {
      conciencia_fonologica: ['E01', 'E02', 'E03'],
      ruta_fonologica: ['E03', 'E04'],
      ortografia: ['E05', 'E09'],
      comprension: ['E07', 'E08'],
      fluidez: ['E06'],
      vocabulario: ['E08', 'E09']
    };
  }

  async generateRecommendations(patterns, userProfile) {
    const recommendations = [];
    const exercisePriority = {};
    
    for (const pattern of patterns) {
      const relatedSkills = this.mapPatternToSkills(pattern.pattern);
      
      for (const skill of relatedSkills) {
        const exercises = this.exerciseDatabase[skill] || [];
        exercises.forEach(ex => {
          exercisePriority[ex] = (exercisePriority[ex] || 0) + 
                                  pattern.confidence * this.getSkillWeight(skill);
        });
      }
    }
    
    const sortedExercises = Object.entries(exercisePriority)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
    
    for (const [exerciseId, priority] of sortedExercises) {
      const exerciseInfo = await this.getExerciseInfo(exerciseId);
      recommendations.push({
        ...exerciseInfo,
        priority: Math.round(priority * 100)
      });
    }
    
    return recommendations;
  }

  mapPatternToSkills(pattern) {
    const mapping = {
      'dislexia_fonologica': ['conciencia_fonologica', 'ruta_fonologica'],
      'dislexia_superficial': ['ortografia', 'vocabulario'],
      'deficit_comprension': ['comprension', 'vocabulario'],
      'lector_compensado': ['fluidez'],
      'mejora_comprension': ['comprension']
    };
    
    return mapping[pattern] || [];
  }

  getSkillWeight(skill) {
    const weights = {
      'conciencia_fonologica': 1.5,
      'ruta_fonologica': 1.4,
      'comprension': 1.3,
      'ortografia': 1.2,
      'fluidez': 1.1
    };
    
    return weights[skill] || 1.0;
  }

  async getExerciseInfo(exerciseId) {
    const exercises = {
      'E01': { id: 'E01', titulo: 'Cazador de Rimas', categoria: 'Conciencia Fonológica', descripcion_corta: 'Mejora tu conciencia fonológica identificando palabras que riman.' },
      'E02': { id: 'E02', titulo: 'Separador de Sílabas', categoria: 'Conciencia Fonológica', descripcion_corta: 'Practica dividiendo palabras en sílabas.' },
      'E03': { id: 'E03', titulo: 'Sonidos y Letras', categoria: 'Fonología', descripcion_corta: 'Asocia sonidos con sus letras correspondientes.' },
      'E04': { id: 'E04', titulo: 'Palabras Reales vs Inventadas', categoria: 'Decodificación', descripcion_corta: 'Desarrolla tu ruta fonológica distinguiendo palabras.' },
      'E05': { id: 'E05', titulo: 'Ortografía en Contexto', categoria: 'Ortografía', descripcion_corta: 'Ejercicios de opción múltiple para reforzar la ortografía.' },
      'E06': { id: 'E06', titulo: 'Lectura Cronometrada', categoria: 'Fluidez', descripcion_corta: 'Mejora tu velocidad lectora manteniendo la comprensión.' },
      'E07': { id: 'E07', titulo: 'Comprensión Activa', categoria: 'Comprensión', descripcion_corta: 'Lee textos y responde preguntas de comprensión.' },
      'E08': { id: 'E08', titulo: 'Predicción Textual', categoria: 'Comprensión', descripcion_corta: 'Desarrolla habilidades predictivas al leer.' },
      'E09': { id: 'E09', titulo: 'Construcción de Oraciones', categoria: 'Sintaxis', descripcion_corta: 'Practica la construcción correcta de oraciones.' }
    };
    
    return exercises[exerciseId] || { id: exerciseId, titulo: 'Ejercicio', categoria: 'General', descripcion_corta: 'Ejercicio de práctica.' };
  }
}

module.exports = AdaptiveRecommendationEngine;