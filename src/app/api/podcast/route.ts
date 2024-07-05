import { connectDB } from "@/config/mongoose/mongo-connect";
import { Podcast } from "@/config/mongoose/schemas";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  let { author, title, description, episodes, imageUrl, transcription } = data;
  try {
    await connectDB();
    const currentDate = new Date();
    const newPodcast = new Podcast({
      author,
      title,
      description,
      episodes,
      imageUrl,
      transcription,
      createdDate: currentDate.toString(),
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
  const p = searchParams.get("p") || "";
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

    if (p === "trending") {
      const podcasts = await Podcast.find().sort({ views: -1 }).limit(5);
      return NextResponse.json({
        success: true,
        message: "Podcasts fetched",
        data: podcasts,
      });
    }

    if (p === "discover") {
      const podcasts = await Podcast.find().sort({ createdAt: 1 });
      return NextResponse.json({
        success: true,
        message: "Podcasts fetched",
        data: podcasts,
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

export async function PATCH(req: Request) {
  const data = await req.json();
  const { podcastId } = data;
  try {
    await connectDB();

    const podcast = await Podcast.findByIdAndUpdate(podcastId, {
      $inc: { views: 1 },
    });

    return NextResponse.json({
      success: true,
      message: "Podcast views updated",
      data: podcast,
    });
  } catch (e) {
    console.error("Error updating podcast views:", e);
    return NextResponse.json({
      success: false,
      message: "Error updating podcast views from server",
      data: e,
    });
  }
}
