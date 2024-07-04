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

  try {
    const textArray = JSON.parse(text);

    let episodes: {
      description: string;
      title: string;
      url: string;
    }[] = [];

    let index = 0;
    for (const item of textArray) {
      const { item: episode, description, title } = item;

      let episodeTitle = title.replaceAll(" ", "_");
      const filePath = path.join(
        process.cwd(),
        "public",
        "audio",
        episodeTitle + ".mp3"
      );

      const urls = tts.getAllAudioUrls(description, {
        lang: "hi",
        slow: false,
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
        folder:
          `podcastr/${clerkId.trim()}/${episodeTitle.trim()}/episodes`.trim(),
        public_id: `Episode_${index}`,
        overwrite: true,
        type: "authenticated", // Set to authenticated for private access
      });

      fs.unlinkSync(filePath);

      index++;
      console.log("result", result.secure_url);

      episodes.push({
        url: result.secure_url,
        description,
        title,
      });
    }

    return NextResponse.json({
      message: "Audio file generated successfully",
      transcription: text,
      episodes: episodes,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Failed to generate audio file",
      error: "Error uploading file: " + error,
    });
  }
}
