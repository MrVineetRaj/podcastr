import PodcastCard from "@/components/cards/PodcastCard";
import { podcastData } from "@/constants";
import React from "react";
const Home = () => {
  return (
    <div className="mt-9 flex flex-col gap-9 ">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold text-white-1">Trending Podcast</h1>
        <div className="podcast_grid">
          {podcastData.map((podcast, index) => (
            <PodcastCard key={index} podcast={podcast} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
