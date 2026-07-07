import { PDFParse } from "pdf-parse";

export const extractResumeText = async (buffer) => {
  try {
    const parser = new PDFParse({ data: buffer });

    const result = await parser.getText();

    await parser.destroy();

    return result.text;
  } catch (error) {
    console.error("PDF Extraction Error:", error);
    throw new Error("Unable to extract resume text.");
  }
};
