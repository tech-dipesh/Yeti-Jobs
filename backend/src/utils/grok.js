import "dotenv/config"
import OpenAI from "openai"
const client = new OpenAI({
    apiKey: process.env.GROK_API,
    baseURL: "https://api.groq.com/openai/v1",
});

const gemini =async(text)=>{
  const result=await client.responses.create({
    model: "openai/gpt-oss-20b",
    input: `Must Not Use Any Ai Words
        Analyze this resume and return ONLY a valid JSON object with no markdown, no backticks, no explanation.
    Strictly follow this format:
    {
      "ats_score": <number between 0-100>,
      "feedback": [
        "<feedback point 1>",
        "<feedback point 2>",
        "<feedback point 3>"
      ]
    }
    Resume: ${text}`
  })
  return JSON.parse(result.output_text);
} 
export default gemini;