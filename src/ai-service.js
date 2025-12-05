import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

export const generateQuizQuestions = async (topic) => {
  
  try {
    const model = genAI.getGenerativeModel({ model: import.meta.env.VITE_GEMINI_MODEL });
    const prompt = `
      You are a quiz generator. Create 5 multiple-choice questions about "${topic}".
      Requirements:
      1. Return ONLY a valid JSON array.
      2. Do not add any markdown formatting.
      3. Format: [{"id": 1, "question": "...", "options": [], "correctAnswer": "..."}]
    `;
    const result = await model.generateContent(prompt);
    const text = result.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(text);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to load questions");
  }
};


export const generateAIFeedback = async (topic, score, totalQuestions) => {
  try {
    const model = genAI.getGenerativeModel({ model: import.meta.env.VITE_GEMINI_MODEL });

    const prompt = `
      The user just took a quiz on the topic: "${topic}".
      They scored ${score} out of ${totalQuestions}.
      
      Write a short, encouraging, and specific feedback paragraph (max 2 sentences).
      - If the score is low, be supportive and suggest what to study.
      - If the score is high, praise their specific knowledge in this field.
      - Talk directly to the user ("You...").
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Feedback Error:", error);
    return "Great effort! Keep practicing to improve your score."; // Fallback if API fails
  }
};