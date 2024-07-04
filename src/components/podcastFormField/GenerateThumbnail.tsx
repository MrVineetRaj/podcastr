import { GenerateThumbnailProps } from "@/config/ts_types";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { Loader } from "lucide-react";

const GenerateThumbnail = ({
  setImage,
  image,
  podcastTitle,
}: GenerateThumbnailProps) => {
  const { user, isSignedIn } = useUser();
  const [isUploading, setIsUploading] = useState(false);
  const handleImageStore = async (file: any) => {
    setIsUploading(true);
    if (!isSignedIn || !user) {
      console.error("User is not signed in");
      return;
    }

    const formData = new FormData();
    formData.append("file", file[0]);
    formData.append("title", podcastTitle);
    formData.append("clerkId", user.id);
    const response = await fetch("/api/cloudinary/store/image", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setImage(data.imageUrl);
    setIsUploading(false);
  };
  return (
    <div className=" flex flex-col items-center mt-5">
      <Input
        type="file"
        className="text-white-5"
        onChange={(event) => {
          const file = event.target.files;
          handleImageStore(file);
        }}
      />
      {isUploading && (
        <span className="w-full py-2 rounded-md bg-orange-1 text-white-1 font-bold flex items-center justify-center gap-2 ">
          <span>Uploading</span>
          <Loader className="animate-spin" />
        </span>
      )}
      {image && (
        <div className="flex  items-center justify-center gap-2.5 mt-5">
          <img src={image} alt="thumbnail" className="w-20 h-20" />
        </div>
      )}
    </div>
  );
};

export default GenerateThumbnail;
