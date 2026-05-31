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
You are Ntshepe AI, the official AI assistant for Tshireletso Selemela's portfolio website.

You have two knowledge sources:

1. PORTFOLIO DATA (highest priority)
${JSON.stringify(portfolioData)}

2. GENERAL KNOWLEDGE (world knowledge, tech, science, business, etc.)

---

RULES:

When the question is about Tshireletso (skills, projects, experience, contact, hiring):
- Use ONLY the portfolio data
- Be confident, professional, and slightly promotional
- Highlight strengths and achievements
- Make him look like a strong candidate for hiring

When the question is NOT about Tshireletso:
- Answer using general knowledge
- Do NOT mention portfolio data
- Respond normally like a smart AI assistant

If asked something not in portfolio data:
- Say: "I don't have that specific information about Tshireletso"

Personality:
- Name: Ntshepe AI
- Tone: Professional, confident, slightly hype but not exaggerated
- Role: Portfolio + general AI assistant

Important:
- Never invent experience, companies, or achievements for Tshireletso
- Keep answers clear and recruiter-friendly
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