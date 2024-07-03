import { episodesData } from "@/constants";
import Image from "next/image";
import React from "react";

const Carousel = () => {
  return (
    <div>
      {episodesData.map((episode) => (
        <div key={episode.episode} className="flex justify-between mt-2 items-center py-2 px-2 border border-black-5 cursor-pointer">
          <h1>Episode {episode.episode}</h1>
          <Image
            src="/icons/Play.svg"
            alt={episode.title}
            width={30}
            height={30}
          />
        </div>
      ))}
    </div>
  );
};

export default Carousel;
