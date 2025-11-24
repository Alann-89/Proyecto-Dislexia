import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute() {
  const { user } = useAuth();

  // Si no hay usuario, redirigir al login
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Si hay usuario, dejar pasar (renderizar la ruta hija)
  return <Outlet />;
}