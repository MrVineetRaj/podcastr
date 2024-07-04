import AWS from "aws-sdk";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import streamifier from "streamifier";

// Configure AWS SDK and Cloudinary
const polly = new AWS.Polly({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to synthesize speech
const synthesizeSpeech = async (text: string) => {
  const params = {
    OutputFormat: "mp3",
    Text: text,
    VoiceId: "Aditi", // Choose your desired voice
  };

  try {
    const data = await polly.synthesizeSpeech(params).promise();
    return data.AudioStream;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Function to upload audio to Cloudinary
const uploadToCloudinary = async (
  audioStream: any,
  podcastTitle: string,
  index: number,
  clerkId: string
) => {
  try {
    const uploadResult: any = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `podcastr/${clerkId}/${podcastTitle}/episodes`,
          resource_type: "video",
          public_id: `episode-${index}`, // Unique public ID
          overwrite: true,
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      streamifier.createReadStream(audioStream).pipe(uploadStream);
    });

    return uploadResult.secure_url;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export async function POST(req: Request) {
  const data = await req.json();
  const { podcastTitle, index, clerkId, text } = data;

  if (typeof text !== "string") {
    return NextResponse.json({ message: "Text parameter is required" });
  }

  console.log("Received text:", text);
  const audioStream = await synthesizeSpeech(text);

  console.log("Generated Audio stream !");
  if (!audioStream) {
    return NextResponse.json({ message: "Error synthesizing speech" });
  }

  const cloudinaryUrl = await uploadToCloudinary(
    audioStream,
    podcastTitle,
    index,
    clerkId
  );
  console.log("Uploaded to cloudinary", cloudinaryUrl);
  if (!cloudinaryUrl) {
    return NextResponse.json({ message: "Error uploading to Cloudinary" });
  }

  return NextResponse.json({ url: cloudinaryUrl });
}
