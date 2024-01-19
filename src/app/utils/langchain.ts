import * as pdfParse from "pdf-parse";

const langchainProcess = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const text = new TextDecoder().decode(arrayBuffer);
    const buffer = Buffer.from(text);
    const data = await pdfParse.default(buffer);
    const extractedText = data.text;
    return extractedText;
  } catch (error: any) {
    throw new Error(`Error processing PDF File: ${error.message}`);
  }
};

export { langchainProcess };
