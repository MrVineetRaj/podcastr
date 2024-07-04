import { NextApiRequest, NextApiResponse } from "next";
import fetch from "node-fetch";
import * as tts from "google-tts-api";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import stream from "stream";
import { promisify } from "util";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const streamUpload = (buffer: Buffer, folderPath: string, publicId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "video", // For audio files, use 'video'
        folder: folderPath,
        public_id: publicId,
        overwrite: true,
        type: "authenticated", // Set to authenticated for private access
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    const readable = new stream.PassThrough();
    readable.end(buffer);
    readable.pipe(uploadStream);
  });
};

export async function POST(req: Request) {
  const data = await req.json();
  const { text, clerkId, podcastTitle } = data;

  try {
    const textArray = JSON.parse(text);

    let episodes: {
      description: string;
      title: string;
      url: string;
      episodeNo: number;
    }[] = [];

    let index = 0;
    for (const item of textArray) {
      const { item: episode, description, title } = item;

      let episodeTitle = title.replaceAll(" ", "_");

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

      // Upload the buffer directly to Cloudinary
      const folderPath = `podcastr/${clerkId.trim()}/${podcastTitle.trim().replaceAll(" ", "_")}/episodes`.trim();
      const publicId = `Episode_${index}`;

      const result = await streamUpload(concatenatedBuffer, folderPath, publicId);

      episodes.push({
        url: result.secure_url,
        description,
        title,
        episodeNo: index,
      });
      index++;
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
