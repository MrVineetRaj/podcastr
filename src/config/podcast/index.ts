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
  const response = await fetch(
    "https://podcastr-utility-backend.onrender.com/generate-podcast/ai",
    {
      method: "POST",
      body: JSON.stringify({ prompt: voicePrompt }),
      headers: {
        "Content-Type": "application/json",
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

  response
    .json()
    .then((res) => {
      res?.text.map(async (episode: any, index: number) => {
        let text = episode.description;
        const response = await fetch(
          "https://podcastr-utility-backend.onrender.com/cloudinary/store/podcast",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
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

        const data = await response.json();
        
        console.log(`episode ${index}`);
        episodes.push({
          description: episode.description,
          title: episode.title,
          url: data.secure_url,
          episodeNo: index,
        });
      });

      if(episodes.length < 0){
        toast({
        title: "Not able to store the data into episodes ",
        variant: "warning",
      });
      }
    })
    .catch((e) => {
      console.log("error in generating podcast", e);
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
