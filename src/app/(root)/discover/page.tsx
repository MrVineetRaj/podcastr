"use client";

import PodcastCard from "@/components/cards/PodcastCard";
import { getAllPodcasts } from "@/config/mongoose/mongo_func";
import { podcastData } from "@/constants";
import React, { useEffect, useState } from "react";

const Discover = () => {
  const [podcasts, setPodcasts] = useState([]);
  useEffect(() => {
    if (podcasts?.length > 0) return;
    getAllPodcasts({ page: "discover", podcastId: "" }).then((data) => {
      setPodcasts(data);
    });
  }, [podcasts]);

  return (
    <div className="mt-9 flex flex-col gap-9 ">
      <section className="flex flex-col gap-5">
        <div className="podcast_grid">
          {podcasts?.length === 0 && (
            <span className="text-white-1 font-bold text-16 text-center">
              No podcasts to discover
            </span>
          )}
          {podcasts?.map((podcast, index) => (
            <PodcastCard key={index} podcast={podcast} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Discover;
