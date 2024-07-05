"use client";
import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { SignedIn, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import Carousel from "../Carousel";
import Header from "../Header";
import { usePodcastStore } from "@/store/PodcasProvider";
import { AlignLeft, AlignRight } from "lucide-react";

const MobileNav = () => {
  const { user, isSignedIn } = useUser();

  const { activePodcastId, setActiveEpisode, activeEpisode } =
    usePodcastStore();

  const [activePodcast, setActivePodcast] = useState([]);

  const fetchPodcast = async () => {
    const response = await fetch("/api/podcast?r=" + activePodcastId);
    const data = await response.json();
    setActivePodcast(data?.data?.episodes);
  };

  useEffect(() => {
    fetchPodcast();
  }, [activePodcastId]);

  return (
    <span>
      <Sheet>
        <SheetTrigger>
          <AlignRight className="absolute top-10 right-5 border text-white-1 " />
        </SheetTrigger>
        <SheetContent side={"right"} className="border-none bg-black-1">
          <SheetHeader>
            <SheetTitle>
              <Link
                href={"/profile" + user?.id}
                className="flex gap-3 pb-12 items-center font-bold text-white-1"
              >
                <UserButton />
                <div className="flex w-[80%] items-center justify-between">
                  <h1>{user?.firstName}</h1>
                  <Image
                    src="/icons/right-arrow.svg"
                    alt="arrow-right"
                    width={20}
                    height={20}
                  />
                </div>
              </Link>
            </SheetTitle>
            <SheetDescription>
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
                      className="flex justify-between mt-2 items-center py-2 px-2 border border-black-5 cursor-pointer text-white-1"
                      onClick={() => setActiveEpisode(episode)}
                      style={{
                        borderColor:
                          activeEpisode?.title === episode?.title
                            ? "orange"
                            : "",
                      }}
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
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </span>
  );
};

export default MobileNav;
