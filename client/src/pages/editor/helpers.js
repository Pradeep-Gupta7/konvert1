import { StandardFonts } from 'pdf-lib';

/* ── Standard PDF Fonts (these are the only ones pdf-lib can embed) ── */
export const FONT_MAP = {
  Helvetica:            StandardFonts.Helvetica,
  'Helvetica-Bold':     StandardFonts.HelveticaBold,
  'Helvetica-Oblique':  StandardFonts.HelveticaOblique,
  'Helvetica-BoldOblique': StandardFonts.HelveticaBoldOblique,
  'Times-Roman':        StandardFonts.TimesRoman,
  'Times-Bold':         StandardFonts.TimesRomanBold,
  'Times-Italic':       StandardFonts.TimesRomanItalic,
  'Times-BoldItalic':   StandardFonts.TimesRomanBoldItalic,
  Courier:              StandardFonts.Courier,
  'Courier-Bold':       StandardFonts.CourierBold,
  'Courier-Oblique':    StandardFonts.CourierOblique,
  'Courier-BoldOblique':StandardFonts.CourierBoldOblique,
};

export const CANVAS_SCALE = 1.5;

/* ── Colour helpers ── */
export function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.slice(0, 2), 16) / 255,
    g: parseInt(h.slice(2, 4), 16) / 255,
    b: parseInt(h.slice(4, 6), 16) / 255,
  };
}

export function rgbToHex(r, g, b) {
  const toHex = (v) => {
    const n = Math.round(Math.max(0, Math.min(1, v)) * 255);
    return n.toString(16).padStart(2, '0');
  };
  return '#' + toHex(r) + toHex(g) + toHex(b);
}

export function dataUrlToBytes(dataUrl) {
  const b = atob(dataUrl.split(',')[1]);
  const u = new Uint8Array(b.length);
  for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i);
  return u;
}

/* ── Font-family mapping: PDF font name → CSS family ── */
const FONT_CSS_MAP = {
  // Helvetica / Arial family
  'helvetica':      '"Helvetica Neue", Helvetica, Arial, sans-serif',
  'arial':          'Arial, "Helvetica Neue", Helvetica, sans-serif',
  'arialmt':        'Arial, "Helvetica Neue", Helvetica, sans-serif',
  // Times family
  'times':          '"Times New Roman", Times, serif',
  'timesnewroman':  '"Times New Roman", Times, serif',
  'timesnewromanpsmt': '"Times New Roman", Times, serif',
  // Courier family
  'courier':        '"Courier New", Courier, monospace',
  'couriernew':     '"Courier New", Courier, monospace',
  // Calibri
  'calibri':        'Calibri, "Segoe UI", Tahoma, sans-serif',
  // Georgia
  'georgia':        'Georgia, "Times New Roman", serif',
  // Verdana
  'verdana':        'Verdana, Geneva, sans-serif',
  // Tahoma
  'tahoma':         'Tahoma, Geneva, sans-serif',
  // Trebuchet
  'trebuchetms':    '"Trebuchet MS", Helvetica, sans-serif',
  // Comic Sans
  'comicsansms':    '"Comic Sans MS", cursive',
  // Impact
  'impact':         'Impact, "Arial Black", sans-serif',
  // Lucida
  'lucidaconsole':  '"Lucida Console", Monaco, monospace',
  // Segoe
  'segoeui':        '"Segoe UI", Tahoma, sans-serif',
  // Garamond
  'garamond':       'Garamond, "Times New Roman", serif',
  // Palatino
  'palatino':       '"Palatino Linotype", "Book Antiqua", Palatino, serif',
  // Century
  'centurygothic':  '"Century Gothic", Futura, sans-serif',
  // Cambria
  'cambria':        'Cambria, Georgia, serif',
  // Consolas
  'consolas':       'Consolas, "Courier New", monospace',
};

/**
 * Map a PDF font name to the best CSS font-family string for preview.
 */
export function cssFontFamily(pdfFontName = 'Helvetica') {
  // Normalize: lowercase, strip dash/space/weight suffixes
  const raw = pdfFontName.toLowerCase()
    .replace(/[-_\s]/g, '')
    .replace(/(bold|italic|oblique|regular|medium|light|semibold|condensed|ps|mt|ms)/gi, '')
    .trim();

  for (const [key, css] of Object.entries(FONT_CSS_MAP)) {
    if (raw.includes(key) || key.includes(raw)) return css;
  }

  // Fallback heuristic
  if (raw.includes('serif') && !raw.includes('sans')) return '"Times New Roman", Times, serif';
  if (raw.includes('mono') || raw.includes('console')) return '"Courier New", Courier, monospace';
  return '"Helvetica Neue", Helvetica, Arial, sans-serif';
}

