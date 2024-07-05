"use client";
import { Button } from "@/components/ui/button";
import {
  getAllPodcasts,
  updatePodcastViews,
} from "@/config/mongoose/mongo_func";
import { usePodcastStore } from "@/store/PodcasProvider";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PodcastDetails = () => {
  const searchParams = useSearchParams();
  const podcastId = searchParams.get("r") || "";

  const {
    setActivePodcastId,
    setActiveEpisode,
    setPodcastImage,
    activeEpisode,
    activePodcastId,
  } = usePodcastStore();

  const [podcast, setPodcast] = useState({
    title: "",
    imageUrl: "",
    description: "",
    views: 0,
    episodes: [
      {
        title: "",
        description: "",
      },
    ],
  });
  useEffect(() => {
    if (!podcastId) return;

    getAllPodcasts({ page: "", podcastId: podcastId }).then((res) => {
      setPodcast(res);
    });
  }, [podcastId]);

  if (!podcast) return <div>Loading...</div>;

  return (
    <section className="flex w-full flex-col">
      <header className="mt-9 flex flex-col sm:flex-row gap-5 sm:items-center justify-center sm:justify-between">
        <h1 className="text-20 font-bold text-white-1">{podcast?.title}</h1>
        <figure className="flex gap-3">
          <Image
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt="headphone"
          />
          <h2 className="text-16 font-bold text-white-1">{podcast.views}</h2>
        </figure>
      </header>
      <div className="flex flex-col 553:flex-start gap-10 items-start justify-start my-5">
        {podcast?.imageUrl && (
          <Image
            src={podcast?.imageUrl}
            width={200}
            height={200}
            alt="podcast"
            className="rounded-lg"
          />
        )}
        <div className=" ">
          <p className="text-white-2 text-16 pb-8 font-medium max-md:text-center ">
            {podcast?.episodes[0]?.title}
          </p>
          <Button
            className="bg-orange-1 font-bold text-white-1"
            onClick={() => {
              updatePodcastViews(podcastId).then((res) => {
                setPodcast({
                  ...podcast,
                  views: podcast.views + 1,
                });
              });
              setActivePodcastId(podcastId);
              setActiveEpisode(podcast?.episodes[0]);
              setPodcastImage(podcast?.imageUrl);
            }}
          >
            Play
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-8 ">
        <div className="flex flex-col gap-4">
          <h1 className="text-18 font-bold text-white-1">Description</h1>
          <p className="text-16 font-medium text-white-2">
            {/* {podcast?.data?.transcription} */}
            {podcast && podcast.description}
            {/* {activeEpisode?.description ||
              podcast?.data?.episodes[0]?.description} */}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-18 font-bold text-white-1">Transcription</h1>
          <p className="text-16 font-medium text-white-2">
            {activePodcastId === podcastId
              ? activeEpisode?.description
              : podcast.episodes[0]?.description}
            {}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PodcastDetails;
