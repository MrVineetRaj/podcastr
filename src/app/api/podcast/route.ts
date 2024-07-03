import { createNewPodcast } from "@/config/actions/podcast_action";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  let { podcast } = data;
  await createNewPodcast(podcast);
}


