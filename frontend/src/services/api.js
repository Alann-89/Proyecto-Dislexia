const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Función auxiliar para headers con token
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const api = {
  // --- AUTH ---
  async login(credentials) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al iniciar sesión');
    }
    return response.json();
  },

  async register(userData) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al registrarse');
    }
    return response.json();
  },

  // --- SCREENING (Actualizado con Token) ---
  async analizar(perfil, resultados_test) {
    const response = await fetch(`${API_URL}/screening/analizar`, {
      method: 'POST',
      headers: getAuthHeaders(), // <--- Ahora envía el token si existe
      body: JSON.stringify({ perfil, resultados_test })
    });
    if (!response.ok) throw new Error('Error en el servidor');
    return response.json();
  },

  // --- HISTORIAL ---
  async obtenerHistorial() {
    const response = await fetch(`${API_URL}/screening/historial`, {
      headers: getAuthHeaders()
    });
    if (!response.ok) throw new Error('Error al obtener historial');
    return response.json();
  },

  async regenerarEjercicios(screeningId, exerciseIds = []) {
    const response = await fetch(`${API_URL}/screening/regenerar-ejercicios`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ 
        screeningId,
        exerciseIds
      })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al regenerar');
    }
    
    return response.json();
  }
};