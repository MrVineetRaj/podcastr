import { Dispatch, SetStateAction } from "react";

export interface GeneratePodcastProps {
  podcastTitle: string;
  setAudio: Dispatch<SetStateAction<string>>;
  audio: string;
  voicePrompt: string;
  setVoicePrompt: Dispatch<SetStateAction<string>>;
  setTranscription: Dispatch<SetStateAction<string>>;
}

export interface GenerateThumbnailProps {
  setImage: Dispatch<SetStateAction<string>>;
  image: string;
  podcastTitle: string;
}

export interface PodcastProps {
  userId: string;
  title: string;
  description: string;
  audioUrl: string;
  imageUrl: string;
}
