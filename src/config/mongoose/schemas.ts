import mongoose from "mongoose";
import { PodcastProps } from "../ts_types";
//h here we are creating a schema for the podcast

const PodcastSchema = new mongoose.Schema({
  author: {
    type: String,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  audioUrl: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

//h here we are creating a schema for the user
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
  },
  clerkId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

let Podcast: any;
try {
  Podcast = mongoose.model("Podcast");
} catch (error) {
  Podcast = mongoose.model("Podcast", PodcastSchema);
}
let User: any;
try {
  User = mongoose.model("User");
} catch (error) {
  User = mongoose.model("User", UserSchema);
}

export { Podcast, User };
