"use client";

import PodcastCard from "@/components/cards/PodcastCard";
import { getAllPodcasts } from "@/config/mongoose/mongo_func";
import { podcastData } from "@/constants";
import React, { useEffect, useState } from "react";
const Home = () => {
  const [podcasts, setPodcasts] = useState([]);
  useEffect(() => {
    if (podcasts?.length > 0) return;
    getAllPodcasts({ page: "trending", podcastId: "" }).then((data) => {
      setPodcasts(data);
    });
  }, [podcasts]);
  return (
    <div className="mt-9 flex flex-col gap-9 ">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcast</h1>
        <div className="podcast_grid">
          {podcasts?.length === 0 && (
            <span className="text-white-1 font-bold text-16 text-center">
              No podcasts
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

export default Home;
