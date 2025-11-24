export const EJERCICIOS_DATA = {
  'E01': {
    id: 'E01',
    titulo: 'Cazador de Rimas',
    categoria: 'Conciencia Fonológica',
    descripcion: 'Encuentra palabras que riman',
    color: '#dbeafe',
    textColor: '#1e40af',
    preguntas: [
      { palabra: 'gato', opciones: ['pato', 'perro', 'casa', 'flor'], correcta: 'pato' },
      { palabra: 'sol', opciones: ['mar', 'col', 'luz', 'paz'], correcta: 'col' },
      { palabra: 'amor', opciones: ['dolor', 'feliz', 'cielo', 'nube'], correcta: 'dolor' },
      { palabra: 'canción', opciones: ['corazón', 'melodía', 'música', 'ritmo'], correcta: 'corazón' },
      { palabra: 'ratón', opciones: ['balón', 'queso', 'trampa', 'gato'], correcta: 'balón' }
    ]
  },
    'E02': {
    id: 'E02',
    titulo: 'Separador de Sílabas',
    categoria: 'Conciencia Fonológica',
    descripcion: 'Cuenta las sílabas de cada palabra',
    color: '#d1fae5',
    textColor: '#065f46',
    preguntas: [
      { palabra: 'ma-ri-po-sa', respuesta: 4 },
      { palabra: 'sol', respuesta: 1 },
      { palabra: 'te-lé-fo-no', respuesta: 4 },
      { palabra: 'ca-sa', respuesta: 2 },
      { palabra: 'e-le-fan-te', respuesta: 4 },
      { palabra: 'pan', respuesta: 1 },
      { palabra: 'cho-co-la-te', respuesta: 4 }
    ]
  },
  'E03': {
    id: 'E03',
    titulo: 'Sonidos y Letras',
    categoria: 'Fonología',
    descripcion: 'Identifica qué letra corresponde al sonido',
    color: '#fef3c7',
    textColor: '#92400e',
    preguntas: [
      { sonido: '/k/', opciones: ['c', 'g', 's'], correcta: 'c' },
      { sonido: '/b/', opciones: ['b', 'd', 'p'], correcta: 'b' },
      { sonido: '/m/', opciones: ['n', 'm', 'ñ'], correcta: 'm' },
      { sonido: '/r/', opciones: ['r', 'l', 't'], correcta: 'r' },
      { sonido: '/s/', opciones: ['s', 'z', 'x'], correcta: 's' }
    ]
  },
  'E04': {
    id: 'E04',
    titulo: 'Palabras Reales vs Inventadas',
    categoria: 'Decodificación',
    descripcion: '¿Esta palabra existe en español?',
    color: '#fae8ff',
    textColor: '#7e22ce',
    palabras: [
      { palabra: 'casa', esReal: true },
      { palabra: 'plifo', esReal: false },
      { palabra: 'mesa', esReal: true },
      { palabra: 'broli', esReal: false },
      { palabra: 'perro', esReal: true },
      { palabra: 'flunta', esReal: false },
      { palabra: 'libro', esReal: true },
      { palabra: 'gripo', esReal: false }
    ]
  },
  'E05': {
    id: 'E05',
    titulo: 'Ortografía en Contexto',
    categoria: 'Ortografía',
    descripcion: 'Elige la palabra correctamente escrita',
    color: '#fed7aa',
    textColor: '#9a3412',
    preguntas: [
      { imagen: '🐄', opciones: ['vaca', 'baca'], correcta: 'vaca' },
      { imagen: '🏠', opciones: ['casa', 'caza'], correcta: 'casa' },
      { imagen: '🌺', opciones: ['halla', 'haya'], correcta: 'haya' },
      { imagen: '📖', opciones: ['echo', 'hecho'], correcta: 'hecho' },
      { imagen: '🔥', opciones: ['calentar', 'qalentar'], correcta: 'calentar' }
    ]
  },
  'E06': {
    id: 'E06',
    titulo: 'Lectura Cronometrada',
    categoria: 'Fluidez',
    descripcion: 'Lee el texto lo más rápido posible',
    color: '#dbeafe',
    textColor: '#1e40af',
    texto: 'El pequeño perro café corría feliz por el parque. Le gustaba perseguir mariposas y jugar con otros perros. Su dueña lo llamaba Rex y era su mejor amigo. Cada tarde salían a pasear juntos.',
    preguntas: [
      { pregunta: '¿De qué color era el perro?', opciones: ['Negro', 'Café', 'Blanco'], correcta: 'Café' },
      { pregunta: '¿Qué le gustaba perseguir?', opciones: ['Gatos', 'Pelotas', 'Mariposas'], correcta: 'Mariposas' },
      { pregunta: '¿Cómo se llamaba el perro?', opciones: ['Max', 'Rex', 'Duke'], correcta: 'Rex' }
    ]
  },
  'E07': {
    id: 'E07',
    titulo: 'Comprensión Activa',
    categoria: 'Comprensión',
    descripcion: 'Lee y responde preguntas',
    color: '#d1fae5',
    textColor: '#065f46',
    textos: [
      {
        texto: 'María plantó un árbol en su jardín. Cada día lo regaba con cuidado. Después de un año, el árbol creció y dio hermosas flores rojas. María estaba muy orgullosa de su trabajo.',
        preguntas: [
          { pregunta: '¿Qué plantó María?', opciones: ['Una flor', 'Un árbol', 'Una semilla'], correcta: 'Un árbol' },
          { pregunta: '¿De qué color eran las flores?', opciones: ['Rojas', 'Amarillas', 'Azules'], correcta: 'Rojas' },
          { pregunta: '¿Cómo se sentía María?', opciones: ['Triste', 'Orgullosa', 'Enojada'], correcta: 'Orgullosa' }
        ]
      }
    ]
  },
  'E08': {
    id: 'E08',
    titulo: 'Predicción Textual',
    categoria: 'Comprensión',
    descripcion: 'Predice qué palabra viene después',
    color: '#fef3c7',
    textColor: '#92400e',
    oraciones: [
      { texto: 'El gato se subió al...', opciones: ['árbol', 'agua', 'cielo'], correcta: 'árbol' },
      { texto: 'Me gusta tomar agua cuando tengo...', opciones: ['sueño', 'sed', 'frío'], correcta: 'sed' },
      { texto: 'El sol brilla durante el...', opciones: ['día', 'noche', 'invierno'], correcta: 'día' },
      { texto: 'Uso paraguas cuando...', opciones: ['llueve', 'hace sol', 'duermo'], correcta: 'llueve' }
    ]
  },
  'E09': {
    id: 'E09',
    titulo: 'Construcción de Oraciones',
    categoria: 'Sintaxis',
    descripcion: 'Ordena las palabras correctamente',
    color: '#fae8ff',
    textColor: '#7e22ce',
    ejercicios: [
      { palabras: ['El', 'perro', 'corre', 'rápido'], correcta: 'El perro corre rápido' },
      { palabras: ['María', 'come', 'una', 'manzana'], correcta: 'María come una manzana' },
      { palabras: ['Los', 'niños', 'juegan', 'fútbol'], correcta: 'Los niños juegan fútbol' },
      { palabras: ['Mi', 'mamá', 'cocina', 'rico'], correcta: 'Mi mamá cocina rico' }
    ]
  }
};