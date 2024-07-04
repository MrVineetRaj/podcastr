"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { AlignLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const MobileNavLeft = () => {
  const pathName = usePathname();
  const router = useRouter();

  return (
    <span>
      <Sheet>
        <SheetTrigger>
          <AlignLeft className="absolute top-16 left-5 border text-white-1 " />
        </SheetTrigger>
        <SheetContent side={"left"} className="border-none bg-black-1">
          <SheetHeader>
            <SheetTitle>
              <Link
                href="/"
                className="flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-start max-lg:px-4"
              >
                <Image
                  src="/icons/logo.svg"
                  alt="logo"
                  width={23}
                  height={27}
                />
                <h1 className="text-24 font-extrabold text-white max-lg:hidden">
                  Podcastr
                </h1>
              </Link>
            </SheetTitle>
            <SheetDescription>
              {sidebarLinks?.map((item, index) => {
                const isActive =
                  pathName === item.route ||
                  pathName.startsWith(`${item.route}/`);
                return (
                  <Link
                    key={index}
                    href={item.route}
                    className={cn(
                      "sticky left-0 top-0 flex h-full items-center gap-3 py-4 max-lg:px-4 justify-start lg:justify-start  ",
                      { "bg-nav-focus border-r-4 border-orange-1": isActive }
                    )}
                  >
                    <Image
                      src={item.imgURL}
                      alt={item.label}
                      width={20}
                      height={20}
                    />
                    <span className="text-16 font-semibold text-white-1">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </span>
  );
};

export default MobileNavLeft;
