const express = require('express');
const router = express.Router();
const Screening = require('../models/Screening');
const { analizarConGemini,generarNuevosEjerciciosConGemini } = require('../services/geminiService');
const authMiddleware = require('../middleware/authMiddleware');

// POST - Crear nuevo screening y analizar con IA
router.post('/analizar', authMiddleware, async (req, res, next) => {
  try {
    const { perfil, resultados_test } = req.body;
    const userId = req.user.id;

    // Validar datos
    if (!perfil || !perfil.edad || !perfil.escolaridad) {
      return res.status(400).json({ 
        error: 'Datos de perfil incompletos' 
      });
    }

    if (!resultados_test) {
      return res.status(400).json({ 
        error: 'Resultados del test no proporcionados' 
      });
    }

    // Analizar con Gemini
    console.log('Iniciando análisis con Gemini para usuario:', userId);
    const analisis_ia = await analizarConGemini(perfil, resultados_test, userId);
    console.log('Análisis completado');

    // Guardar en base de datos
    const screening = new Screening({
      userId,
      perfil,
      resultados_test,
      analisis_ia
    });

    await screening.save();
    console.log('💾 Screening guardado en DB');

    res.json({
      success: true,
      screening_id: screening._id,
      analisis: analisis_ia
    });

  } catch (error) {
    next(error);
  }
});

// GET - Obtener historial de screenings por edad
router.get('/historial', authMiddleware, async (req, res, next) => {
  try {
    const userId = req.user.id; // Obtenemos ID del token

    const screenings = await Screening.find({ userId })
    .sort({ fecha: -1 })
    .limit(10);

    res.json({
      success: true,
      count: screenings.length,
      screenings
    });

  } catch (error) {
    next(error);
  }
});

// GET - Obtener un screening específico
router.get('/:id', authMiddleware, async (req, res, next) => {
  try {
    const screening = await Screening.findOne({
      _id: req.params.id,
      userId: req.user.id // Seguridad extra: Solo si le pertenece al usuario
    });

    if (!screening) {
      return res.status(404).json({ 
        error: 'Screening no encontrado' 
      });
    }

    res.json({
      success: true,
      screening
    });

  } catch (error) {
    next(error);
  }
});

// GET - Obtener estadísticas generales
router.get('/stats/general', async (req, res, next) => {
  try {
    const totalScreenings = await Screening.countDocuments();
    
    const estadisticasPorEdad = await Screening.aggregate([
      {
        $group: {
          _id: '$perfil.edad',
          count: { $sum: 1 },
          avgComprension: { 
            $avg: { 
              $divide: [
                '$resultados_test.modulo_c_comprension_aciertos',
                '$resultados_test.modulo_c_comprension_total'
              ]
            }
          },
          avgOrtografia: {
            $avg: {
              $divide: [
                '$resultados_test.modulo_d_ortografia_aciertos',
                '$resultados_test.modulo_d_ortografia_total'
              ]
            }
          }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      success: true,
      total_screenings: totalScreenings,
      por_edad: estadisticasPorEdad
    });

  } catch (error) {
    next(error);
  }
});

// POST - Regenerar solo los ejercicios basados en un screening previo
router.post('/regenerar-ejercicios', authMiddleware, async (req, res, next) => {
  try {
    const { screeningId, exerciseIds } = req.body;
    const userId = req.user.id;

    // 1. Buscamos el screening original para saber el nivel del usuario
    const screening = await Screening.findOne({ _id: screeningId, userId });

    if (!screening) {
      return res.status(404).json({ error: 'Evaluación no encontrada' });
    }

    // 2. Pasamos los IDs al servicio
    const nuevosEjercicios = await generarNuevosEjerciciosConGemini(screening, exerciseIds);

    // 3. FUSIÓN INTELIGENTE EN LA BD
    // No borramos los viejos, solo actualizamos los que regeneramos
    let ejerciciosActuales = screening.analisis_ia.ejercicios_recomendados || [];

    // Crear un mapa para actualizar fácil
    const mapaNuevos = new Map(nuevosEjercicios.map(ex => [ex.id_ejercicio, ex]));

    // Reemplazar los existentes o agregar nuevos
    const listaActualizada = ejerciciosActuales.map(ex => {
        if (mapaNuevos.has(ex.id_ejercicio)) {
            return mapaNuevos.get(ex.id_ejercicio); // Reemplaza con el nuevo
        }
        return ex; // Mantiene el viejo si no se regeneró
    });

    // Si la IA trajo alguno nuevo que no estaba antes, lo agregamos (opcional)
    nuevosEjercicios.forEach(nuevo => {
        if (!ejerciciosActuales.find(ex => ex.id_ejercicio === nuevo.id_ejercicio)) {
            listaActualizada.push(nuevo);
        }
    });

    // 3. Actualizamos el screening en la BD con los nuevos ejercicios
    // Opcional: Podrías guardar un historial de ejercicios, pero por ahora reemplacemos
    screening.analisis_ia.ejercicios_recomendados = listaActualizada;
    
    // Mongoose a veces no detecta cambios en objetos mixtos, marcamos como modificado
    screening.markModified('analisis_ia'); 
    await screening.save();

    res.json({
      success: true,
      nuevos_ejercicios: listaActualizada
    });

  } catch (error) {
    next(error);
  }
});

module.exports = router;