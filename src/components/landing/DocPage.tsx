"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

function Logo() {
  return (
    <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center shrink-0">
      <svg viewBox="0 0 100 100" className="w-5 h-5">
        <path d="M 35 35 L 50 50 L 35 65" fill="transparent" stroke="#171717" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="55" y1="65" x2="70" y2="65" stroke="#171717" strokeWidth="8" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export function DocPage({
  title,
  intro,
  updated,
  children,
}: {
  title: string;
  intro?: string;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="h-full w-full overflow-y-auto bg-[#0A0D14] text-gray-100 font-sans selection:bg-yellow-500 selection:text-black">
      {/* Nav */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-[#0A0D14]/80 border-b border-white/10">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2.5 group">
            <Logo />
            <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-yellow-400 transition-colors">
              Plankthon
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-yellow-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">{title}</h1>
        {updated && <p className="text-sm text-gray-500 mb-8">Last updated: {updated}</p>}
        {intro && <p className="text-lg text-gray-300 leading-relaxed mb-6">{intro}</p>}
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Logo />
            <span>Plankthon</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-yellow-400 transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-yellow-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-yellow-400 transition-colors">Terms</Link>
          </div>
          <span>© {new Date().getFullYear()} Plankthon</span>
        </div>
      </footer>
    </div>
  );
}

export function DocH2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl font-bold text-white mt-10 mb-3">{children}</h2>;
}

export function DocH3({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-semibold text-white mt-6 mb-2">{children}</h3>;
}

export function DocP({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-300 leading-relaxed mb-4">{children}</p>;
}

export function DocUL({ children }: { children: React.ReactNode }) {
  return <ul className="list-disc pl-6 space-y-2 text-gray-300 mb-4 marker:text-yellow-400">{children}</ul>;
}
