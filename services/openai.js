import portfolioData from "../data/portfolio.js";

export async function getAIResponse(message, history = []) {
  const systemPrompt = `
You are a professional AI assistant for a developer's portfolio.

ONLY use the data below to answer questions:
${JSON.stringify(portfolioData)}

Rules:
- Be concise and professional
- Help recruiters understand the developer
- Suggest relevant projects when possible
- If info is missing, say "I don't have that information"
`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...history,
    { role: "user", content: message }
  ];

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages
    })
  });

  const data = await response.json();

  if (!data.choices) {
    throw new Error("Invalid AI response");
  }

  return data.choices[0].message.content;
}