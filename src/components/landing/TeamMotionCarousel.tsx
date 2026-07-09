"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Copy, Check, Terminal, X, Code, Sparkles } from "lucide-react";

export interface TeamMember {
  firstName: string;
  fullName: string;
  number: number;
  role: string;
  img: string;
}

const TEAM: TeamMember[] = [
  { firstName: "นัจกร", fullName: "นางสาวนัจกร อุ่นเสรีภาพ", number: 6, role: "(Temporary) tester", img: "/team/member-1.jpg" },
  { firstName: "พานุวัฒน์", fullName: "นายพานุวัฒน์ วัฒนชัย", number: 29, role: "Full-stack developer", img: "/team/member-2.jpg" },
  { firstName: "สเตฟาน", fullName: "นายสเตฟาน ทองเปลว", number: 31, role: "Muslim", img: "/team/member-3.jpg" },
  { firstName: "สุทธิภัทร", fullName: "นายสุทธิภัทร พุตซ้อน", number: 33, role: "Shareholders", img: "/team/member-4.jpg" },
  { firstName: "อธิคุณ", fullName: "นายอธิคุณ ศิราทอง", number: 34, role: "Presenter", img: "/team/member-5.jpg" },
];

export function TeamMotionCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [copied, setCopied] = useState(false);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % TEAM.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + TEAM.length) % TEAM.length);
  };

  const handleCopyCode = (member: TeamMember) => {
    const codeString = `// 👥 Meet the Team Behind Plankthon
import { TeamMember } from "@plankthon/core";

export const member_${member.number}: TeamMember = {
  id: "PLK-00${member.number}",
  firstName: "${member.firstName}",
  fullName: "${member.fullName}",
  number: ${member.number},
  role: "${member.role}"
};`;
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedMember(null);
      if (e.key === "ArrowRight" && !selectedMember) nextSlide();
      if (e.key === "ArrowLeft" && !selectedMember) prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMember, nextSlide, prevSlide]);

  const prevOffsetsRef = useRef<Record<number, number>>({});

  return (
    <div className="relative w-full py-8">
      {/* Motion Carousel Track */}
      <div className="relative flex items-center justify-center min-h-[460px] sm:min-h-[520px] overflow-hidden px-4">
        <div className="relative flex items-center justify-center w-full max-w-5xl">
          {TEAM.map((member, idx) => {
            // Calculate relative offset (-2, -1, 0, 1, 2)
            let offset = idx - activeIndex;
            if (offset < -Math.floor(TEAM.length / 2)) offset += TEAM.length;
            if (offset > Math.floor(TEAM.length / 2)) offset -= TEAM.length;

            const prevOffset = prevOffsetsRef.current[member.number] ?? offset;
            const isWrapping = Math.abs(offset - prevOffset) > 1;
            prevOffsetsRef.current[member.number] = offset;

            const isCenter = offset === 0;
            const isVisible = Math.abs(offset) <= 2;

            if (!isVisible) return null;

            return (
              <motion.div
                key={member.number}
                onClick={() => {
                  if (isCenter) {
                    setSelectedMember(member);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                initial={false}
                animate={{
                  x: offset * (typeof window !== "undefined" && window.innerWidth < 640 ? 180 : 280),
                  scale: isCenter ? 1 : Math.abs(offset) === 1 ? 0.85 : 0.7,
                  opacity: isCenter ? 1 : Math.abs(offset) === 1 ? 0.6 : 0.25,
                  rotateY: offset * -15,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  x: { duration: isWrapping ? 0 : undefined },
                  rotateY: { duration: isWrapping ? 0 : undefined },
                  scale: { duration: isWrapping ? 0 : undefined },
                  opacity: { duration: isWrapping ? 0 : undefined },
                }}
                style={{
                  perspective: 1000,
                  zIndex: 10 - Math.abs(offset),
                }}
                className={`absolute cursor-pointer rounded-2xl overflow-hidden w-[260px] sm:w-[320px] lg:w-[350px] aspect-[4/5] shadow-2xl transition-shadow duration-300 ${
                  isCenter
                    ? "ring-2 ring-yellow-400/80 shadow-[0_15px_50px_rgba(250,204,21,0.25)]"
                    : "hover:opacity-80"
                }`}
              >
                <Image
                  src={member.img}
                  alt={member.fullName}
                  fill
                  className="object-cover pointer-events-none"
                  sizes="(max-width: 640px) 260px, 350px"
                  priority={isCenter}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Click to view code prompt badge for center card */}
                {isCenter && (
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md border border-yellow-400/40 text-yellow-300 text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg animate-pulse">
                    <Code className="w-3.5 h-3.5" />
                    <span>กดเพื่อดูโค้ดรายละเอียด</span>
                  </div>
                )}

                <div className="absolute bottom-5 left-5 right-5 z-10 text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md group-hover:text-yellow-300 transition-colors">
                    {member.firstName}
                  </div>
                  <div className="text-yellow-300 text-xs font-bold tracking-widest mt-1 uppercase">
                    เลขที่ {member.number}
                  </div>
                  <div className="text-sm font-medium text-gray-200 mt-2 truncate">
                    {member.fullName}
                  </div>
                  <div className="inline-block mt-1.5 px-2.5 py-0.5 rounded-md bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-xs font-semibold">
                    {member.role}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Carousel Navigation Controls */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="w-12 h-12 rounded-full border border-white/20 bg-white/5 hover:bg-yellow-400/20 hover:border-yellow-400/50 text-white hover:text-yellow-300 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Dots indicator */}
        <div className="flex items-center gap-2.5">
          {TEAM.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                idx === activeIndex
                  ? "w-8 h-2.5 bg-yellow-400 shadow-[0_0_12px_rgba(250,204,21,0.6)]"
                  : "w-2.5 h-2.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="w-12 h-12 rounded-full border border-white/20 bg-white/5 hover:bg-yellow-400/20 hover:border-yellow-400/50 text-white hover:text-yellow-300 flex items-center justify-center transition-all duration-200 active:scale-95 shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Animate UI Code Popup Modal */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
              className="relative w-full max-w-2xl bg-[#0D1117] border border-white/15 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.8)] overflow-hidden text-left"
            >
              {/* Terminal / VS Code Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#161B22] border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  <span className="ml-2 text-xs font-mono text-gray-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-yellow-400" />
                    team_member_{selectedMember.number}.ts
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleCopyCode(selectedMember)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-gray-300 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-green-400 font-semibold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-gray-400" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => setSelectedMember(null)}
                    aria-label="Close modal"
                    className="p-1 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Code Modal Content Body */}
              <div className="p-5 sm:p-6 font-mono text-xs sm:text-sm overflow-x-auto bg-[#0D1117]">
                <div className="flex gap-4">
                  {/* Line Numbers */}
                  <div className="select-none text-gray-600 text-right pr-2 border-r border-white/10 flex flex-col space-y-1 font-semibold">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                    <span>6</span>
                    <span>7</span>
                    <span>8</span>
                    <span>9</span>
                    <span>10</span>
                  </div>

                  {/* Syntax Highlighted Code Block */}
                  <div className="flex-1 flex flex-col space-y-1 text-gray-300">
                    <div>
                      <span className="text-gray-500 italic">// 👥 Meet the Team Behind Plankthon</span>
                    </div>
                    <div>
                      <span className="text-purple-400 font-bold">import</span>{" "}
                      <span className="text-gray-300">&#123; TeamMember &#125;</span>{" "}
                      <span className="text-purple-400 font-bold">from</span>{" "}
                      <span className="text-emerald-400">&quot;@plankthon/core&quot;</span>;
                    </div>
                    <div className="h-2" />
                    <div>
                      <span className="text-purple-400 font-bold">export const</span>{" "}
                      <span className="text-blue-400 font-semibold">member_{selectedMember.number}</span>:{" "}
                      <span className="text-yellow-300">TeamMember</span> = &#123;
                    </div>
                    <div className="pl-4">
                      <span className="text-sky-300">id</span>:{" "}
                      <span className="text-emerald-400">&quot;PLK-00{selectedMember.number}&quot;</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-sky-300">firstName</span>:{" "}
                      <span className="text-emerald-400">&quot;{selectedMember.firstName}&quot;</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-sky-300">fullName</span>:{" "}
                      <span className="text-emerald-400 font-bold">&quot;{selectedMember.fullName}&quot;</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-sky-300">number</span>:{" "}
                      <span className="text-amber-400 font-bold">{selectedMember.number}</span>,
                    </div>
                    <div className="pl-4">
                      <span className="text-sky-300">role</span>:{" "}
                      <span className="text-yellow-300 font-extrabold bg-yellow-400/10 px-1.5 py-0.5 rounded border border-yellow-400/20">&quot;{selectedMember.role}&quot;</span>
                    </div>
                    <div>&#125;;</div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-3 bg-[#161B22] border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>Animate UI Code Spec • Live Data Binding</span>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="px-4 py-1.5 rounded-lg bg-yellow-400 hover:bg-yellow-300 text-black font-bold transition-all"
                >
                  ปิดหน้าต่าง (Close)
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
