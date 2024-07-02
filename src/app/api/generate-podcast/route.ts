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

  try {
    const result = await chatSession.sendMessage(prompt);
    let finalResult = result.response.text();

    // finalResult = finalResult.replace(/<|>/g, "");
    finalResult = finalResult.replaceAll("*", "");
    console.log(finalResult);

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
