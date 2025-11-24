const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Leer el token del header (Formato: "Bearer eyJhbGci...")
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. No hay token.' });
  }

  try {
    // Verificar si el token es real usando tu secreto
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Guardamos los datos del usuario en la petición
    next(); // Dejamos pasar
  } catch (error) {
    res.status(400).json({ error: 'Token inválido.' });
  }
};

module.exports = authMiddleware;