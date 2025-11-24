# NeuroLectura - Plataforma de Evaluación y Entrenamiento Lector con IA

NeuroLectura es una aplicación web Full Stack diseñada para identificar perfiles de riesgo de dislexia y generar planes de entrenamiento personalizados mediante Inteligencia Artificial Generativa.

<img width="1904" height="1043" alt="image" src="https://github.com/user-attachments/assets/ba2dec7b-77cc-424d-877d-e87f5ff19bf4" />


## Características Principales

Evaluación Diagnóstica Interactiva: Módulos gamificados para evaluar Conciencia Fonológica, Ruta Fonológica, Fluidez, Comprensión y Ortografía.

Análisis con IA (Gemini 1.5 Flash): Un motor de IA analiza los resultados en tiempo real para detectar patrones clínicos (sin sustituir un diagnóstico médico).

Contenido Adaptativo Generativo: La IA genera ejercicios únicos y personalizados (no estáticos) adaptando el vocabulario y la dificultad a la edad y los errores específicos del usuario.

Sistema de Bloqueo y Progresión: Gamificación que motiva al usuario a completar ejercicios para desbloquear nuevas generaciones de contenido.

Reportes en PDF: Generación automática de informes detallados para padres o educadores.

Accesibilidad: Interfaz amigable con Text-to-Speech integrado para lectura de ejercicios.

## Tecnologías Utilizadas

### Frontend

React + Vite: Para una interfaz rápida y reactiva.

Styled Components: Para un sistema de diseño modular y consistente.

Lucide React: Iconografía moderna.

React Router: Manejo de navegación y rutas protegidas.

jsPDF & autoTable: Generación de reportes en el cliente.

### Backend

Node.js & Express: Servidor API RESTful.

MongoDB & Mongoose: Base de datos NoSQL para usuarios y registros de evaluaciones.

Google Gemini API: Motor de inteligencia artificial para análisis y generación de contenido.

JWT & Bcrypt: Autenticación segura y encriptación de contraseñas.

## Instalación y Configuración

Sigue estos pasos para correr el proyecto localmente:

1. Clonar el repositorio

```bash
git clone https://www.google.com/search?q=https://github.com/tu-usuario/neurolectura.git
cd neurolectura
```

2. Configurar el Backend

```bash
cd backend
npm install
```

Crea un archivo .env en la carpeta backend con las siguientes variables:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/neurolectura  # O tu URL de Mongo Atlas
GEMINI_API_KEY=tu_api_key_de_google_aqui
JWT_SECRET=tu_palabra_secreta_segura
```

Inicia el servidor:
```bash
npm run dev
```

3. Configurar el Frontend

Abre una nueva terminal:
```bash
cd frontend
npm install
npm run dev
```

La aplicación estará corriendo en http://localhost:5173.

## Arquitectura de la IA

El núcleo de NeuroLectura utiliza un enfoque híbrido para la generación de contenido:

Recolección de Datos: El frontend captura métricas precisas (tiempo de respuesta en ms, tipos de errores).

Prompt Engineering Dinámico: El backend construye un prompt complejo inyectando el perfil del usuario, baremos esperados por edad y patrones detectados.

Generación Estructurada: Se fuerza a Gemini a responder en formato JSON estricto, creando arrays de preguntas, opciones y respuestas correctas.

Fusión de Datos: El sistema fusiona los metadatos estáticos (iconos, colores, títulos) con el contenido dinámico generado por la IA.

## Seguridad

Todas las rutas de la API (excepto login/registro) están protegidas mediante middleware de verificación de JWT.

Las contraseñas se almacenan con hash (bcrypt).

Validación de seguridad en la IA para evitar contenido inapropiado.

## Licencia

Desarrollado por Alan Josue Garcia Quintero.
