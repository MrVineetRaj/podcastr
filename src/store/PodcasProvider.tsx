"use client";

import { PodcastProviderProps } from "@/config/ts_types";

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const PodcastContext = createContext<PodcastProviderProps | undefined>(
  undefined
);

const PodcastProvider = ({ children }: { children: React.ReactNode }) => {
  const [activePodcastId, setActivePodcastId] = useState("");
  const [activeEpisode, setActiveEpisode] = useState({});
  const [podcastImage, setPodcastImage] = useState("");

  const pathName = usePathname();

  useEffect(() => {
    if (pathName === "/create-activePodcastId") {
      setActiveEpisode({});
    }
  }, [pathName]);

  return (
    <PodcastContext.Provider
      value={{
        activePodcastId,
        setActivePodcastId,
        activeEpisode,
        setActiveEpisode,
        podcastImage,
        setPodcastImage,
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
};

export const usePodcastStore = () => {
  const context = useContext(PodcastContext);
  if (context === undefined) {
    throw new Error("usePodcast must be used within a PodcastProvider");
  }
  return context;
};

export default PodcastProvider;
