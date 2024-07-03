import { createNewPodcast } from "@/config/actions/podcast_action";
import { connectDB } from "@/config/mongoose/mongo-connect";
import { Podcast } from "@/config/mongoose/schemas";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  let { author, title, description, audioUrl, imageUrl } = data;
  try {
    await connectDB();
    const newPodcast = new Podcast({
      author,
      title,
      description,
      audioUrl,
      imageUrl,
    });

    await newPodcast.save();

    return NextResponse.json({
      success: true,
      message: "Podcast created",
      data: newPodcast,
    });
  } catch (e) {
    console.error("Error creating podcast:", e);
    return NextResponse.json({
      success: false,
      message: "Error creating podcast from server",
      data: e,
    });
  }
}
