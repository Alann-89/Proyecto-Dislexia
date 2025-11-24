const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err);

  // Error de validación de Mongoose
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Error de validación',
      details: Object.values(err.errors).map(e => e.message)
    });
  }

  // Error de cast de Mongoose (ID inválido)
  if (err.name === 'CastError') {
    return res.status(400).json({
      error: 'ID inválido'
    });
  }

  // Error de API de Gemini
  if (err.message.includes('Gemini') || err.message.includes('API')) {
    return res.status(503).json({
      error: 'Error en el servicio de análisis IA',
      message: 'Por favor intenta nuevamente en unos momentos'
    });
  }

  // Error genérico
  res.status(500).json({
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo salió mal'
  });
};

module.exports = errorHandler;