import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

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
        variables:{
          colorBackground:"#15171c",
          colorPrimary:"",
          colorText:"white",
          colorInputBackground:"#1b1f29",
          colorInputText:"white",
        }
      }}
    >
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
