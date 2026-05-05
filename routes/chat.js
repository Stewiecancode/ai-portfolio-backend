import express from "express";
import { getAIResponse } from "../services/openai.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { message, history } = req.body;

  // Basic validation
  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Invalid message" });
  }

  try {
    const reply = await getAIResponse(message, history || []);
    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "AI request failed" });
  }
});

export default router;