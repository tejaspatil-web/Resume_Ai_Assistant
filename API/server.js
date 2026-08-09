import express from "express";
import cors from 'cors'
import documentRoutes from "./src/routes/document.routes.js";
import resumeAiRoutes from "./src/routes/resume-ai.routes.js";

const app = express();

app.use(express.json({ limit: "10mb" }));
app.use(express.text({ type: "text/plain", limit: "10mb" }));

app.use(cors({
    origin: "http://localhost:4200"
}))

app.use("/api/documents", documentRoutes);

app.use("/api/resume-ai", resumeAiRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

