import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { cn } from "~/lib/utils";

import "./globals.css";

import { PropsWithChildren } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Tech Test",
    default: "Tech Test",
  },
  description: "Tech Test",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.className,
          geistSans.variable,
          geistMono.variable,
          "flex min-h-screen antialiased"
        )}
      >
        {children}
      </body>
    </html>
  );
}
