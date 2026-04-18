import { jsPDF } from "jspdf";

// ─── Paleta ───
const ACCENT = [200, 162, 78];
const ACCENT_DARK = [160, 125, 50];
const TEXT = [40, 38, 34];
const GRAY = [120, 115, 108];
const GRAY_SOFT = [215, 212, 205];
const BLUE = [74, 138, 181];
const BLUE_SOFT = [235, 243, 250];
const GREEN = [100, 150, 100];
const GREEN_SOFT = [232, 242, 232];
const AMBER_SOFT = [252, 245, 225];
const WHITE = [255, 255, 255];

// ─── Sanitizador: convierte Unicode no-WinAnsi a equivalentes seguros ───
function clean(text) {
  if (text == null) return "";
  let s = String(text);

  // Flechas y símbolos direccionales → guion largo
  s = s.replace(/[→←↔⇒⇨➜➔➤]/g, "—");
  s = s.replace(/[↑↓]/g, "");
  s = s.replace(/↳/g, "—");

  // Bullets y marcadores que sí existen en WinAnsi
  s = s.replace(/[▸▶▷►]/g, "•");
  s = s.replace(/[◆◇■□●○]/g, "•");

  // Equis/cruces
  s = s.replace(/[❌✗✘]/g, "×");
  s = s.replace(/[✓✔]/g, "");

  // Emojis comunes — simplemente quitarlos (el texto ya transmite el sentido)
  const emojiRanges = [
    /[\u{1F300}-\u{1FAFF}]/gu,   // símbolos y pictogramas
    /[\u{1F000}-\u{1F2FF}]/gu,   // varios
    /[\u{2600}-\u{27BF}]/gu,     // dingbats y misc. símbolos
    /[\u{2300}-\u{23FF}]/gu,     // misc. técnico (⏱ ⏰)
    /[\u{1F1E6}-\u{1F1FF}]/gu,   // banderas
    /\uFE0F/g,                   // selector de variación emoji
    /\u200D/g,                   // zero-width joiner
  ];
  for (const r of emojiRanges) s = s.replace(r, "");

  // Comillas tipográficas — ya están en WinAnsi, las dejamos
  // Guion largo y medio — ya están en WinAnsi

  // Espacios duplicados y trim
  s = s.replace(/\s+/g, " ").trim();
  // Limpiar espacios antes de signos de puntuación
  s = s.replace(/ +([,.;:!?])/g, "$1");

  return s;
}

