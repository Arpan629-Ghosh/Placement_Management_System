import { PDFDocument } from "pdf-lib";

export const optimizePdfFile = async (file) => {
  const pdfBytes = await file.arrayBuffer();
  const pdfDocument = await PDFDocument.load(pdfBytes);

  const optimizedBytes = await pdfDocument.save({
    useObjectStreams: true,
  });

  return new File([optimizedBytes], file.name, {
    type: "application/pdf",
    lastModified: Date.now(),
  });
};
