"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import GeneratePodcast from "@/components/podcastFormField/GeneratePodcast";

import GenerateThumbnail from "@/components/podcastFormField/GenerateThumbnail";

import { Loader, User } from "lucide-react";
// import { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/components/ui/use-toast";
// import { useMutation } from "convex/react";
// import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

const voiceCategories = ["alloy", "shimmer", "nova", "echo", "fable", "onyx"];

const CreatePodcast = () => {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  const [image, setImage] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [voicePrompt, setVoicePrompt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [podcastTitle, setPodcastTitle] = useState("");
  const [podcastDescription, setPodcastDescription] = useState("");
  const [transcription, setTranscription] = useState("");

  const handleCreateNewPodcast = async () => {
    setIsSubmitting(true);
    const sortedEpisodes = episodes
      .slice()
      .sort((a: any, b: any) => a.episodeNo - b.episodeNo);

    console.log(sortedEpisodes);
    if (!isSignedIn) {
      toast({
        title: "Please sign in to proceed",
        variant: "warning",
      });
      setIsSubmitting(false);
      return;
    }

    const clerkId = user.id;
    if (!podcastTitle || !podcastDescription || !episodes || !image) {
      toast({
        title: "Please fill all the fields to proceed",
        variant: "warning",
      });
      setIsSubmitting(false);
      return;
    }

    const res = await fetch("/api/podcast", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: clerkId,
        title: podcastTitle,
        description: podcastDescription,
        episodes: sortedEpisodes,
        imageUrl: image,
      }),
    });

    if (!res.ok) {
      toast({
        title: "Error creating podcast",
        variant: "error",
      });
      setIsSubmitting(false);
      return;
    }

    const data = await res.json();
    setIsSubmitting(false);
    toast({
      title: "Podcast created successfully",
      variant: "success",
    });
  };

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-20 font-bold text-white-1">Create Podcast</h1>
      <p className="text-orange-1 border p-2 mt-4 border-orange-1 text-[12px] font-semibold rounded-md">
        This section is using API from that is deployed on some other platform
        so may take time to create new podcast **
      </p>

      <div className="flex flex-col gap-[30px] border-b border-black-5 pb-10">
        <div className="relative mt-6">
          <Input
            className="input-class focus-visible:ring-offset-orange-1 peer"
            name="podcastTitle"
            required
            onChange={(e) => setPodcastTitle(e.target.value)}
          />
          <Label
            className="absolute top-3 left-4 text-16 font-bold text-white-1 peer-focus:text-orange-1 peer-focus:text-sm peer-focus:-top-5 peer-focus:left-2 transition-all peer-valid:text-orange-1 peer-valid:text-sm peer-valid:-top-5 peer-valid:left-2"
            htmlFor="podcastTitle"
          >
            Podcast Title
          </Label>
        </div>

        <div className="relative mt-6">
          <Textarea
            className="input-class focus-visible:ring-offset-orange-1 peer"
            name="podcastDescription"
            required
            onChange={(e) => setPodcastDescription(e.target.value)}
          />
          <Label
            className="absolute top-3 left-4 text-16 font-bold text-white-1 peer-focus:text-orange-1 peer-focus:text-sm peer-focus:-top-6 peer-focus:left-2 transition-all peer-valid:text-orange-1 peer-valid:text-sm peer-valid:-top-5 peer-valid:left-2"
            htmlFor="podcastDescription"
          >
            Podcast Description
          </Label>
        </div>
      </div>
      <div className="flex flex-col pt-10">
        <GeneratePodcast
          podcastTitle={podcastTitle}
          setEpisodes={setEpisodes}
          voicePrompt={voicePrompt}
          setVoicePrompt={setVoicePrompt}
          setTranscription={setTranscription}
        />

        <GenerateThumbnail
          setImage={setImage}
          image={image}
          podcastTitle={podcastTitle}
        />

        <div className="mt-10 w-full">
          <Button
            type="submit"
            className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1"
            onClick={handleCreateNewPodcast}
          >
            {isSubmitting ? (
              <>
                Submitting
                <Loader size={20} className="animate-spin ml-2" />
              </>
            ) : (
              "Submit & Publish Podcast"
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CreatePodcast;
