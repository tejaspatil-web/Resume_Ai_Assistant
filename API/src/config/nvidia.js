import OpenAI from 'openai';
import dotenv from "dotenv";

dotenv.config({ quiet:true });

const nvidia = new OpenAI({
  apiKey: process.env.NVIDIA_KEY,
  baseURL: 'https://integrate.api.nvidia.com/v1',
})

export default nvidia;