// Descarga una imagen y la convierte a Data URL (base64) para embeberla en el PDF.
async function cargarImagen(url) {
  try {
    const resp = await fetch(url, { mode: "cors" });
    if (!resp.ok) return null;
    const blob = await resp.blob();
    return await new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result);
      r.onerror = rej;
      r.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

async function precargarImagenes(discurso) {
  const urls = new Set();
  for (const sec of discurso.secciones) {
    for (const item of sec.contenido) {
      if (item.img) urls.add(item.img);
    }
  }
  const cache = new Map();
  await Promise.all(
    [...urls].map(async (url) => {
      const data = await cargarImagen(url);
      if (data) cache.set(url, data);
    })
  );
  return cache;
}

export default async function generarPDF(discurso) {
  const imageCache = await precargarImagenes(discurso);
  const doc = new jsPDF({ unit: "mm", format: "letter" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const mL = 20, mR = 20, mTop = 22, mBot = 20;
  const cW = pageW - mL - mR;
  let y = mTop;
  let pageNum = 1;

  // ─── Helpers ───
  function setFont(size, style = "normal", color = TEXT) {
    doc.setFontSize(size);
    doc.setFont("helvetica", style);
    doc.setTextColor(...color);
  }

  function addPage() {
    addFooter();
    doc.addPage();
    pageNum++;
    y = mTop;
  }

  function need(space) {
    if (y + space > pageH - mBot) {
      addPage();
      return true;
    }
    return false;
  }

  function gap(mm = 3) { y += mm; }

  // Devuelve altura (mm) que ocupará un bloque de texto con el width dado.
  function measureLines(text, fontSize, style, width) {
    setFont(fontSize, style, TEXT);
    const lines = doc.splitTextToSize(clean(text), width);
    return { lines, height: lines.length * fontSize * 0.42 };
  }

  // Escribe texto multilínea respetando saltos de página.
  function writeText(text, x, fontSize, color, style = "normal", maxW, align) {
    const t = clean(text);
    if (!t) return 0;
    setFont(fontSize, style, color);
    const w = maxW || (pageW - mR - x);
    const lines = doc.splitTextToSize(t, w);
    const lineH = fontSize * 0.42;
    for (const line of lines) {
      need(lineH + 1);
      if (align === "center") {
        doc.text(line, pageW / 2, y + lineH - 1, { align: "center" });
      } else if (align === "right") {
        doc.text(line, pageW - mR, y + lineH - 1, { align: "right" });
      } else {
        doc.text(line, x, y + lineH - 1);
      }
      y += lineH;
    }
    return lines.length * lineH;
  }

  // Dibuja una imagen centrada, ajustada a maxWidth/maxHeight manteniendo proporción.
  function drawImage(url, maxWidth, maxHeight) {
    const data = imageCache.get(url);
    if (!data) return 0;
    try {
      const props = doc.getImageProperties(data);
      const ratio = props.width / props.height;
      let w = maxWidth;
      let h = w / ratio;
      if (h > maxHeight) {
        h = maxHeight;
        w = h * ratio;
      }
      need(h + 2);
      const x = (pageW - w) / 2;
      const fmt = (props.fileType || "PNG").toUpperCase();
      doc.addImage(data, fmt, x, y, w, h, undefined, "FAST");
      y += h;
      return h;
    } catch {
      return 0;
    }
  }

  function hLine(x1, x2, color = GRAY_SOFT, weight = 0.3) {
    doc.setDrawColor(...color);
    doc.setLineWidth(weight);
    doc.line(x1, y, x2, y);
  }

  function addFooter() {
    const prevY = y;
    const fy = pageH - 10;
    doc.setDrawColor(...GRAY_SOFT);
    doc.setLineWidth(0.2);
    doc.line(mL, fy - 4, pageW - mR, fy - 4);
    setFont(7.5, "normal", GRAY);
    doc.text(clean(discurso.titulo), mL, fy);
    doc.text(String(pageNum), pageW - mR, fy, { align: "right" });
    y = prevY;
  }

  // ─── Encabezado del documento ───
  function drawHeader() {
    // Barra decorativa superior
    doc.setFillColor(...ACCENT);
    doc.rect(0, 0, pageW, 3, "F");

    y = mTop + 4;
    setFont(9, "bold", ACCENT_DARK);
    doc.text(`DISCURSO N.º ${discurso.numero}`, pageW / 2, y, { align: "center" });
    y += 9;

    // Título
    setFont(18, "bold", TEXT);
    const titleLines = doc.splitTextToSize(clean(discurso.titulo).toUpperCase(), cW - 10);
    for (const line of titleLines) {
      doc.text(line, pageW / 2, y, { align: "center" });
      y += 7.5;
    }

    // Metadata
    gap(2);
    setFont(9.5, "normal", GRAY);
    const meta = `${discurso.duracion}   •   ${discurso.secciones.length} secciones`;
    doc.text(clean(meta), pageW / 2, y, { align: "center" });
    y += 6;

    if (discurso.cancion) {
      setFont(10, "bold", ACCENT);
      doc.text(`Canción ${discurso.cancion}`, pageW / 2, y, { align: "center" });
      y += 6;
    }

    // Separador decorativo
    gap(3);
    doc.setDrawColor(...ACCENT);
    doc.setLineWidth(0.5);
    doc.line(pageW * 0.38, y, pageW * 0.62, y);
    gap(8);
  }

  // ─── Header de sección ───
  function drawSectionHeader(i, sec) {
    need(22);

    // Círculo con número
    const cx = mL + 4.5;
    const cy = y + 2.5;
    doc.setFillColor(...ACCENT);
    doc.circle(cx, cy, 4.2, "F");
    setFont(10, "bold", WHITE);
    doc.text(String(i + 1), cx, cy + 1.3, { align: "center" });

    // Título
    setFont(13, "bold", TEXT);
    const titleW = cW - 15 - 22;
    const titleLines = doc.splitTextToSize(clean(sec.titulo), titleW);
    let ty = y + 3;
    for (const line of titleLines) {
      doc.text(line, mL + 11, ty);
      ty += 5.2;
    }

    // Tiempo
    setFont(9, "bold", ACCENT);
    doc.text(clean(sec.tiempo), pageW - mR, y + 3, { align: "right" });

    y = Math.max(y + 10, ty + 1);
    gap(3);
  }

  // ─── Caja con borde redondeado y barra lateral opcional ───
  function boxed(drawContent, { borderColor = GRAY_SOFT, bgColor, sidebarColor, padX = 5, padY = 4 } = {}) {
    need(15);
    const startY = y;
    y += padY;

    const innerX = mL + padX + (sidebarColor ? 2 : 0);
    const innerMaxW = cW - padX * 2 - (sidebarColor ? 2 : 0);

    drawContent(innerX, innerMaxW);

    y += padY;
    const height = y - startY;

    if (bgColor) {
      doc.setFillColor(...bgColor);
      doc.roundedRect(mL, startY, cW, height, 2, 2, "F");
    }
    if (borderColor) {
      doc.setDrawColor(...borderColor);
      doc.setLineWidth(0.3);
      doc.roundedRect(mL, startY, cW, height, 2, 2, "S");
    }
    if (sidebarColor) {
      doc.setFillColor(...sidebarColor);
      doc.rect(mL, startY, 2, height, "F");
    }

    // Redibujar el contenido encima del fondo
    if (bgColor) {
      y = startY + padY;
      drawContent(innerX, innerMaxW);
      y = startY + height;
    }
  }

  // ─── Renderizadores por tipo ───
  function renderItem(item) {
    switch (item.tipo) {
      case "punto": {
        need(8);
        setFont(10, "bold", ACCENT);
        doc.text("•", mL + 2, y + 3.5);
        writeText(item.texto, mL + 7, 10, TEXT, "normal", cW - 7);
        gap(2.5);
        break;
      }

      case "subpunto": {
        need(8);
        setFont(9, "normal", GRAY);
        doc.text("›", mL + 10, y + 3.5);
        writeText(item.texto, mL + 14, 9.5, GRAY, "italic", cW - 14);
        gap(2);
        break;
      }

      case "pregunta": {
        need(14);
        const startY = y;
        y += 3;
        writeText(item.texto, mL + 7, 10.5, ACCENT_DARK, "italic", cW - 10);
        y += 2;
        const h = y - startY;
        doc.setFillColor(...AMBER_SOFT);
        doc.roundedRect(mL, startY, cW, h, 1.5, 1.5, "F");
        doc.setFillColor(...ACCENT);
        doc.rect(mL, startY, 1.8, h, "F");
        // Re-renderizar encima del fondo
        y = startY + 3;
        writeText(item.texto, mL + 7, 10.5, ACCENT_DARK, "italic", cW - 10);
        y = startY + h;
        gap(4);
        break;
      }

      case "lectura": {
        need(20);
        const startY = y;
        y += 4;

        // Badge LEA
        doc.setFillColor(...BLUE);
        doc.roundedRect(mL + 4, y - 1, 11, 5, 1, 1, "F");
        setFont(7, "bold", WHITE);
        doc.text("LEA", mL + 9.5, y + 2.5, { align: "center" });

        // Cita
        setFont(10.5, "bold", BLUE);
        doc.text(clean(item.cita), mL + 18, y + 2.8);

        // Tiempo
        if (item.seg) {
          setFont(8, "normal", GRAY);
          doc.text(clean(item.seg), pageW - mR - 3, y + 2.8, { align: "right" });
        }

        y += 7;

        // Texto del versículo
        writeText(item.texto, mL + 6, 10, [55, 53, 48], "normal", cW - 12);

        y += 2;
        const h = y - startY;
        doc.setDrawColor(...BLUE);
        doc.setLineWidth(0.4);
        doc.setFillColor(...BLUE_SOFT);
        doc.roundedRect(mL, startY, cW, h, 2, 2, "FD");

        // Re-renderizar contenido encima del fondo
        y = startY + 4;
        doc.setFillColor(...BLUE);
        doc.roundedRect(mL + 4, y - 1, 11, 5, 1, 1, "F");
        setFont(7, "bold", WHITE);
        doc.text("LEA", mL + 9.5, y + 2.5, { align: "center" });
        setFont(10.5, "bold", BLUE);
        doc.text(clean(item.cita), mL + 18, y + 2.8);
        if (item.seg) {
          setFont(8, "normal", GRAY);
          doc.text(clean(item.seg), pageW - mR - 3, y + 2.8, { align: "right" });
        }
        y += 7;
        writeText(item.texto, mL + 6, 10, [55, 53, 48], "normal", cW - 12);
        y = startY + h;

        gap(4);
        break;
      }

      case "referencia": {
        need(18);
        const startY = y;
        y += 4;

        // Badge PARAFRASEAR
        doc.setFillColor(...GREEN);
        doc.roundedRect(mL + 4, y - 1, 24, 5, 1, 1, "F");
        setFont(6.5, "bold", WHITE);
        doc.text("PARAFRASEAR", mL + 16, y + 2.5, { align: "center" });

        // Cita
        setFont(10, "bold", GREEN);
        doc.text(clean(item.cita), mL + 31, y + 2.8);

        y += 7;
        writeText(item.texto, mL + 6, 9.5, [75, 100, 75], "italic", cW - 12);

        y += 2;
        const h = y - startY;
        doc.setFillColor(...GREEN_SOFT);
        doc.setDrawColor(...GREEN);
        doc.setLineWidth(0.3);
        doc.roundedRect(mL, startY, cW, h, 2, 2, "FD");
        doc.setFillColor(...GREEN);
        doc.rect(mL, startY, 1.8, h, "F");

        y = startY + 4;
        doc.setFillColor(...GREEN);
        doc.roundedRect(mL + 4, y - 1, 24, 5, 1, 1, "F");
        setFont(6.5, "bold", WHITE);
        doc.text("PARAFRASEAR", mL + 16, y + 2.5, { align: "center" });
        setFont(10, "bold", GREEN);
        doc.text(clean(item.cita), mL + 31, y + 2.8);
        y += 7;
        writeText(item.texto, mL + 6, 9.5, [75, 100, 75], "italic", cW - 12);
        y = startY + h;

        gap(4);
        break;
      }

      case "cita_biblica": {
        need(14);
        const startY = y;
        y += 3;
        if (item.contexto) {
          writeText(item.contexto, mL + 7, 9, GRAY, "italic", cW - 10);
          gap(1);
        }
        writeText(item.texto, mL + 7, 10.5, ACCENT_DARK, "bold", cW - 10);
        y += 2;
        const h = y - startY;
        doc.setFillColor(...ACCENT);
        doc.rect(mL, startY, 1.8, h, "F");
        gap(3);
        break;
      }

      case "subtitulo": {
        need(14);
        gap(4);
        doc.setDrawColor(...GRAY_SOFT);
        doc.setLineWidth(0.3);
        doc.line(mL + 15, y, pageW - mR - 15, y);
        gap(3);
        writeText(item.texto, mL, 11.5, TEXT, "bold", cW, "center");
        gap(3);
        break;
      }

      case "destacado": {
        need(14);
        const startY = y;
        y += 3.5;
        writeText(item.texto, mL + 7, 10.5, ACCENT_DARK, "bold", cW - 10);
        y += 3;
        const h = y - startY;
        doc.setFillColor(...AMBER_SOFT);
        doc.roundedRect(mL, startY, cW, h, 2, 2, "F");
        doc.setFillColor(...ACCENT);
        doc.rect(mL, startY, 1.8, h, "F");
        y = startY + 3.5;
        writeText(item.texto, mL + 7, 10.5, ACCENT_DARK, "bold", cW - 10);
        y = startY + h;
        gap(4);
        break;
      }

      case "lista_enseñanza": {
        need(20);
        const startY = y;
        y += 4;

        if (item.titulo) {
          writeText(item.titulo.toUpperCase(), mL, 9, ACCENT_DARK, "bold", cW, "center");
          gap(3);
          doc.setDrawColor(...GRAY_SOFT);
          doc.setLineWidth(0.2);
          doc.line(mL + 25, y, pageW - mR - 25, y);
          gap(3);
        }

        for (let k = 0; k < item.items.length; k++) {
          const li = item.items[k];
          need(10);
          const itemStart = y;
          setFont(10, "bold", TEXT);
          const puntoLines = doc.splitTextToSize(clean(li.punto), cW - 12);
          let py = y + 3.8;
          for (const line of puntoLines) {
            doc.text(line, mL + 7, py);
            py += 4.8;
          }
          y = py - 1;
          if (li.detalle) {
            writeText(li.detalle, mL + 7, 9, GRAY, "normal", cW - 12);
          }
          const itemH = y - itemStart;
          doc.setFillColor(...ACCENT);
          doc.rect(mL + 3, itemStart + 1, 1.2, itemH - 1, "F");
          if (k < item.items.length - 1) gap(2.5);
        }

        y += 3;
        const h = y - startY;
        doc.setDrawColor(...GRAY_SOFT);
        doc.setLineWidth(0.25);
        doc.roundedRect(mL, startY, cW, h, 2, 2, "S");
        gap(4);
        break;
      }

      case "cualidades": {
        need(14);
        for (const q of item.items) {
          need(14);
          const startY = y;
          y += 2;
          setFont(9, "bold", ACCENT_DARK);
          doc.text(clean(q.nombre).toUpperCase(), mL + 7, y + 3);
          y += 5;
          writeText(q.detalle, mL + 7, 9.5, TEXT, "normal", cW - 10);
          if (q.reflexion) {
            gap(1);
            writeText(q.reflexion, mL + 10, 9, GRAY, "italic", cW - 14);
          }
          y += 2;
          const h = y - startY;
          doc.setFillColor(...ACCENT);
          doc.rect(mL + 2, startY, 1.5, h, "F");
          gap(3.5);
        }
        break;
      }

      case "ejemplo": {
        need(16);
        const startY = y;
        y += 3;
        setFont(8, "bold", ACCENT_DARK);
        doc.text("EJEMPLO", mL + 7, y + 2);
        y += 5;
        writeText(item.texto, mL + 7, 10, TEXT, "italic", cW - 10);
        y += 2;
        const h = y - startY;
        doc.setFillColor(...AMBER_SOFT);
        doc.roundedRect(mL, startY, cW, h, 2, 2, "F");
        doc.setFillColor(...ACCENT);
        doc.rect(mL, startY, 1.8, h, "F");
        y = startY + 3;
        setFont(8, "bold", ACCENT_DARK);
        doc.text("EJEMPLO", mL + 7, y + 2);
        y += 5;
        writeText(item.texto, mL + 7, 10, TEXT, "italic", cW - 10);
        y = startY + h;
        gap(4);
        break;
      }

      case "ejemplo_biblico": {
        need(18);
        const startY = y;
        y += 4;

        writeText(item.nombre.toUpperCase(), mL, 10, ACCENT_DARK, "bold", cW, "center");
        gap(3);

        if (item.img && imageCache.has(item.img)) {
          drawImage(item.img, cW * 0.55, 50);
          gap(3);
        }

        if (item.narrativa) {
          writeText(item.narrativa, mL + 7, 10, TEXT, "normal", cW - 10);
          gap(2);
        }

        if (item.claves) {
          for (const c of item.claves) {
            need(8);
            setFont(9, "bold", ACCENT);
            doc.text("•", mL + 7, y + 3.5);
            writeText(c, mL + 12, 9.5, TEXT, "normal", cW - 15);
            gap(1.5);
          }
        }

        y += 2;
        const h = y - startY;
        doc.setDrawColor(...GRAY_SOFT);
        doc.setLineWidth(0.25);
        doc.roundedRect(mL, startY, cW, h, 2, 2, "S");
        doc.setFillColor(...ACCENT);
        doc.rect(mL, startY, 1.8, h, "F");
        gap(4);
        break;
      }

      case "definicion": {
        need(16);
        const startY = y;
        y += 4;
        setFont(11, "bold", ACCENT_DARK);
        doc.text(clean(item.termino), mL + 7, y + 2);

        if (item.lsm) {
          setFont(7.5, "bold", GRAY);
          doc.text(`LSM: ${clean(item.lsm).toUpperCase()}`, pageW - mR - 3, y + 2, { align: "right" });
        }

        y += 6;
        writeText(item.texto, mL + 7, 10, TEXT, "normal", cW - 10);
        y += 3;
        const h = y - startY;
        doc.setDrawColor(...ACCENT);
        doc.setLineWidth(0.35);
        doc.setFillColor(...AMBER_SOFT);
        doc.roundedRect(mL, startY, cW, h, 2, 2, "FD");

        y = startY + 4;
        setFont(11, "bold", ACCENT_DARK);
        doc.text(clean(item.termino), mL + 7, y + 2);
        if (item.lsm) {
          setFont(7.5, "bold", GRAY);
          doc.text(`LSM: ${clean(item.lsm).toUpperCase()}`, pageW - mR - 3, y + 2, { align: "right" });
        }
        y += 6;
        writeText(item.texto, mL + 7, 10, TEXT, "normal", cW - 10);
        y = startY + h;

        gap(4);
        break;
      }

      case "pilares": {
        need(16);
        for (const p of item.items) {
          need(12);
          writeText(clean(p.nombre).toUpperCase(), mL + 5, 10, ACCENT_DARK, "bold", cW - 8);
          gap(1);
          writeText(p.detalle, mL + 8, 9.5, TEXT, "normal", cW - 12);
          gap(3);
        }
        break;
      }

      case "llamado_accion": {
        need(18);
        const startY = y;
        y += 4;
        writeText("LLAMADO A LA ACCIÓN", mL, 8.5, ACCENT_DARK, "bold", cW, "center");
        gap(3);
        writeText(item.texto, mL + 7, 10.5, TEXT, "normal", cW - 10);
        y += 3;
        const h = y - startY;
        doc.setDrawColor(...ACCENT);
        doc.setLineWidth(0.5);
        doc.setFillColor(...AMBER_SOFT);
        doc.roundedRect(mL, startY, cW, h, 2.5, 2.5, "FD");
        y = startY + 4;
        writeText("LLAMADO A LA ACCIÓN", mL, 8.5, ACCENT_DARK, "bold", cW, "center");
        gap(3);
        writeText(item.texto, mL + 7, 10.5, TEXT, "normal", cW - 10);
        y = startY + h;
        gap(4);
        break;
      }

      case "cierre": {
        need(20);
        gap(6);
        writeText(item.texto, mL, 13, ACCENT_DARK, "bold", cW, "center");
        gap(5);
        break;
      }

      case "video": {
        need(10);
        gap(1);
        // Etiqueta "VIDEO" con triángulo play dibujado
        const tx = mL + 4, ty = y + 1;
        doc.setFillColor(180, 60, 60);
        doc.triangle(tx, ty, tx, ty + 4, tx + 4, ty + 2, "F");
        setFont(9, "bold", [180, 60, 60]);
        doc.text("VIDEO", mL + 11, y + 4);
        y += 6;
        // Preview del video si hay imagen
        if (item.img && imageCache.has(item.img)) {
          gap(2);
          drawImage(item.img, cW * 0.6, 60);
        }
        gap(3);
        break;
      }

      case "imagen": {
        if (item.img && imageCache.has(item.img)) {
          gap(2);
          drawImage(item.img, cW * 0.7, 80);
          gap(3);
        }
        break;
      }

      default:
        break;
    }
  }

  // ─── Generar documento ───
  drawHeader();

  for (let i = 0; i < discurso.secciones.length; i++) {
    const sec = discurso.secciones[i];
    drawSectionHeader(i, sec);

    for (const item of sec.contenido) {
      renderItem(item);
    }

    if (i < discurso.secciones.length - 1) {
      gap(4);
      doc.setDrawColor(...GRAY_SOFT);
      doc.setLineWidth(0.3);
      doc.line(mL + 30, y, pageW - mR - 30, y);
      gap(6);
    }
  }

  // Footer última página
  addFooter();

  // ─── Guardar ───
  const nombre = clean(discurso.titulo)
    .replace(/[^a-zA-ZáéíóúñÁÉÍÓÚÑ0-9 ]/g, "")
    .replace(/ +/g, "_")
    .substring(0, 40);
  doc.save(`Discurso_${discurso.numero}_${nombre}.pdf`);
}
