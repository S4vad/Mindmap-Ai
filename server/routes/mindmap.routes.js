
import express from "express";
const router = express.Router()

router.get("/api/mindmaps", (req, res) => {
  res.send("Get all mindmaps");
});

router.post("/api/ai", (req, res) => {
  res.send("Create a mindmap");
});

export default router;
