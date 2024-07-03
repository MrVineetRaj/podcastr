import { Dispatch, SetStateAction } from "react";

export const generateAudio = async ({
  voicePrompt,
  voiceType,
  setAudio,
  clerkId
}: {
  voicePrompt: string;
  voiceType: string;
  setAudio: Dispatch<SetStateAction<string>>;
  clerkId: string;
}) => {
  const response = await fetch("/api/generate-podcast", {
    method: "POST",
    body: JSON.stringify({ prompt: voicePrompt }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();
  if (typeof responsiveVoice !== "undefined") {
    const res = await fetch("api/cloudinary/store/podcast", {
      method: "POST",
      body: JSON.stringify({
        text: result.data,
        clerkId: clerkId,
        podcastTitle: "test",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resData = await res.json();

    console.log("resData", resData.message);
    setAudio(resData.url);
    // responsiveVoice.speak(result.data, voiceType); //* it's speaking data that i want to hear from the api
  } else {
    console.error("responsiveVoice is not defined");
  }
};