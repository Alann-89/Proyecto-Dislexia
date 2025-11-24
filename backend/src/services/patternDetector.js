class PatternDetector {
  constructor() {
    this.patterns = {
      dislexia_fonologica: {
        indicators: ['bajo_nonwords', 'bajo_conciencia_fonologica', 'tiempo_lento_decodificacion'],
        threshold: 2
      },
      dislexia_superficial: {
        indicators: ['bajo_ortografia', 'confusiones_homofonas', 'lentitud_palabras_irregulares'],
        threshold: 2
      },
      deficit_comprension: {
        indicators: ['bajo_comprension', 'fluidez_normal', 'bajo_vocabulario'],
        threshold: 2
      },
      lector_compensado: {
        indicators: ['velocidad_baja', 'comprension_alta', 'esfuerzo_alto'],
        threshold: 2
      }
    };
  }

  async detectPatterns(screeningData, userHistory) {
    const detectedPatterns = [];
    const features = this.extractFeatures(screeningData);
    
    for (const [patternName, pattern] of Object.entries(this.patterns)) {
      const matchCount = pattern.indicators.filter(indicator => 
        features[indicator]
      ).length;
      
      if (matchCount >= pattern.threshold) {
        detectedPatterns.push({
          pattern: patternName,
          confidence: matchCount / pattern.indicators.length,
          indicators: pattern.indicators.filter(i => features[i])
        });
      }
    }
    
    if (userHistory && userHistory.length > 1) {
      const temporalPatterns = this.analyzeTemporalPatterns(userHistory);
      detectedPatterns.push(...temporalPatterns);
    }
    
    return detectedPatterns;
  }

  extractFeatures(screeningData) {
    const { resultados_test, perfil } = screeningData;
    const features = {};
    const baremos = this.getAdaptiveBaremos(perfil.edad);
    
    // Conciencia Fonológica
    const concienciaRate = resultados_test.modulo_a_aciertos / resultados_test.modulo_a_total;
    features.bajo_conciencia_fonologica = concienciaRate < baremos.conciencia_fonologica;
    
    // No-palabras
    const nonwordsRate = resultados_test.modulo_b_nonwords_aciertos / resultados_test.modulo_b_nonwords_total;
    const nonwordsTime = resultados_test.modulo_b_nonwords_tiempo_ms;
    features.bajo_nonwords = nonwordsRate < baremos.nonwords_rate;
    features.tiempo_lento_decodificacion = nonwordsTime > baremos.nonwords_tiempo;
    
    // Fluidez
    const palabrasPorMinuto = (resultados_test.modulo_c_fluidez_palabras_texto / 
                                resultados_test.modulo_c_fluidez_tiempo_s) * 60;
    features.velocidad_baja = palabrasPorMinuto < baremos.palabras_por_minuto;
    features.fluidez_normal = palabrasPorMinuto >= baremos.palabras_por_minuto;
    
    // Comprensión
    const comprensionRate = resultados_test.modulo_c_comprension_aciertos / 
                            resultados_test.modulo_c_comprension_total;
    features.bajo_comprension = comprensionRate < baremos.comprension;
    features.comprension_alta = comprensionRate >= 0.85;
    
    // Ortografía
    const ortografiaRate = resultados_test.modulo_d_ortografia_aciertos / 
                           resultados_test.modulo_d_ortografia_total;
    features.bajo_ortografia = ortografiaRate < baremos.ortografia;
    
    features.esfuerzo_alto = features.velocidad_baja && features.comprension_alta;
    
    return features;
  }

  getAdaptiveBaremos(edad) {
    if (edad <= 9) {
      return {
        conciencia_fonologica: 0.70,
        nonwords_rate: 0.65,
        nonwords_tiempo: 2000,
        palabras_por_minuto: 60,
        comprension: 0.66,
        ortografia: 0.60
      };
    } else if (edad <= 12) {
      return {
        conciencia_fonologica: 0.80,
        nonwords_rate: 0.75,
        nonwords_tiempo: 1500,
        palabras_por_minuto: 90,
        comprension: 0.70,
        ortografia: 0.70
      };
    } else {
      return {
        conciencia_fonologica: 0.90,
        nonwords_rate: 0.85,
        nonwords_tiempo: 1200,
        palabras_por_minuto: 200,
        comprension: 0.80,
        ortografia: 0.85
      };
    }
  }

  analyzeTemporalPatterns(history) {
    const patterns = [];
    
    const comprensionTrend = this.calculateTrend(
      history.map(s => s.resultados_test.modulo_c_comprension_aciertos / 
                       s.resultados_test.modulo_c_comprension_total)
    );
    
    if (comprensionTrend > 0.1) {
      patterns.push({
        pattern: 'mejora_comprension',
        confidence: Math.min(comprensionTrend, 1),
        indicators: ['tendencia_positiva_comprension']
      });
    }
    
    return patterns;
  }

  calculateTrend(values) {
    if (values.length < 2) return 0;
    const n = values.length;
    const sumX = (n * (n - 1)) / 2;
    const sumY = values.reduce((a, b) => a + b, 0);
    const sumXY = values.reduce((sum, y, x) => sum + x * y, 0);
    const sumX2 = (n * (n - 1) * (2 * n - 1)) / 6;
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    return slope;
  }
}

module.exports = PatternDetector;