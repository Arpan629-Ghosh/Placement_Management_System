/**
 * Converts Gemini response into a JavaScript object.
 * Handles markdown code fences if Gemini returns them.
 */

export const parseGeminiJSON = (responseText) => {
  try {
    if (!responseText) {
      throw new Error("Empty AI response.");
    }

    // Remove markdown code blocks
    const cleaned = responseText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/\s*```$/, "")
      .trim();

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("❌ Gemini JSON Parse Error");
    console.error("Raw Response:\n", responseText);

    throw new Error("Failed to parse AI response.");
  }
};
