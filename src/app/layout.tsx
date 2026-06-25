import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClientProvider } from "./ClientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plankthon",
  description: "Level up your Python, one line at a time.",
};

import { CursorProvider, Cursor } from "@/components/ui/cursor";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-bg text-text h-screen w-screen overflow-hidden selection:bg-accent/30 cursor-none`}
      >
        <ClientProvider>
          <CursorProvider global className="h-full w-full">
            <Cursor />
            {children}
          </CursorProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
