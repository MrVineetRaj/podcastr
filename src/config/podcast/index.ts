import { toast } from "@/components/ui/use-toast";
import { Dispatch, SetStateAction } from "react";

export const generateAudio = async ({
  voicePrompt,
  setEpisodes,
  clerkId,
  podcastTitle,
  setTranscription,
}: {
  voicePrompt: string;
  setEpisodes: Dispatch<SetStateAction<any>>;
  clerkId: string;
  podcastTitle: string;
  setTranscription: Dispatch<SetStateAction<string>>;
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

  const result = await response.json();
  console.log("transcription", result.data);
  setTranscription(result.data);
  if (typeof responsiveVoice !== "undefined") {
    const res = await fetch("api/cloudinary/store/podcast", {
      method: "POST",
      body: JSON.stringify({
        text: JSON.stringify(result.data),
        clerkId: clerkId,
        podcastTitle: podcastTitle,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await res.json();

    console.log("resData", resData.episodes);
    setEpisodes(resData.episodes);
    // responsiveVoice.speak(result.data, voiceType); //* it's speaking data that i want to hear from the api
  } else {
    console.error("responsiveVoice is not defined");
  }
};
