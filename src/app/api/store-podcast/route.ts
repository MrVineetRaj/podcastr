// pages/api/speak.ts

import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import * as tts from "google-tts-api";
import { NextResponse } from "next/server";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const data = await req.json();
  const { text, clerkId, podcastTitle } = data;

  const filePath = path.join(
    process.cwd(),
    "public",
    "audio",
    podcastTitle + ".mp3"
  );

  try {
    const urls = tts.getAllAudioUrls(text, {
      lang: "hi", // Hindi language
      slow: false, // Normal speed
      host: "https://translate.google.com",
    });

    const buffers = await Promise.all(
      urls.map(async (url) => {
        const response = await fetch(url.url);
        const arrayBuffer = await response.arrayBuffer();
        return Buffer.from(arrayBuffer);
      })
    );

    const concatenatedBuffer = Buffer.concat(buffers);

    fs.writeFileSync(filePath, concatenatedBuffer);

    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "video", // For audio files, use 'video'
      public_id: `podcastr/audio/${clerkId}/${podcastTitle}`, // Dynamic folder path
      overwrite: true,
      type: "authenticated", // Set to authenticated for private access
    });

    fs.unlinkSync(filePath);

    return NextResponse.json({
      message: "Audio file generated successfully",
      url: result.secure_url,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Failed to generate audio file",
      error: "Error uploading file " + error,
    });
  }
}
