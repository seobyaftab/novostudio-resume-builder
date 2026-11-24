import { toPng } from 'html-to-image';
import jsPDF from 'jspdf';

/**
 * Directly downloads the resume canvas as a high-resolution A4 PDF file directly to disk,
 * strictly without opening the browser's "Print / Save as PDF" dialog.
 */
export async function exportDirectPdf(documentTitle = 'Resume'): Promise<void> {
  const element = document.getElementById('resume-a4-sheet');
  if (!element) {
    console.error('Resume sheet element (#resume-a4-sheet) not found.');
    return;
  }

  // Clean filename for the direct file download
  const sanitized = (documentTitle || 'Resume')
    .replace(/[^a-zA-Z0-9_\- ]/g, '')
    .trim()
    .replace(/\s+/g, '_');
  const filename = `${sanitized || 'Resume'}.pdf`;

  try {
    // Render high-res PNG using native browser SVG foreignObject rasterization
    // (natively supports Tailwind v4 oklch colors, CSS variables, and modern web fonts)
    const dataUrl = await toPng(element, {
      pixelRatio: 2, // 2x print resolution (~200-300 DPI)
      backgroundColor: '#ffffff',
      filter: (node) => {
        // Exclude UI controls, buttons, and no-print helpers from PDF
        if (node instanceof HTMLElement && node.classList.contains('no-print')) {
          return false;
        }
        return true;
      },
    });

    const img = new Image();
    img.src = dataUrl;
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (img.naturalHeight * imgWidth) / img.naturalWidth;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // Handle multi-page overflow if resume is taller than standard A4
    while (heightLeft > 5) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(dataUrl, 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    // Direct browser file download: saves file to disk without invoking window.print()
    pdf.save(filename);
  } catch (err) {
    console.error('Failed to generate direct PDF file:', err);
    // Explicitly do NOT call window.print(); user requested direct file download only.
  }
}

export const exportVectorPdf = exportDirectPdf;
