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

  try {
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

    // 🔴 Handle HTTP errors FIRST
    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI HTTP Error:", errorData);
      throw new Error(errorData.error?.message || "Failed to fetch AI response");
    }

    const data = await response.json();

    console.log("FULL AI RESPONSE:", JSON.stringify(data, null, 2));

    // 🔴 Validate response safely
    if (!data.choices || !data.choices.length) {
      console.error("Invalid AI response structure:", data);
      throw new Error("Invalid AI response");
    }

    const content = data.choices[0]?.message?.content;

    if (!content) {
      console.error("Missing message content:", data);
      throw new Error("No message content in AI response");
    }

    return content;

  } catch (error) {
    console.error("getAIResponse ERROR:", error.message);
    throw error;
  }
}