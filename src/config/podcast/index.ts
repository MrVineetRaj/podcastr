import { toast } from "@/components/ui/use-toast";
import { Dispatch, SetStateAction } from "react";

export const generateAudio = async ({
  voicePrompt,
  setEpisodes,
  clerkId,
  podcastTitle,
  setTranscription,
  setIsGenerating,
}: {
  voicePrompt: string;
  setEpisodes: Dispatch<SetStateAction<any>>;
  clerkId: string;
  podcastTitle: string;
  setTranscription: Dispatch<SetStateAction<string>>;
  setIsGenerating: Dispatch<SetStateAction<boolean>>;
}) => {
  const response = await fetch("/api/generate-podcast", {
    method: "POST",
    body: JSON.stringify({ prompt: voicePrompt }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    toast({
      title: "retry with some other prompt",
      variant: "warning",
    });
    return;
  }

  let episodes: {
    description: String;
    title: String;
    url: String;
    episodeNo: Number;
  }[] = [];

  response
    .json()
    .then((res) => {
      res.data.map(async (episode: any, index: number) => {
        let text = episode.description;
        const response = await fetch("/api/cloudinary/store/podcast", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ podcastTitle, text, index, clerkId }),
        });

        const data = await response.json();

        episodes.push({
          description: episode.description,
          title: episode.title,
          url: data.url,
          episodeNo: index,
        });
      });
      
    })
    .catch((e) => {
      toast({
        title: "retry with some other prompt",
        variant: "warning",
      });
      setIsGenerating(false);
      return;
    });

  setIsGenerating(false);
  setEpisodes(episodes);
};
