import express from "express";
import { askResumeQuestionController } from "../controllers/resume-ai.controller.js";

const router = express.Router();

router.post("/ask", askResumeQuestionController);

export default router;