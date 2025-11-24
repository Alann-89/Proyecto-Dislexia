const mongoose = require('mongoose');

const ScreeningSchema = new mongoose.Schema({
userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
},
perfil: {
    edad: { type: Number, required: true },
    escolaridad: { type: String, required: true }
},
resultados_test: {
    modulo_a_aciertos: Number,
    modulo_a_total: Number,
    modulo_b_nonwords_aciertos: Number,
    modulo_b_nonwords_total: Number,
    modulo_b_nonwords_tiempo_ms: Number,
    modulo_c_fluidez_tiempo_s: Number,
    modulo_c_fluidez_palabras_texto: Number,
    modulo_c_comprension_aciertos: Number,
    modulo_c_comprension_total: Number,
    modulo_d_ortografia_aciertos: Number,
    modulo_d_ortografia_total: Number
},
analisis_ia: {
    perfil_identificado: String,
    areas_fortaleza: [String],
    areas_a_practicar: [String],
    explicacion_amigable: String,
    hipotesis_cognitiva: String,
    aviso_profesional: String,
    analisis_avanzado: mongoose.Schema.Types.Mixed,
    ejercicios_recomendados: [mongoose.Schema.Types.Mixed]
},
fecha: { type: Date, default: Date.now }}, {
    timestamps: true
});

module.exports = mongoose.model('Screening', ScreeningSchema);