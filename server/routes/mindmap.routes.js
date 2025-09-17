import express from "express";
import rateLimit from "express-rate-limit";
import { aiService } from "../services/aiServices.js";

const router = express.Router();

// AI-specific rate limit
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  message: { error: "Rate limit exceeded. Try again in 1 minute." }
});

// Input validation
const validateMindmapInput = (req, res, next) => {
  const { text, title } = req.body;
  if (!text || typeof text !== "string" || text.trim().length < 10) {
    return res.status(400).json({ success: false, error: "Invalid text input" });
  }
  req.validatedData = {
    text: text.trim(),
    title: (title && title.trim()) || "Untitled Mindmap"
  };
  next();
};

// Generate Mindmap
router.post("/generate-mindmap", aiLimiter, validateMindmapInput, async (req, res) => {
  const { text, title } = req.validatedData;
  try {
    const result = await aiService.processMindmap(text, title);
    res.json({ success: true, mindmap: result });
  } catch (err) {
    console.error("❌ Error:", err.message);
    res.status(500).json({ success: false, error: "Failed to generate mindmap" });
  }
});

// AI Status
router.get("/status", (req, res) => {
  res.json({ success: true, status: aiService.initialized ? "ready" : "initializing" });
});

// Text Preprocessing
router.post("/preprocess-text", (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ success: false, error: "Text required" });
  const cleaned = text.replace(/\s+/g, " ").trim();
  res.json({ success: true, cleanedText: cleaned });
});

export default router;
