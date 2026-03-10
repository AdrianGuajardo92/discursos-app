import { jsPDF } from "jspdf";

const ACCENT = [200, 162, 78];
const TEXT = [50, 48, 44];
const GRAY = [130, 126, 118];
const BLUE = [74, 138, 181];
const GREEN = [120, 180, 120];
const WHITE = [255, 255, 255];

export default function generarPDF(discurso) {
  const doc = new jsPDF({ unit: "mm", format: "letter" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const mL = 18, mR = 18, mTop = 18, mBot = 16;
  const cW = pageW - mL - mR;
  let y = mTop;

  function checkPage(needed = 8) {
    if (y + needed > pageH - mBot) {
      doc.addPage();
      y = mTop;
      return true;
    }
    return false;
  }

  function setFont(size, style = "normal", color = TEXT) {
    doc.setFontSize(size);
    doc.setFont("helvetica", style);
    doc.setTextColor(...color);
  }

  function writeLines(text, x, fontSize, color, style = "normal", maxW, align) {
    if (!text) return;
    setFont(fontSize, style, color);
    const w = maxW || (cW - (x - mL));
    const lines = doc.splitTextToSize(text, w);
    const lineH = fontSize * 0.42;
    for (const line of lines) {
      checkPage(lineH + 1);
      if (align === "center") doc.text(line, pageW / 2, y, { align: "center" });
      else doc.text(line, x, y);
      y += lineH;
    }
    return lines.length;
  }

  function gap(mm = 3) { y += mm; }

  function drawDivider(x1, x2, color = [200, 198, 190]) {
    doc.setDrawColor(...color);
    doc.setLineWidth(0.3);
    doc.line(x1, y, x2, y);
    gap(2);
  }

  // ─── Encabezado ───
  gap(4);
  writeLines(`DISCURSO Nº${discurso.numero}`, mL, 8.5, GRAY, "bold", cW, "center");
  gap(3);
  writeLines(discurso.titulo.toUpperCase(), mL, 16, TEXT, "bold", cW, "center");
  gap(2);
  writeLines(`${discurso.duracion}  ·  ${discurso.secciones.length} secciones`, mL, 9, GRAY, "normal", cW, "center");

  if (discurso.cancion) {
    gap(3);
    writeLines(`Canción ${discurso.cancion}`, mL, 9, ACCENT, "bold", cW, "center");
  }

  gap(5);
  drawDivider(pageW * 0.3, pageW * 0.7, ACCENT);
  gap(6);

  // ─── Secciones ───
  for (let i = 0; i < discurso.secciones.length; i++) {
    const sec = discurso.secciones[i];
    checkPage(25);

    // Número en círculo
    doc.setFillColor(...ACCENT);
    doc.circle(mL + 3.5, y - 1.5, 3.5, "F");
    setFont(9, "bold", WHITE);
    doc.text(`${i + 1}`, mL + 3.5, y - 0.5, { align: "center" });

    // Título de sección
    setFont(12, "bold", TEXT);
    const titLines = doc.splitTextToSize(sec.titulo, cW - 40);
    doc.text(titLines, mL + 10, y - 0.5);

    // Tiempo
    setFont(8, "normal", ACCENT);
    doc.text(sec.tiempo, pageW - mR, y - 0.5, { align: "right" });

    y += titLines.length * 5 + 4;

    // ─── Contenido ───
    for (const item of sec.contenido) {
      renderItem(doc, item);
    }

    // Separador entre secciones
    if (i < discurso.secciones.length - 1) {
      gap(5);
      drawDivider(mL + 25, pageW - mR - 25);
      gap(5);
    }
  }

  // ─── Guardar ───
  const nombre = discurso.titulo
    .replace(/[^a-zA-ZáéíóúñÁÉÍÓÚÑ0-9 ]/g, "")
    .replace(/ +/g, "_")
    .substring(0, 40);
  doc.save(`Discurso_${discurso.numero}_${nombre}.pdf`);

  // ─── Renderizador de items ───
  function renderItem(doc, item) {
    switch (item.tipo) {
      case "punto": {
        checkPage(10);
        setFont(9, "normal", ACCENT);
        doc.text("▸", mL + 2, y);
        writeLines(item.texto, mL + 7, 10, TEXT);
        gap(2);
        break;
      }

      case "subpunto": {
        checkPage(10);
        setFont(8, "normal", GRAY);
        doc.text("↳", mL + 8, y);
        writeLines(item.texto, mL + 14, 9, GRAY, "italic");
        gap(1);
        break;
      }

      case "pregunta": {
        checkPage(14);
        // Barra lateral ámbar
        const startY = y;
        writeLines(item.texto, mL + 6, 10, ACCENT, "italic", cW - 8);
        doc.setFillColor(...ACCENT);
        doc.rect(mL, startY - 4, 1.2, y - startY + 3, "F");
        gap(3);
        break;
      }

      case "lectura": {
        checkPage(20);
        gap(2);
        const startY = y - 3;

        // Badge LEA
        doc.setFillColor(...BLUE);
        doc.roundedRect(mL + 2, y - 3.5, 10, 4.5, 1, 1, "F");
        setFont(6.5, "bold", WHITE);
        doc.text("LEA", mL + 7, y - 0.5, { align: "center" });

        // Cita
        writeLines(item.cita, mL + 15, 9.5, BLUE, "bold");
        if (item.seg) {
          setFont(7.5, "normal", GRAY);
          doc.text(`⏱ ${item.seg}`, pageW - mR - 2, y - 4, { align: "right" });
        }
        gap(1);

        // Texto
        writeLines(item.texto, mL + 5, 9.5, [60, 58, 54], "normal", cW - 7);

        // Recuadro
        doc.setDrawColor(...BLUE);
        doc.setLineWidth(0.4);
        doc.roundedRect(mL, startY, cW, y - startY + 1, 2, 2, "S");
        gap(4);
        break;
      }

      case "referencia": {
        checkPage(16);
        gap(1);
        const startY = y - 3;

        // Badge PARAFRASEAR
        doc.setFillColor(200, 230, 200);
        doc.roundedRect(mL + 8, y - 3.5, 20, 4.5, 1, 1, "F");
        setFont(5.5, "bold", [80, 140, 80]);
        doc.text("PARAFRASEAR", mL + 18, y - 0.5, { align: "center" });

        // Cita
        writeLines(item.cita, mL + 31, 9, GREEN, "bold");
        gap(1);

        // Texto
        writeLines(item.texto, mL + 10, 9, [90, 130, 90], "italic", cW - 14);

        // Borde izquierdo verde
        doc.setFillColor(...GREEN);
        doc.rect(mL + 6, startY, 1, y - startY + 1, "F");
        gap(4);
        break;
      }

      case "cita_biblica": {
        checkPage(14);
        const startY = y - 3;
        if (item.contexto) {
          writeLines(item.contexto, mL + 6, 9, GRAY, "italic");
          gap(1);
        }
        writeLines(item.texto, mL + 6, 10, ACCENT, "bold", cW - 8);
        doc.setFillColor(...ACCENT);
        doc.rect(mL, startY, 1.2, y - startY + 2, "F");
        gap(3);
        break;
      }

      case "subtitulo": {
        checkPage(12);
        gap(5);
        drawDivider(mL + 10, pageW - mR - 10, ACCENT);
        gap(1);
        writeLines(item.texto, mL, 12, TEXT, "bold");
        gap(4);
        break;
      }

      case "destacado": {
        checkPage(14);
        gap(1);
        const startY = y - 3;
        writeLines(item.texto, mL + 6, 10, ACCENT, "bold", cW - 10);
        // Recuadro suave
        doc.setDrawColor(...ACCENT);
        doc.setLineWidth(0.3);
        doc.roundedRect(mL, startY, cW, y - startY + 2, 2, 2, "S");
        doc.setFillColor(...ACCENT);
        doc.rect(mL, startY, 1.5, y - startY + 2, "F");
        gap(4);
        break;
      }

      case "lista_enseñanza": {
        checkPage(16);
        gap(2);
        const startY = y - 3;

        if (item.titulo) {
          writeLines(item.titulo.toUpperCase(), mL, 8, ACCENT, "bold", cW, "center");
          gap(3);
        }

        for (const li of item.items) {
          checkPage(10);
          doc.setFillColor(...ACCENT);
          doc.rect(mL + 4, y - 2.5, 0.8, 8, "F");
          writeLines(li.punto, mL + 8, 9.5, TEXT, "bold", cW - 12);
          if (li.detalle) {
            writeLines(li.detalle, mL + 8, 8.5, GRAY, "normal", cW - 12);
          }
          gap(2);
        }

        // Borde exterior
        doc.setDrawColor(220, 218, 210);
        doc.setLineWidth(0.2);
        doc.roundedRect(mL + 2, startY, cW - 4, y - startY, 2, 2, "S");
        gap(3);
        break;
      }

      case "cualidades": {
        checkPage(14);
        gap(2);
        for (const q of item.items) {
          checkPage(12);
          const startY = y - 3;
          writeLines(q.nombre.toUpperCase(), mL + 6, 8, ACCENT, "bold");
          gap(1);
          writeLines(q.detalle, mL + 6, 9.5, TEXT, "normal", cW - 10);
          if (q.reflexion) {
            gap(1);
            writeLines(q.reflexion, mL + 10, 8.5, GRAY, "italic", cW - 14);
          }
          doc.setFillColor(...ACCENT);
          doc.rect(mL + 2, startY, 1, y - startY + 1, "F");
          gap(3);
        }
        break;
      }

      case "ejemplo": {
        checkPage(14);
        gap(1);
        const startY = y - 3;
        writeLines("EJEMPLO", mL + 6, 7.5, ACCENT, "bold");
        gap(1);
        writeLines(item.texto, mL + 6, 9.5, TEXT, "italic", cW - 10);
        doc.setFillColor(...ACCENT);
        doc.rect(mL + 2, startY, 1, y - startY + 1, "F");
        gap(4);
        break;
      }

      case "ejemplo_biblico": {
        checkPage(16);
        gap(2);
        writeLines(item.nombre.toUpperCase(), mL, 8.5, ACCENT, "bold", cW, "center");
        gap(2);
        const startY = y - 2;
        if (item.narrativa) {
          writeLines(item.narrativa, mL + 6, 9.5, TEXT, "normal", cW - 10);
          gap(1);
        }
        if (item.claves) {
          for (const c of item.claves) {
            checkPage(8);
            setFont(8, "normal", ACCENT);
            doc.text("▸", mL + 6, y);
            writeLines(c, mL + 11, 9, TEXT, "normal", cW - 15);
            gap(1);
          }
        }
        doc.setFillColor(...ACCENT);
        doc.rect(mL + 2, startY, 1, y - startY, "F");
        gap(3);
        break;
      }

      case "definicion": {
        checkPage(14);
        gap(1);
        const startY = y - 3;
        setFont(10, "bold", ACCENT);
        doc.text(item.termino, mL + 6, y);
        if (item.lsm) {
          setFont(7.5, "bold", ACCENT);
          doc.text(`🤟 ${item.lsm.toUpperCase()}`, pageW - mR - 2, y, { align: "right" });
        }
        y += 5;
        writeLines(item.texto, mL + 6, 9.5, TEXT, "normal", cW - 10);
        doc.setDrawColor(...ACCENT);
        doc.setLineWidth(0.3);
        doc.roundedRect(mL + 2, startY, cW - 4, y - startY + 1, 2, 2, "S");
        gap(4);
        break;
      }

      case "pilares": {
        checkPage(16);
        gap(2);
        for (const p of item.items) {
          checkPage(12);
          writeLines(`${p.icono}  ${p.nombre.toUpperCase()}`, mL + 4, 9, ACCENT, "bold");
          gap(1);
          writeLines(p.detalle, mL + 8, 9, GRAY, "normal", cW - 12);
          gap(3);
        }
        break;
      }

      case "llamado_accion": {
        checkPage(16);
        gap(2);
        const startY = y - 3;
        writeLines("LLAMADO A LA ACCIÓN", mL, 7.5, ACCENT, "bold", cW, "center");
        gap(2);
        writeLines(item.texto, mL + 6, 10, TEXT, "normal", cW - 10);
        doc.setDrawColor(...ACCENT);
        doc.setLineWidth(0.5);
        doc.roundedRect(mL + 2, startY, cW - 4, y - startY + 2, 2, 2, "S");
        gap(4);
        break;
      }

      case "cierre": {
        checkPage(12);
        gap(6);
        writeLines(item.texto, mL, 14, ACCENT, "bold", cW, "center");
        gap(4);
        break;
      }

      case "video": {
        checkPage(8);
        gap(1);
        writeLines("▶ Video", mL + 4, 9, [180, 60, 60], "bold");
        gap(2);
        break;
      }

      case "imagen": {
        gap(2);
        break;
      }

      default:
        break;
    }
  }
}
