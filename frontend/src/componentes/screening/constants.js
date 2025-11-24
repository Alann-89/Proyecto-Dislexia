// Datos de las pruebas
export const PALABRAS_REALES = ['casa', 'mesa', 'perro', 'gato', 'libro', 'árbol', 'flor', 'sol', 'luna', 'agua'];
export const PALABRAS_INVENTADAS = ['plifo', 'broli', 'terca', 'numbe', 'glapo', 'fruti', 'blome', 'drato', 'clibe', 'smola'];

export const TEXTO_LECTURA = {
  '7-9': {
    texto: 'El gato negro subió al árbol. Era un árbol muy alto. El gato tenía miedo de bajar. Un niño lo vio y le ayudó. El gato estaba muy feliz.',
    preguntas: [
      { pregunta: '¿De qué color era el gato?', opciones: ['Negro', 'Blanco', 'Gris'], correcta: 0 },
      { pregunta: '¿Dónde subió el gato?', opciones: ['Casa', 'Árbol', 'Techo'], correcta: 1 },
      { pregunta: '¿Quién ayudó al gato?', opciones: ['Un niño', 'Una niña', 'Un adulto'], correcta: 0 }
    ],
    palabras: 30
  },
  '10-12': {
    texto: 'Marina descubrió un libro antiguo en el ático de su abuela. Las páginas estaban amarillas y olían a historia. Cada noche leía un capítulo bajo la luz de su lámpara. Las aventuras del libro la transportaban a mundos mágicos llenos de dragones y castillos. Su imaginación volaba libre mientras sus ojos recorrían cada palabra.',
    preguntas: [
      { pregunta: '¿Dónde encontró Marina el libro?', opciones: ['En el ático', 'En la biblioteca', 'En su cuarto'], correcta: 0 },
      { pregunta: '¿Cómo estaban las páginas?', opciones: ['Nuevas', 'Amarillas', 'Rotas'], correcta: 1 },
      { pregunta: '¿Qué había en el libro?', opciones: ['Recetas', 'Aventuras', 'Poemas'], correcta: 1 }
    ],
    palabras: 60
  },
  'adulto': {
    texto: 'La neuroplasticidad cerebral representa uno de los descubrimientos más fascinantes de la neurociencia contemporánea. Durante décadas, se creyó que el cerebro adulto era una estructura rígida e inmutable. Sin embargo, investigaciones recientes han demostrado que nuestro sistema nervioso posee una capacidad extraordinaria para reorganizarse, crear nuevas conexiones sinápticas y adaptarse a diferentes circunstancias. Este fenómeno no solo ocurre durante la infancia, sino que persiste a lo largo de toda la vida, permitiendo el aprendizaje continuo y la recuperación de funciones tras lesiones cerebrales.',
    preguntas: [
      { pregunta: '¿Qué se creía sobre el cerebro adulto?', opciones: ['Que era flexible', 'Que era inmutable', 'Que era perfecto'], correcta: 1 },
      { pregunta: '¿Cuándo ocurre la neuroplasticidad?', opciones: ['Solo en la infancia', 'Toda la vida', 'Solo en adultos'], correcta: 1 },
      { pregunta: '¿Qué permite la neuroplasticidad?', opciones: ['Dormir mejor', 'Aprendizaje continuo', 'Crecer más'], correcta: 1 }
    ],
    palabras: 95
  }
};

export const PALABRAS_ORTOGRAFIA = [
  { imagen: '🐱', correcta: 'gato', incorrecta: 'gatto' },
  { imagen: '🐄', correcta: 'vaca', incorrecta: 'baca' },
  { imagen: '🦒', correcta: 'jirafa', incorrecta: 'girafa' },
  { imagen: '🦁', correcta: 'león', incorrecta: 'leon' },
  { imagen: '🐘', correcta: 'elefante', incorrecta: 'elefante' },
  { imagen: '🌳', correcta: 'árbol', incorrecta: 'arbol' },
  { imagen: '🌺', correcta: 'flor', incorrecta: 'flor' },
  { imagen: '🏠', correcta: 'casa', incorrecta: 'caza' },
  { imagen: '📚', correcta: 'libro', incorrecta: 'livro' },
  { imagen: '☀️', correcta: 'sol', incorrecta: 'soul' }
];

export const SONIDOS_FONOLOGICOS = [
  { sonido: '/b/', opciones: ['b', 'd', 'p'], correcta: 0 },
  { sonido: '/d/', opciones: ['d', 'b', 't'], correcta: 0 },
  { sonido: '/m/', opciones: ['n', 'm', 'ñ'], correcta: 1 },
  { sonido: '/l/', opciones: ['r', 'i', 'l'], correcta: 2 },
  { sonido: '/r/', opciones: ['r', 'l', 't'], correcta: 0 }
];

export const PALABRAS_SILABAS = [
  { palabra: 'casa', silabas: 2 },
  { palabra: 'mariposa', silabas: 4 },
  { palabra: 'sol', silabas: 1 },
  { palabra: 'chocolate', silabas: 4 },
  { palabra: 'pájaro', silabas: 3 }
];