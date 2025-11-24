const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar Usuario
exports.register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // 1. Verificar si ya existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: 'El correo ya está registrado' });
    }

    // 2. Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Crear usuario
    user = new User({
      nombre,
      email,
      password: hashedPassword
    });

    await user.save();

    // 4. Crear Token (Login automático al registrarse)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d' // La sesión dura 7 días
    });

    res.json({ 
      success: true, 
      token, 
      user: { id: user._id, nombre: user.nombre, email: user.email } 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

// Iniciar Sesión
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Verificar si existe el usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    // 2. Verificar contraseña
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    // 3. Crear Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.json({ 
      success: true, 
      token, 
      user: { id: user._id, nombre: user.nombre, email: user.email } 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};