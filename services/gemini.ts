
import { GoogleGenAI } from "@google/genai";

// Use process.env.API_KEY directly for initialization as per guidelines
export const getGeminiInspiration = async (prompt: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "You are the Lead Strategist at the Honest Marketing Club. Provide marketing advice that is high-growth and ethically sound. Tone: intellectual and direct. Max 80 words.",
        temperature: 0.7
      }
    });

    // Directly access .text property from GenerateContentResponse
    return response.text || "応答を生成できませんでした。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "戦略プロセッサが一時的に混雑しています。会員様専用ラインにて再試行してください。";
  }
};
