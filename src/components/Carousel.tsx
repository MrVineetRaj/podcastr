"use client";

import { episodesData } from "@/constants";
import { usePodcastStore } from "@/store/PodcasProvider";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const Carousel = () => {
  const { activePodcastId, setActiveEpisode } = usePodcastStore();

  const [activePodcast, setActivePodcast] = useState([]);

  const fetchPodcast = async () => {
    console.log("Active podcast id", activePodcastId);
    const response = await fetch("/api/podcast?r=" + activePodcastId);
    const data = await response.json();
    setActivePodcast(data?.data?.episodes);

    console.log("My data", data?.data?.episodes);
  };

  React.useEffect(() => {
    fetchPodcast();
  }, [activePodcastId]);
  return (
    <div>
      {activePodcast?.map(
        (
          episode: {
            episode: number;
            title: string;
            description: string;
            url: string;
          },
          index
        ) => (
          <div
            key={index}
            className="flex justify-between mt-2 items-center py-2 px-2 border border-black-5 cursor-pointer"
            onClick={() => setActiveEpisode(episode)}
          >
            <h1 className=" line-clamp-2">{episode?.title}</h1>
            <Image
              src="/icons/Play.svg"
              alt={episode?.title}
              width={30}
              height={30}
            />
          </div>
        )
      )}
    </div>
  );
};

export default Carousel;
