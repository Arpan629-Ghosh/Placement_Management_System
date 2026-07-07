import ai from "./gemini.js";
import { resumeAnalysisPrompt } from "./prompts.js";
import { parseGeminiJSON } from "./parser.js";

export const analyzeResume = async (resumeText) => {
  try {
    const prompt = resumeAnalysisPrompt(resumeText);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const parsed = parseGeminiJSON(response.text);

    return parsed;
  } catch (error) {
    console.error(error);

    throw new Error("Resume analysis failed.");
  }
};
