import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportElementToPdf(elementId, filename = "mindmap.pdf") {
  const input = document.getElementById(elementId);

  if (!input) {
    console.error(`Element with id '${elementId}' not found`);
    return;
  }

  try {
    // Convert element to canvas
    const canvas = await html2canvas(input, {
      useCORS: true,
      scale: 2, // higher quality
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("landscape", "pt", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);

    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = (pdfHeight - imgHeight * ratio) / 2;

    pdf.addImage(
      imgData,
      "PNG",
      imgX,
      imgY,
      imgWidth * ratio,
      imgHeight * ratio
    );
    pdf.save(filename);
  } catch (err) {
    console.error("PDF export failed:", err);
  }

  return true;
}
