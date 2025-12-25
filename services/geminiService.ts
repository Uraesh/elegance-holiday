
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const generateHolidayGreeting = async (prompt: string = "Crée un vœu de Noël sophistiqué, poétique et raffiné."): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: "Tu es un maître de la littérature élégante et minimaliste. Génère de courts vœux de Noël ou de fin d'année en français. Tu dois impérativement tutoyer la destinataire (Charlotte). Utilise un ton extrêmement doux, intime et bienveillant. Évite les clichés. Concentre-toi sur la chaleur, la lumière, le calme et une affection sincère. Garde le texte sous 20 mots.",
        temperature: 0.8,
      },
    });

    return response.text?.trim() || "Que cette saison t'apporte douceur et sérénité, Charlotte.";
  } catch (error) {
    console.error("Error generating greeting:", error);
    return "Que cette saison t'apporte douceur et sérénité, Charlotte.";
  }
};
