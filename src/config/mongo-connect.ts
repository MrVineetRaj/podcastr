"use strict";
import mongoose from "mongoose";

export const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/podcastr");
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
};
