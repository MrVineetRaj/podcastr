"use client";

import { GeneratePodcastProps } from "@/config/ts_types";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { generateAudio } from "@/config/podcast";
import { useToast } from "@/components/ui/use-toast";
import { useUser } from "@clerk/nextjs";

const useGeneratePodcast = (props: GeneratePodcastProps) => {
  const { audio, setAudio, voicePrompt, setVoicePrompt, podcastTitle } = props;
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const { user, isSignedIn } = useUser();

  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio("");
    if (!isSignedIn || !user) {
      toast({
        title: "User is not signed in",
        variant: "success",
      });
      setIsGenerating(false);
      return;
    }

    if (!voicePrompt) {
      toast({
        title: "Please enter a prompt to generate a podcast",
        variant: "warning",
      });
      setIsGenerating(false);
      return;
    }

    try {
      let clerkId = user.id;
      await generateAudio({ podcastTitle, voicePrompt, setAudio, clerkId });
      setIsGenerating(false);
      toast({
        title: "Podcast generated successfully",
        variant: "success",
      });
    } catch (e) {
      console.log("error in generating podcast", e);
    }
  };

  return {
    isGenerating: isGenerating,
    generatePodcast: generatePodcast,
  };
};

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { audio, setAudio, voicePrompt, setVoicePrompt } = props;
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
          <audio controls src={audio} autoPlay className="mt-5 w-full" />
        </div>
      )}
    </div>
  );
};

export default GeneratePodcast;
