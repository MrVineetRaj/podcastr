"use client";

import { SignedIn, UserButton } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import Carousel from "../Carousel";
import Header from "../Header";

const RightSideBar = () => {
  const { user, isSignedIn } = useUser();

  return (
    <section className=" sticky right-0 top-0 h-[100vh] right_sidebar text-white-1">
      <SignedIn>
        <Link
          href={"/profile" + user?.id}
          className="flex gap-3 pb-12 items-center font-bold"
        >
          <UserButton />
          <div className="flex w-full items-center justify-between">
            <h1>{user?.firstName}</h1>
            <Image
              src="/icons/right-arrow.svg"
              alt="arrow-right"
              width={20}
              height={20}
            />
          </div>
        </Link>
      </SignedIn>
      <section className="mt-4 h-[70vh]">
        <Header headerTitle="Fans Like you" />
        <Carousel />
      </section>
    </section>
  );
};

export default RightSideBar;
