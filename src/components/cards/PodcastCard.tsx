import Image from "next/image";
import React from "react";

const PodcastCard = ({
  podcast,
}: {
  podcast: {
    id: number;
    title: string;
    description: string;
    imgURL: string;
  };
}) => {
  const { title, description, imgURL } = podcast;
  return (
    <div className=" cursor-pointer">
      <figure className="">
        <Image
          src={imgURL}
          alt={title}
          width={174}
          height={174}
          className="aspect-square h-fit w-full rounded-xl 2xl:size-[200px]"
        />
        <div className="flex flex-col ">
          <h1 className="text-white-1 text-16 truncate font-bold ">{title}</h1>
          <p className="text-white-4 capitalize text-12">{description}</p>
        </div>
      </figure>
    </div>
  );
};

export default PodcastCard;
