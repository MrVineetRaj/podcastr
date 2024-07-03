import { Dispatch, SetStateAction } from "react";

export interface GeneratePodcastProps {
  voiceType: string;
  setAudio: Dispatch<SetStateAction<string>>;
  audio: string;
  voicePrompt: string;
  setVoicePrompt: Dispatch<SetStateAction<string>>;
  setAudioDuration: Dispatch<SetStateAction<number>>;
}

export interface GenerateThumbnailProps {
  setImage: Dispatch<SetStateAction<string>>;
  image: string;
}

export interface PodcastProps {
  userId: string;
  title: string;
  description: string;
  audioUrl: string;
  imageUrl: string;
}
