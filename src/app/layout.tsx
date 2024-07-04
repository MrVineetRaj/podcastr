import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import PodcastProvider from "@/store/PodcasProvider";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Podcastr",
  description: "Generate you podcast episodes with AI powered Podcastr",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
          logoImageUrl: "/icons/auth-logo.svg",
        },
        variables: {
          colorBackground: "#15171c",
          colorPrimary: "",
          colorText: "white",
          colorInputBackground: "#1b1f29",
          colorInputText: "white",
        },
      }}
    >
      <html lang="en">
        <head>
          <Script
            src={`https://code.responsivevoice.org/responsivevoice.js?key=${process.env.NEXT_PUBLIC_RESPONSIVE_VOICE_API_KEY}`}
            strategy="beforeInteractive"
          />
        </head>
        <PodcastProvider>
          <body className={manrope.className}>{children}</body>
        </PodcastProvider>
      </html>
    </ClerkProvider>
  );
}
