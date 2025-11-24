import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Aceptamos un 4to parámetro: nombreUsuario
export const generarReportePDF = (perfil, resultados, analisis, nombreUsuario = 'Invitado') => {
  const doc = new jsPDF();
  const fecha = new Date().toLocaleDateString();

  // --- CONFIGURACIÓN DE ESTILOS ---
  const colorPrimario = [41, 128, 185]; 
  const colorSecundario = [75, 85, 99]; // Gris oscuro

  // --- ENCABEZADO ---
  doc.setFillColor(...colorPrimario);
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('NeuroLectura', 20, 20);
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('Reporte de Evaluación de Habilidades Lectoras', 20, 30);

  doc.setFontSize(10);
  doc.text(`Fecha: ${fecha}`, 190, 30, { align: 'right' });

  // --- DATOS DEL PERFIL ---
  doc.setTextColor(...colorSecundario);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Perfil del Estudiante:', 20, 55);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  
  // Agregamos el nombre aquí
  doc.text(`Nombre: ${nombreUsuario}`, 20, 63);
  
  // Bajamos un poco la edad y escolaridad
  doc.text(`Edad: ${perfil.edad} años`, 20, 70);
  doc.text(`Escolaridad: ${perfil.escolaridad}`, 80, 70);

  // --- ANÁLISIS PRINCIPAL ---
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Resumen del Perfil:', 20, 85); // Ajustado Y por el nuevo espacio
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  const splitPerfil = doc.splitTextToSize(analisis.perfil_identificado, 170);
  doc.text(splitPerfil, 20, 92);

  let cursorY = 92 + (splitPerfil.length * 5) + 10;

  // --- TABLA DE FORTALEZAS Y ÁREAS DE MEJORA ---
  const maxRows = Math.max(analisis.areas_fortaleza.length, analisis.areas_a_practicar.length);
  const tableData = [];

  for (let i = 0; i < maxRows; i++) {
    tableData.push([
      analisis.areas_fortaleza[i] || '',
      analisis.areas_a_practicar[i] || ''
    ]);
  }

  autoTable(doc, {
    startY: cursorY,
    head: [['Áreas de Fortaleza', 'Áreas para Practicar']],
    body: tableData,
    theme: 'grid',
    headStyles: {
      fillColor: colorPrimario,
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      halign: 'center'
    },
    styles: {
      cellPadding: 5,
      fontSize: 10,
      valign: 'middle'
    },
    columnStyles: {
      0: { cellWidth: 85 },
      1: { cellWidth: 85 }
    },
    margin: { left: 20 }
  });

  cursorY = doc.lastAutoTable.finalY + 15;

  // --- EXPLICACIÓN AMIGABLE ---
  if (cursorY > 250) {
    doc.addPage();
    cursorY = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Interpretación:', 20, cursorY);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  const splitExplicacion = doc.splitTextToSize(analisis.explicacion_amigable, 170);
  doc.text(splitExplicacion, 20, cursorY + 7);

  cursorY += (splitExplicacion.length * 5) + 15;

  // --- TABLA DE EJERCICIOS RECOMENDADOS ---
  if (cursorY > 240) {
    doc.addPage();
    cursorY = 20;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('Plan de Ejercicios Recomendado:', 20, cursorY);

  const ejerciciosData = analisis.ejercicios_recomendados.map(ej => [
    ej.titulo,
    ej.categoria || 'General',
    ej.descripcion_corta
  ]);

  autoTable(doc, {
    startY: cursorY + 5,
    head: [['Ejercicio', 'Categoría', 'Descripción']],
    body: ejerciciosData,
    theme: 'striped',
    headStyles: { fillColor: [75, 85, 99] },
    styles: { fontSize: 10 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 40 },
      1: { cellWidth: 30 },
      2: { cellWidth: 100 }
    },
    margin: { left: 20 }
  });

  // --- PIE DE PÁGINA Y AVISO LEGAL ---
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    doc.setFillColor(254, 243, 199);
    doc.rect(10, 275, 190, 15, 'F');
    
    doc.setFontSize(8);
    doc.setTextColor(146, 64, 14);
    doc.text(
      "NOTA IMPORTANTE: Esta herramienta es solo para fines educativos y de orientación. No constituye un diagnóstico clínico médico.",
      105, 282, { align: 'center' }
    );

    doc.setTextColor(150);
    doc.text(`Página ${i} de ${pageCount}`, 195, 290, { align: 'right' });
  }

  // Nombre de archivo limpio
  const cleanName = nombreUsuario.replace(/[^a-z0-9]/gi, '_').toLowerCase();
  doc.save(`NeuroLectura_${cleanName}.pdf`);
};