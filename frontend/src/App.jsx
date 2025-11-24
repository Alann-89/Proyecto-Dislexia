import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Contexto y Seguridad
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './componentes/auth/ProtectedRoute';

// Componentes
import ScreeningDislexia from './componentes/screening/ScreeningDislexia';
import EjerciciosApp from './componentes/exercises/EjerciciosApp';
import AuthPage from './componentes/auth/AuthPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* RUTA PÚBLICA: Login/Registro */}
        <Route path="/auth" element={<AuthPage />} />

        {/* RUTAS PROTEGIDAS (El usuario debe estar logueado) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<ScreeningDislexia />} />
          <Route path="/ejercicios" element={<EjerciciosApp />} />
        </Route>

        {/* Ruta por defecto: Si no existe, mandar al inicio */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;