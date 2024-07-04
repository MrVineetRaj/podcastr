import { NextResponse } from "next/server";

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

const chatSession = model.startChat({
  generationConfig,
  history: [],
});

export async function POST(req: Request) {
  const data = await req.json();
  const { prompt } = data;

  const finalPrompt =
    prompt +
    "generate a podcast of it in possible no of episodes with and provide me a json data that contains array of objects with episode number, title , and description (detailed Description with minimum 500 words and maximum 1000 words) starting with into episode 0 . just json data nothing else and use Unicode code and don't include Control Characters please do this for me ";
  try {
    const result = await chatSession.sendMessage(finalPrompt);
    let finalResult = result.response.text();

    finalResult = finalResult.replaceAll("*", "");
    finalResult = finalResult.replaceAll("#", "");
    finalResult = finalResult.replaceAll("```json", "");
    finalResult = finalResult.replaceAll("```", "");
    finalResult = finalResult.replaceAll("\n", "");

    console.log("MY FINAL RESULT", finalResult);
    
    finalResult = JSON.parse(finalResult);
    return NextResponse.json({
      status: 200,
      data: finalResult,
    });
  } catch (error) {
    console.log("MY SERVER ERROR", error);
    return NextResponse.json({
      status: 500,
      data: error,
    });
  }
}
