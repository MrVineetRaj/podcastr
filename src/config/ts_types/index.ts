import { Dispatch, SetStateAction } from "react";

export interface GeneratePodcastProps {
  podcastTitle: string;
  setEpisodes: Dispatch<SetStateAction<any>>;
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
  author: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface PodcastProviderProps {
  activeEpisode: any;
  setActiveEpisode: Dispatch<SetStateAction<any>>;

  activePodcastId: string;
  setActivePodcastId: Dispatch<SetStateAction<string>>;

  podcastImage: string;
  setPodcastImage: Dispatch<SetStateAction<string>>;
}
