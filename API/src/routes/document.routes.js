import express from "express";
import { createDocumentController } from "../controllers/document.controller.js";

const documentRoutes = express.Router();

documentRoutes.post("/", createDocumentController);

export default documentRoutes;