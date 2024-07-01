"use server";
import { NextResponse } from "next/server";

import crypto from "crypto";
import { User } from "@/config/schemas";
import { connectDB } from "@/config/mongo-connect";

export async function POST(req: Request) {
  const data = await req.json();
  const signature = req.headers.get("x-clerk-signature");
  const secret = process.env.CLERK_WEBHOOK_SECRET; // Get from env variable

  if (!secret) {
    return NextResponse.json({
      success: false,
      message: "Missing secret key",
    });
  }

  const calculatedSignature = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(data))
    .digest("hex");

  if (calculatedSignature != signature) {
    return NextResponse.json({
      "X-clerk-signature": signature,
      secret: secret,
      success: false,
      message: "Invalid signature",
    });
  }

  try {
    await connectDB();
    const user = new User({
      email: data.email,
      imageUrl: data.imageUrl,
      clerkId: data.userId,
      name: data.firstName + " " + data.lastName, // Combine names if needed
    });

    await user.save();

    return NextResponse.json({
      success: true,
      message: "User created",
      data: user,
    });
  } catch (error) {
    console.error("Error saving user to MongoDB:", error);
    return NextResponse.json({
      success: false,
      message: "Error saving user",
      data: error,
    });
  }
}
