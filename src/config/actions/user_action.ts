"use server";
import { User } from "@/config/mongoose/schemas";
import { NextResponse } from "next/server";
import { connectDB } from "../mongoose/mongo-connect";

export async function createUser(user: any) {
  try {
    await connectDB();
    const newUser = new User({
      email: user.email,
      imageUrl: user.imageUrl,
      clerkId: user.clerkId,
      name: user.name,
    });

    await newUser.save();

    return NextResponse.json({
      success: true,
      message: "User created",
      data: newUser,
    });
  } catch (e) {
    console.error("Error creating user:", e);
    return NextResponse.json({
      success: false,
      message: "Error creating user from server",
      data: e,
    });
  }
}
