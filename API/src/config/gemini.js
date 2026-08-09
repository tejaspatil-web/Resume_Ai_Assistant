import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config({ quiet:true });

const gemini = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export default gemini;