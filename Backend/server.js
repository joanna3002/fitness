// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Groq } from "groq-sdk";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const PORT = process.env.PORT || 5000;

// ---------------------------
// ROOT
// ---------------------------
app.get("/", (req, res) => res.send("AI Fitness Coach Backend is running!"));

// ---------------------------
// AI FITNESS / WORKOUT / CHAT ENDPOINT
// ---------------------------
app.post("/api/fitness", async (req, res) => {
  const { prompt, gender, allergies = [], messages = [] } = req.body || {};
  if (!prompt || !prompt.trim()) return res.status(400).json({ error: "Prompt is required" });

  const userText = prompt.trim().toLowerCase();

  // Greeting handling
  const greetings = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "hii"];
  if (greetings.some(g => userText.includes(g))) {
    return res.json({
      reply: "Hello! I'm your AI Fitness Coach. What muscle, goal, or meal preference would you like to focus on today?"
    });
  }

  // Thank you handling
  if (userText.includes("thank you") || userText.includes("thanks")) {
    return res.json({ reply: "You're welcome! 😊" });
  }

  const allergyText = allergies.length ? `Avoid these ingredients: ${allergies.join(", ")}.` : "";
  const aiPrompt = `You are a friendly AI Fitness Coach.`;

  try {
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",
      messages: [
        ...messages, // previous chat history
        { role: "user", content: `${aiPrompt} User gender: ${gender || "unspecified"}. ${allergyText} Prompt: "${prompt}"` }
      ],
      temperature: 1,
      max_completion_tokens: 8192,
      top_p: 1,
      reasoning_effort: "medium"
    });

    const reply = completion.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
    return res.json({ reply });

  } catch (err) {
    console.error("GROQ API ERROR:", err.message || err);
    return res.json({ reply: "Fallback: Here's a basic safe workout or meal plan (without AI)." });
  }
});

// ---------------------------
// START SERVER
// ---------------------------
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
