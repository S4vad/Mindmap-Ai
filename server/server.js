import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import mindmapRoutes from "./routes/mindmap.routes.js"
import { initializeAI } from "./services/aiServices.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Rate limiter (general)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: "Too many requests. Try again later." },
  })
);

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    const statusEmoji = res.statusCode >= 400 ? "❌" : "✅";
    console.log(
      `${statusEmoji} ${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`
    );
  });
  next();
});


app.get("/health", (req, res) =>
  res.json({ status: "OK", timestamp: new Date().toISOString() })
);
app.use("/", mindmapRoutes);


//  Error Handling 
app.use((err, req, res, next) => {
  console.error("💥 Server Error:", err);
  res.status(500).json({ success: false, error: "Internal server error" });
});


const startServer = async () => {
  try {
    console.log("🚀 Starting MindMap AI Server...");
    await initializeAI();
    console.log("✅ AI service ready");

    app.listen(PORT, () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
