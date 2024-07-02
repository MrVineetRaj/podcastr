"use client";

import { GeneratePodcastProps } from "@/config/ts_types";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { generateAudio } from "@/config/podcast";

const useGeneratePodcast = (props: GeneratePodcastProps) => {
  const {
    audio,
    voiceType,
    setAudio,
    voicePrompt,
    setVoicePrompt,
    setAudioDuration,
  } = props;
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio("");

    if (!voicePrompt) {
      // todo : generate toast
      setIsGenerating(false);
      return;
    }

    try {
      await generateAudio({ voicePrompt, voiceType, setAudio });
      setIsGenerating(false);
    } catch (e) {
      //   console.log("error in generating podcast", e);
    }
  };

  return {
    isGenerating: isGenerating,
    generatePodcast: generatePodcast,
  };
};

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { audio, setAudio, voicePrompt, setVoicePrompt, setAudioDuration } =
    props;
  const { isGenerating, generatePodcast } = useGeneratePodcast(props);
  return (
    <div>
      <div className="flex flex-col gap-2 5">
        <Label className="text-16 font-bold text-white-1">
          AI prompt to generate podcast
        </Label>
        <Textarea
          className="input-class font-light focus-visible:ring-offset-orange-1"
          placeholder="Write a prompt for the AI to generate a podcast"
          rows={5}
          onChange={(e) => setVoicePrompt(e.target.value)}
        />
      </div>
      <div className="mt-5 w-full max-w-[200px]">
        <Button
          type="submit"
          className="text-16 bg-orange-1 py-4 font-bold text-white-1"
          onClick={generatePodcast}
        >
          {isGenerating ? (
            <>
              Generating
              <Loader size={20} className="animate-spin ml-2" />
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>

      {audio && (
        <div className="mt-5">
          <audio
            controls
            src={audio}
            autoPlay
            className="mt-5 w-full"
            onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
          />
        </div>
      )}
    </div>
  );
};

export default GeneratePodcast;
