const { PDFDocument, rgb, StandardFonts, degrees } = require('pdf-lib');

/**
 * Parse page range specification like "1-3,5,8-10" into sorted array of 1-based page numbers.
 */
function parseRanges(spec, maxPages) {
  const pages = new Set();
  if (!spec || !spec.trim()) return [];

  const parts = spec.split(',');
  for (let part of parts) {
    part = part.trim();
    if (part.includes('-')) {
      const [a, b] = part.split('-', 2);
      const start = parseInt(a, 10);
      const end = parseInt(b, 10);
      if (isNaN(start) || isNaN(end)) continue;
      for (let i = start; i <= end; i++) {
        if (i >= 1 && i <= maxPages) pages.add(i);
      }
    } else {
      const num = parseInt(part, 10);
      if (!isNaN(num) && num >= 1 && num <= maxPages) {
        pages.add(num);
      }
    }
  }

  return Array.from(pages).sort((a, b) => a - b);
}

/**
 * Add watermark text to all pages of a PDF document (returns new PDF bytes).
 */
async function addWatermark(pdfBytes, text, fontSize = 42, angle = 45) {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();

  for (const page of pages) {
    const { width, height } = page.getSize();
    const textWidth = font.widthOfTextAtSize(text, fontSize);

    page.drawText(text, {
      x: width / 2 - textWidth / 2,
      y: height / 2,
      size: fontSize,
      font,
      color: rgb(0.6, 0.6, 0.6),
      opacity: 0.3,
      rotate: degrees(angle),
    });
  }

  return await pdfDoc.save();
}

/**
 * Add page numbers to all pages (bottom right).
 */
async function addPageNumbers(pdfBytes) {
  const pdfDoc = await PDFDocument.load(pdfBytes);
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const pages = pdfDoc.getPages();

  pages.forEach((page, index) => {
    const { width } = page.getSize();
    const text = `${index + 1}`;
    const textWidth = font.widthOfTextAtSize(text, 10);
    const margin = 42; // ~15mm

    page.drawText(text, {
      x: width - margin - textWidth,
      y: margin,
      size: 10,
      font,
      color: rgb(0, 0, 0),
    });
  });

  return await pdfDoc.save();
}

module.exports = {
  parseRanges,
  addWatermark,
  addPageNumbers,
};
