"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const PodcastDetails = () => {
  const searchParams = useSearchParams();
  const podcastId = searchParams.get("r");

  const [podcast, setPodcast] = useState(null);
  useEffect(() => {
    if (!podcastId) return;
    fetch(`/api/podcast?r=${podcastId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPodcast(data);
      });
  }, [podcastId]);
  return (
    <section className="flex w-full flex-col">
      <header className="mt-9 flex items-center justify-between">
        <h1 className="text-20 font-bold text-white-1">
          {podcast?.data?.title}
        </h1>
        <figure className="flex gap-3">
          <Image
            src="/icons/headphone.svg"
            width={24}
            height={24}
            alt="headphone"
          />
        </figure>
      </header>
      <div className="flex gap-10 items-start justify-start my-5">
        <Image
          src={podcast?.data?.imageUrl}
          width={200}
          height={200}
          alt="podcast"
          className="rounded-lg"
        />
        <div className="">
          <p className="text-white-2 text-16 pb-8 font-medium max-md:text-center ">
            {podcast?.data?.description}
          </p>

          <h2 className="text-16 font-bold text-white-1">153 views</h2>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h1 className="text-18 font-bold text-white-1">Transcription</h1>
          <p className="text-16 font-medium text-white-2">
            {podcast?.data?.transcription}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PodcastDetails;
