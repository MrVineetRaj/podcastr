import PodcastPlayer from "@/components/PodcastPlaye";
import LeftSideBar from "@/components/sidebar/LeftSideBar";
import MobileNav from "@/components/sidebar/MobileNav";
import MobileNavLeft from "@/components/sidebar/MobileNavLeft";
import RightSideBar from "@/components/sidebar/RightSideBar";
import { Toaster } from "@/components/ui/toaster";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col">
      <main className="relative flex bg-black-3">
        <LeftSideBar />
        <span className="max-md:block hidden">
          <MobileNavLeft />
        </span>
        <section className=" flex min-h-screen flex-1 flex-col px-4 sm:px-14">
          <div className="mx-auto flex w-full max-w-5xl flex-col max-sm:px-4">
            <div className="flex h-16 items-center justify-between md:hidden">
              <Image src="/icons/logo.svg" alt="logo" width={30} height={30} />
              MobileNav
            </div>
            <div className="flex flex-col md:pb-14">
              <Toaster />
              {children}
            </div>
          </div>
        </section>
        <span className="xl:hidden">
          <MobileNav />
        </span>

        <RightSideBar />
      </main>
      <PodcastPlayer />
    </div>
  );
}
