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
  if (process.env.NEXT_PUBLIC_PODCASTR_UTILS_SECRET_KEY === undefined)
    throw new Error("Secret key is not defined");
  const secretKey: string = process.env.NEXT_PUBLIC_PODCASTR_UTILS_SECRET_KEY;

  const response = await fetch(
    "https://podcastr-utility-backend.onrender.com/generate-podcast/ai",
    {
      method: "POST",
      body: JSON.stringify({ prompt: voicePrompt }),
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": secretKey,
      },
    }
  );

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

  const tempRes = await response.json();

  console.log(tempRes.text);

  tempRes.text.map(async (episode: any, index: number) => {
    let text = episode.description;

    console.log(`working on episode ${index}`);

    const response = await fetch(
      "https://podcastr-utility-backend.onrender.com/cloudinary/store/podcast",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": secretKey,
        },
        body: JSON.stringify({
          text: text,
          fileName: `episode-${index}`,
          voiceId: "Aditi",
          outputFormat: "mp3",
          folder: `podcastr/${clerkId}/${podcastTitle}/episodes`,
        }),
      }
    );

    if (!response.ok) {
      toast({
        title: "Not able to store the data into episodes ",
        variant: "warning",
      });
      return;
    }

    const data = await response.json();

    console.log(`done episode ${index}`);
    episodes.push({
      description: episode.description,
      title: episode.title,
      url: data.secure_url,
      episodeNo: index,
    });
  });

  if (episodes.length < 0) {
    toast({
      title: "Not able to store the data into episodes ",
      variant: "warning",
    });
  }

  setIsGenerating(false);
  setEpisodes(episodes);
};
