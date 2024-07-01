import mongoose from "mongoose";
//h here we are creating a schema for the podcast
const PodcastSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  podcastTitle: {
    type: String,
    required: true,
  },
  podcastDescription: {
    type: String,
    required: true,
  },
  audioUrl: {
    type: String,
  },
  audioStorageId: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
  imageStorageId: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
  authorId: {
    type: String,
    required: true,
  },
  authorImageUrl: {
    type: String,
    required: true,
  },
  voicePrompt: {
    type: String,
    required: true,
  },
  imagePrompt: {
    type: String,
    required: true,
  },
  voiceType: {
    type: String,
    required: true,
  },
  audioDuration: {
    type: Number,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
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

let Podcast;
try {
  Podcast = mongoose.model("Podcast");
} catch (error) {
  Podcast = mongoose.model("Podcast", PodcastSchema);
}
let User:any;
try {
  User = mongoose.model("User");
} catch (error) {
  User = mongoose.model("User", UserSchema);
}

export { Podcast, User };
