const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const screeningRoutes = require('./routes/screening.routes');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/auth.routes');

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar a MongoDB
connectDB();

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/screening', screeningRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'NeuroLectura API funcionando' });
});

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});