"use server";
import { User } from "@/config/mongoose/schemas";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const data = await req.json();
  try {
    const user = new User({
      email: data.email,
      imageUrl: data.imageUrl,
      clerkId: data.clerkId,
      name: data.name,
    });

    await user.save();
    return NextResponse.json({
      success: true,
      message: "User created",
      data: user,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({
      success: false,
      message: "Error creating user from server",
      data: error,
    });
  }
}
