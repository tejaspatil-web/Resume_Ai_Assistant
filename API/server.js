import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import healthRoutes from './src/routes/health.routes.js';
import documentRoutes from "./src/routes/document.routes.js";
import resumeAiRoutes from "./src/routes/resume-ai.routes.js";

const app = express();

dotenv.config({ quiet:true });

app.use(express.json({ limit: "10mb" }));
app.use(express.text({ type: "text/plain", limit: "10mb" }));

app.use(cors({
  origin: process.env.APPLICATION_URL,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api/health', healthRoutes);

app.use("/api/documents", documentRoutes);

app.use("/api/resume-ai", resumeAiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

