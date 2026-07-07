import ai from "./gemini.js";
import { jobAnalysisPrompt } from "./prompts.js";
import { parseGeminiJSON } from "./parser.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const analyzeJob = async (job) => {
  const MAX_RETRIES = 5;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const prompt = jobAnalysisPrompt(job);

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return parseGeminiJSON(response.text);
    } catch (error) {
      console.error(
        `Gemini attempt ${attempt}/${MAX_RETRIES} failed`,
        error.message || error,
      );

      if (attempt === MAX_RETRIES) {
        throw new Error("AI_JOB_ANALYSIS_FAILED");
      }

      // exponential backoff
      await sleep(2000 * attempt);
    }
  }
};
