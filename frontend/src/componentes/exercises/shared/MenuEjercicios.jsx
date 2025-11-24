import React, { useState } from 'react';
import { ArrowRight, Brain, Sparkles, ArrowLeft, Info, Lock, RotateCcw, CheckCircle } from 'lucide-react';
import { 
Card, Title, Text, ExerciseGrid, ExerciseCard, CategoryBadge,
AlertCard, AlertContent, AlertTitle, AlertText, ActionButton, 
SecondaryButton, SectionDivider, SectionTitle, InfoBox, InfoText, Button,
LockedExerciseCard, LockedTitle, LockedText
} from '../styles';
import { EJERCICIOS_DATA } from '../data';

export default function MenuEjercicios({ onIniciar, onIrEvaluacion, hasCompletedEvaluation, onRegenerar, completedIds = [], resultadosIA}) {
    const [mostrarAlerta, setMostrarAlerta] = useState(true);
    
    // Obtenemos los ejercicios en un array
    const ejerciciosList = Object.values(EJERCICIOS_DATA);
    let recomendados = [];
    let resto = [];

    // Verificamos que exista resultadosIA, que tenga la propiedad, Y QUE SEA UN ARRAY REAL
    if (hasCompletedEvaluation && resultadosIA?.ejercicios_recomendados && Array.isArray(resultadosIA.ejercicios_recomendados)) {
        const datosIA = resultadosIA.ejercicios_recomendados;
    
        // 1. Filtramos los prioritarios (Recomendados)
        const idsPrioritarios = datosIA
            .filter(e => e.es_prioritario === true)
            .map(e => e.id_ejercicio);
        
        recomendados = ejerciciosList.filter(e => idsPrioritarios.includes(e.id));
        
        // 2. El resto son los que NO son prioritarios
        resto = ejerciciosList.filter(e => !idsPrioritarios.includes(e.id));
    } else {
        // Si no hay datos válidos, mostramos los primeros 3 por defecto (Fallback)
        recomendados = ejerciciosList.slice(0, 3);
        resto = ejerciciosList.slice(3);
    }

    const renderCard = (ejercicio, isRecommended = false) => {
        const isLocked = completedIds.includes(ejercicio.id);

        if (isLocked) {
        return (
            <LockedExerciseCard key={ejercicio.id}>
                <CheckCircle size={32} color="#9ca3af" style={{ marginBottom: '12px' }} />
                <LockedTitle>{ejercicio.titulo}</LockedTitle>
                <LockedText>Completado</LockedText>
                <div style={{ fontSize: '0.8rem', color: '#9ca3af', fontStyle: 'italic' }}>
                    Regenera para jugar de nuevo
                </div>
            </LockedExerciseCard>
            );
        }

        // Buscar descripción personalizada de la IA
        let descripcionMostrar = ejercicio.descripcion;
        if (resultadosIA && Array.isArray(resultadosIA.ejercicios_recomendados)) {
            const dataIA = resultadosIA.ejercicios_recomendados.find(r => r.id_ejercicio === ejercicio.id);
            if (dataIA && dataIA.descripcion_corta) {
                descripcionMostrar = dataIA.descripcion_corta;
            }
        }

        return (
        <ExerciseCard 
            key={ejercicio.id} 
            onClick={() => onIniciar(ejercicio.id)}
            style={isRecommended ? { 
                border: '2px solid #0F3460', 
                background: 'linear-gradient(135deg, #eff6ff 0%, #ffffff 100%)',
                boxShadow: '0 4px 12px rgba(37, 99, 235, 0.1)'
            } : {}}
        >
            {isRecommended && (
            <div style={{ 
                position: 'absolute', top: '-12px', right: '20px', background: '#0F3460',
                color: 'white', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold',
                boxShadow: '0 4px 10px rgba(15, 52, 96, 0.3)',
                display: 'flex', alignItems: 'center', gap: '4px'
            }}>
                <Sparkles size={12} /> Recomendado
            </div>
            )}

            <CategoryBadge $color={ejercicio.color} $textColor={ejercicio.textColor}>
            {ejercicio.categoria}
            </CategoryBadge>
            
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '8px', color: '#1f2937' }}>
            {ejercicio.titulo}
            </h3>
            
            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '16px' }}>
            {descripcionMostrar}
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', color: '#2980B9', fontWeight: '600', fontSize: '0.875rem' }}>
            Comenzar <ArrowRight size={16} style={{ marginLeft: '4px' }} />
            </div>
        </ExerciseCard>
        );
    };

    return (
        <Card>
            <Button $variant="secondary"  onClick={onIrEvaluacion} $margin="32px 0 0 0">
                <ArrowLeft size={20} /> Volver al Inicio
            </Button>

            <Title>Centro de Ejercicios</Title>

            {/* Alerta: Usuario NUEVO (Sin evaluación) */}
            {!hasCompletedEvaluation && mostrarAlerta && (
                <AlertCard>
                    <div style={{ background: 'white',  padding: '12px', borderRadius: '50%', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                        <Brain size={32} color="#6DD5FA" />
                    </div>
                    <AlertContent>
                        <AlertTitle>
                            ¿Primera vez aquí?
                        </AlertTitle>
                        <AlertText>
                            Para obtener la mejor experiencia, te recomendamos realizar primero nuestra <strong>evaluación diagnóstica</strong>.
                        </AlertText>
                        <ul style={{ color: '#4b5563', marginLeft: '20px', marginBottom: '24px', lineHeight: '1.8', fontSize: '0.95rem' }}>
                        <li>Identifica tus fortalezas y debilidades</li>
                        <li>Recibe un plan de estudio personalizado</li>
                        <li>Practica solo lo que necesitas</li>
                        </ul>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                            <ActionButton onClick={onIrEvaluacion}>
                                Comenzar Evaluación
                                <ArrowRight size={18} />
                            </ActionButton>

                            <SecondaryButton onClick={() => setMostrarAlerta(false)}>
                                Explorar libremente
                            </SecondaryButton>
                        </div>
                    </AlertContent>
                </AlertCard>
            )}

            {!hasCompletedEvaluation && !mostrarAlerta && (
                <InfoBox style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f3f4f6', borderLeft: '4px solid #6DD5FA' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Info size={20} color="#6DD5FA" />
                        <InfoText style={{ color: '#4b5563' }}>
                            Estás explorando libremente. Recuerda que puedes realizar tu evaluación en cualquier momento.
                        </InfoText>
                    </div>
                    <button onClick={onIrEvaluacion}style={{ background: 'none', border: 'none', color: '#2980B9', fontWeight: 'bold', cursor: 'pointer',fontSize: '0.875rem',textDecoration: 'underline'}}>
                        Evaluar ahora
                    </button>
                </InfoBox>
            )}

            {/* Info: Usuario con Evaluación Completada */}
            {hasCompletedEvaluation && (
                <InfoBox>
                    <InfoText>
                        <strong>¡Genial!</strong> Ya completaste tu evaluación. Los ejercicios destacados son los más recomendados para ti según tus resultados.
                    </InfoText>
                </InfoBox>
            )}

            <Text style={{ textAlign: 'center', fontSize: '1.125rem', marginBottom: '32px' }}>
                {hasCompletedEvaluation 
                    ? 'Tu plan de práctica personalizado'
                    : 'Explora todos nuestros ejercicios disponibles'
                }
            </Text>

            {/* --- SECCIÓN RECOMENDADOS (Solo si hay evaluación) --- */}
            {hasCompletedEvaluation && (
                <>
                <SectionDivider>
                    <SectionTitle>
                        <Sparkles size={24} color="#f59e0b" />
                        Recomendados para ti
                    </SectionTitle>
                    <button 
                        onClick={onRegenerar}
                        style={{
                        marginLeft: 'auto',
                        background: 'none',
                        border: '1px solid #2980B9',
                        color: '#2980B9',
                        borderRadius: '20px',
                        padding: '5px 15px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px'
                        }}
                    >
                        <RotateCcw size={16} /> Nuevos Ejercicios
                    </button>
                </SectionDivider>

                <ExerciseGrid>
                    {recomendados.map((ejercicio) => renderCard(ejercicio, true))}
                </ExerciseGrid>

                <SectionDivider>
                    <SectionTitle>Biblioteca completa</SectionTitle>
                </SectionDivider>
                </>
            )}

            {/* --- TODOS LOS EJERCICIOS (O EL RESTO) --- */}
            <ExerciseGrid>
                {(hasCompletedEvaluation ? resto : ejerciciosList).map((ejercicio) => renderCard(ejercicio))}
            </ExerciseGrid>
        </Card>
    );
}