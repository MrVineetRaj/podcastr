"use client";

import { cn } from "@/lib/utils";
import { usePodcastStore } from "@/store/PodcasProvider";
import React, { useEffect, useRef, useState } from "react";
import { Progress } from "./ui/progress";
import Image from "next/image";

import { formatTime } from "@/lib/formatTime";
import Link from "next/link";

const PodcastPlayer = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const { activeEpisode, activePodcastId, podcastImage } = usePodcastStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Cleanup previous audio instance if it exists
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );
      audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
    }

    if (
      typeof window !== "undefined" &&
      activeEpisode?.url &&
      activeEpisode?.url !== ""
    ) {
      // Create the new Audio object
      audioRef.current = new Audio(activeEpisode.url as string);

      const audio = audioRef.current;

      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("timeupdate", handleTimeUpdate);

      audioRef.current.play();
      setIsPlaying(true);
    }

    return () => {
      // Cleanup event listeners on unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [activeEpisode]);

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeekForward = () => {
    if (audioRef.current) {
      if (audioRef.current.currentTime + 5 > audioRef.current.duration) {
        audioRef.current.currentTime = audioRef.current.duration;
      } else {
        audioRef.current.currentTime += 5;
      }
    }
  };

  const handleSeekBackward = () => {
    if (audioRef.current) {
      if (audioRef.current.currentTime - 5 < 0) {
        audioRef.current.currentTime = 0;
      } else {
        audioRef.current.currentTime -= 5;
      }
    }
  };

  return (
    <div
      className={cn("sticky bottom-0 left-0 flex size-full flex-col", {
        hidden: !activeEpisode?.url || activeEpisode?.url === "",
      })}
    >
      <Progress value={(currentTime / duration) * 100} className="w-full" />
      <section className="glassmorphism-black flex h-[112px] w-full items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12">
        <div className="flex items-center gap-4 ">
          <Link href={`/podcast/${activePodcastId}`}>
            <Image
              src={podcastImage || "/images/player1.png"}
              width={64}
              height={64}
              alt="player1"
              className="aspect-square rounded-xl"
            />
          </Link>
          <div className="flex w-[160px] flex-col max-md:hidden">
            <h2 className="text-14 truncate font-semibold text-white-1">
              {activeEpisode?.title}
            </h2>
            <p className="text-12 font-normal text-white-2">
              {activeEpisode?.author}
            </p>
          </div>
        </div>
        <div className="flex-center cursor-pointer gap-3 md:gap-6">
          <div className="flex items-center gap-1.5">
            <Image
              src={"/icons/reverse.svg"}
              width={24}
              height={24}
              alt="rewind"
              onClick={handleSeekBackward}
            />
            <h2 className="text-12 font-bold text-white-4">-5</h2>
          </div>
          <Image
            src={isPlaying ? "/icons/Pause.svg" : "/icons/Play.svg"}
            width={30}
            height={30}
            alt="play"
            onClick={handlePlayPause}
          />
          <div className="flex items-center gap-1.5">
            <h2 className="text-12 font-bold text-white-4">+5</h2>
            <Image
              src={"/icons/forward.svg"}
              width={24}
              height={24}
              alt="forward"
              onClick={handleSeekForward}
            />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <h2 className="text-16 font-normal text-white-2 max-md:hidden flex flex-row gap-2">
            <span>{formatTime(currentTime)}</span> /
            <span>{formatTime(duration)}</span>
          </h2>
          <div className="flex w-full gap-2">
            <Image
              src={isMuted ? "/icons/unmute.svg" : "/icons/mute.svg"}
              width={24}
              height={24}
              alt="mute unmute"
              className="cursor-pointer"
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.muted = !isMuted;
                  setIsMuted(!isMuted);
                }
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default PodcastPlayer;
