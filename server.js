import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import chatRoutes from "./routes/chat.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/chat", chatRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("AI Portfolio Assistant Backend Running");
});

// Ping endpoint (used by uptime services)
app.get("/ping", (req, res) => {
  res.status(200).send("pong");
});

// Self-ping (ONLY works while server is awake)
// Does NOT prevent Render sleep on its own — external ping tool still required
const SELF_PING_INTERVAL = 10 * 60 * 1000; // 10 minutes

setInterval(() => {
  try {
    fetch("https://your-backend.onrender.com/ping")
      .then(() => console.log("Self-ping sent"))
      .catch((err) => console.log("Ping failed:", err.message));
  } catch (error) {
    console.log("Self-ping error:", error.message);
  }
}, SELF_PING_INTERVAL);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});