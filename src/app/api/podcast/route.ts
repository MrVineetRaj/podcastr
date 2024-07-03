import { createNewPodcast } from "@/config/actions/podcast_action";
import { connectDB } from "@/config/mongoose/mongo-connect";
import { Podcast } from "@/config/mongoose/schemas";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  let { author, title, description, audioUrl, imageUrl, transcription } = data;
  try {
    await connectDB();
    const newPodcast = new Podcast({
      author,
      title,
      description,
      audioUrl,
      imageUrl,
      transcription,
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const r = searchParams.get("r") || "";
  try {
    await connectDB();

    if (r !== "") {
      const podcast = await Podcast.findById(r);
      return NextResponse.json({
        success: true,
        message: "Podcast fetched",
        data: podcast,
      });
    }
    const podcasts = await Podcast.find();
    return NextResponse.json({
      success: true,
      message: "Podcasts fetched",
      data: podcasts,
    });
  } catch (e) {
    console.error("Error fetching podcasts:", e);
    return NextResponse.json({
      success: false,
      message: "Error fetching podcasts from server",
      data: e,
    });
  }
}
