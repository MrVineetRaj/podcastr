"use server";

import { NextResponse } from "next/server";
import { connectDB } from "../mongoose/mongo-connect";
import { Podcast } from "../mongoose/schemas";

export const createNewPodcast = async (podcast: any) => {
  try {
    await connectDB();
    const newPodcast = new Podcast({
      author: podcast.author,
      title: podcast.title,
      description: podcast.description,
      audioUrl: podcast.audioUrl,
      imageUrl: podcast.imageUrl,
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
};
