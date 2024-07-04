// app/api/cloudinary/store/image/route.ts
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { Readable } from "stream";
import { UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file") as File;
  const user = data.get("clerkId");
  const title = data.get("title");

  if (!file) {
    return NextResponse.json(
      {
        message: "No file uploaded",
      },
      { status: 400 }
    );
  }

  // Convert file to a readable stream
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload file to Cloudinary
  try {
    const uploadResult: UploadApiResponse = await new Promise(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: `podcastr/${user}/${title}/thumbnail`,
            public_id: "thumbnail.png",
            // format: "png", // Ensure the format is png
            overwrite: true,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result as UploadApiResponse);
            }
          }
        );

        const readableStream = new Readable();
        readableStream._read = () => {}; // _read is required but you can noop it
        readableStream.push(buffer);
        readableStream.push(null);

        readableStream.pipe(uploadStream);
      }
    );

    return NextResponse.json({
      message: "Image uploaded successfully",
      imageUrl: uploadResult.secure_url,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Image upload failed",
        error: error,
      },
      { status: 500 }
    );
  }
}
