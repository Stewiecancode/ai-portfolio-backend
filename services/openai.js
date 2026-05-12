import dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";
import portfolioData from "../data/portfolio.js";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function getAIResponse(message, history = []) {

  const systemPrompt = `
You are a professional AI assistant for a developer portfolio.

ONLY use the data below:
${JSON.stringify(portfolioData)}

Rules:
- Be concise and professional
- Help recruiters understand the developer
- Suggest relevant projects
- If info is missing, say:
"I don't have that information"
`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...history,
    { role: "user", content: message }
  ];

  try {

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages,
    });

    return response.choices[0].message.content;

  } catch (error) {
    console.error(error);
    return "AI service temporarily unavailable.";
  }
}