/**
 * Map PDF font name → closest pdf-lib StandardFont key for saving.
 */
export function pdfLibFontKey(fontFamily, bold, italic) {
  const name = (fontFamily || 'Helvetica').toLowerCase();
  let base;
  if (name.includes('times') || name.includes('roman') || name.includes('serif')) {
    base = 'Times';
  } else if (name.includes('courier') || name.includes('mono') || name.includes('consola')) {
    base = 'Courier';
  } else {
    base = 'Helvetica';
  }

  if (base === 'Times') {
    if (bold && italic) return 'Times-BoldItalic';
    if (bold) return 'Times-Bold';
    if (italic) return 'Times-Italic';
    return 'Times-Roman';
  }
  if (base === 'Courier') {
    if (bold && italic) return 'Courier-BoldOblique';
    if (bold) return 'Courier-Bold';
    if (italic) return 'Courier-Oblique';
    return 'Courier';
  }
  // Helvetica
  if (bold && italic) return 'Helvetica-BoldOblique';
  if (bold) return 'Helvetica-Bold';
  if (italic) return 'Helvetica-Oblique';
  return 'Helvetica';
}

export function makeId() {
  return 'el_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6);
}

/* ── Available font families for the toolbar dropdown ── */
export const AVAILABLE_FONTS = [
  { label: 'Helvetica',        value: 'Helvetica' },
  { label: 'Arial',            value: 'Arial' },
  { label: 'Times New Roman',  value: 'Times-Roman' },
  { label: 'Courier New',      value: 'Courier' },
  { label: 'Georgia',          value: 'Georgia' },
  { label: 'Verdana',          value: 'Verdana' },
  { label: 'Calibri',          value: 'Calibri' },
  { label: 'Tahoma',           value: 'Tahoma' },
  { label: 'Trebuchet MS',     value: 'Trebuchet MS' },
  { label: 'Garamond',         value: 'Garamond' },
  { label: 'Palatino',         value: 'Palatino' },
  { label: 'Cambria',          value: 'Cambria' },
  { label: 'Consolas',         value: 'Consolas' },
];

export const FONT_SIZES = [6,7,8,9,10,11,12,13,14,16,18,20,22,24,28,32,36,42,48,56,64,72];

/**
 * Extract text blocks from all pages using pdfjs.
 * Returns array of { pageIdx, x, y, w, h, text, fontSize, fontName, color, bold, italic }
 */
export async function extractTextBlocks(pdfBytes, pageDims) {
  const { getDocument } = await import('pdfjs-dist');
  // Create a truly independent copy — .slice() makes a new ArrayBuffer
  const safeCopy = pdfBytes.buffer.slice(pdfBytes.byteOffset, pdfBytes.byteOffset + pdfBytes.byteLength);
  const pdf = await getDocument({ data: new Uint8Array(safeCopy) }).promise;
  const blocks = [];

  for (let pi = 1; pi <= pdf.numPages; pi++) {
    const page = await pdf.getPage(pi);
    const vp = page.getViewport({ scale: 1 });
    const tc = await page.getTextContent({ includeMarkedContent: false });
    const dim = pageDims[pi - 1];
    if (!dim) continue;

    const styles = tc.styles || {};

    for (const item of tc.items) {
      if (!item.str || !item.str.trim()) continue;

      const tx = item.transform; // [a, b, c, d, e, f]
      const fontSize = Math.abs(tx[3]) || item.height || 12;
      // PDF coords: origin bottom-left → screen: origin top-left
      const x = tx[4];
      const y = vp.height - tx[5] - fontSize;
      const w = item.width || item.str.length * fontSize * 0.55;
      const h = fontSize * 1.3;

      // Detect bold/italic from font name
      const rawFont = item.fontName || '';
      const lf = rawFont.toLowerCase();
      const isBold = lf.includes('bold') || lf.includes('black') || lf.includes('heavy');
      const isItalic = lf.includes('italic') || lf.includes('oblique');

      // Try to get color from styles
      let color = '#000000';
      if (styles[item.fontName]) {
        // pdfjs sometimes provides color info in styles
        const st = styles[item.fontName];
        if (st.color) {
          color = rgbToHex(st.color[0] || 0, st.color[1] || 0, st.color[2] || 0);
        }
      }

      blocks.push({
        id: makeId(),
        pageIdx: pi - 1,
        x: (x / vp.width) * dim.w,
        y: (y / vp.height) * dim.h,
        w: (w / vp.width) * dim.w,
        h: (h / vp.height) * dim.h,
        text: item.str,
        fontSize: (fontSize / vp.height) * dim.h,
        fontName: rawFont,
        color,
        bold: isBold,
        italic: isItalic,
      });
    }
  }
  return blocks;
}
