import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const PodcastCard = ({
  podcast,
}: {
  podcast: {
    title: string;
    description: string;
    imageUrl: string;
    _id: string;
  };
}) => {
  const { title, description, imageUrl, _id } = podcast;
  const router = useRouter();

  const handlePodCastRedirect = () => {
    router.push(`/podcast?r=${_id}&e=0`, {
      scroll: true,
    });
  };
  return (
    <div className=" cursor-pointer" onClick={handlePodCastRedirect}>
      <figure className="">
        <Image
          src={imageUrl}
          alt={title}
          width={174}
          height={174}
          className="aspect-square h-fit w-full rounded-xl 2xl:size-[200px]"
        />
        <div className="flex flex-col ">
          <h1 className="text-white-1 text-16 truncate font-bold ">{title}</h1>
          <p className="text-white-4 capitalize text-12 line-clamp-3">{description}</p>
        </div>
      </figure>
    </div>
  );
};

export default PodcastCard;
