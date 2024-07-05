"use client";

import { episodesData } from "@/constants";
import { usePodcastStore } from "@/store/PodcasProvider";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const Carousel = () => {
  const { activePodcastId, setActiveEpisode, activeEpisode } =
    usePodcastStore();

  const [activePodcast, setActivePodcast] = useState([]);

  const fetchPodcast = async () => {
    const response = await fetch("/api/podcast?r=" + activePodcastId);
    const data = await response.json();
    setActivePodcast(data?.data?.episodes);
  };

  React.useEffect(() => {
    fetchPodcast();
  }, [activePodcastId]);
  return (
    <span
      className=" h-full overflow-y-scroll mt-8"
      style={{ scrollbarWidth: "thin" }}
    >
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
          <span
            key={index}
            className="flex justify-between mt-2 items-center py-2 px-2 border border-black-5 cursor-pointer"
            style={{
              borderColor:
                activeEpisode?.title === episode?.title ? "orange" : "",
            }}
            onClick={() => setActiveEpisode(episode)}
          >
            <span className=" line-clamp-2">{episode?.title}</span>
            <Image
              src="/icons/Play.svg"
              alt={episode?.title}
              width={30}
              height={30}
            />
          </span>
        )
      )}
    </span>
  );
};

export default Carousel;
