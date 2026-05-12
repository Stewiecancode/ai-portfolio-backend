import { GoogleGenerativeAI } from "@google/generative-ai";
import portfolioData from "../data/portfolio.js";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getAIResponse(message, history = []) {

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash"
  });

  const systemPrompt = `
You are a professional AI assistant for a developer portfolio.

ONLY use the data below:
${JSON.stringify(portfolioData)}

Rules:
- Be concise and professional
- Help recruiters understand the developer
- Suggest relevant projects
- If missing info, say:
"I don't have that information"
`;

  const chat = model.startChat({
    history: history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }))
  });

  const result = await chat.sendMessage(
    `${systemPrompt}\n\nUser: ${message}`
  );

  return result.response.text();
}