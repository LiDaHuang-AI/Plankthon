"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Sparkles, Flame, Code, ChevronLeft, ChevronRight, Globe, Mail, Shield, Clock } from "lucide-react";
import { LazyScene } from "@/components/landing/LazyScene";
import { TerminalMockup } from "@/components/landing/TerminalMockup";
import { useAppContext } from "./ClientProvider";
import clsx from "clsx";

// Subtle drifting particle field for the hero — soft yellow/amber/white dots
// that gently float and twinkle, adding depth without competing with the text.
function HeroParticles() {
  const dots = React.useMemo(
    () =>
      Array.from({ length: 44 }, (_, i) => {
        const palette = ["250,204,21", "251,191,36", "255,255,255"];
        return {
          left: Math.random() * 100,
          top: Math.random() * 100,
          size: Math.random() * 2.5 + 1.5,
          alpha: Math.random() * 0.4 + 0.2,
          color: palette[i % 4 === 0 ? 2 : Math.random() > 0.5 ? 1 : 0],
          delay: Math.random() * 8,
          dur: Math.random() * 6 + 7,
        };
      }),
    []
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((d, i) => (
        <span
          key={i}
          className="hero-dot"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            background: `rgba(${d.color},${d.alpha})`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

// Types out `text` character-by-character with a blinking caret, like the
// antigravity.google hero. Reserves the full text's space up front (invisible
// copy) so the layout doesn't jump while typing.
function Typewriter({
  text,
  startDelay = 900,
  speed = 65,
  className,
}: {
  text: string;
  startDelay?: number;
  speed?: number;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStarted(true);
      setCount(text.length);
      return;
    }
    const t = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(t);
  }, [startDelay, text.length]);

  useEffect(() => {
    if (!started || count >= text.length) return;
    const t = setTimeout(() => setCount((c) => c + 1), speed);
    return () => clearTimeout(t);
  }, [started, count, speed, text.length]);

  return (
    <span className="relative inline-block">
      <span className="invisible">{text}</span>
      <span className={clsx("absolute inset-0", className)}>
        {text.slice(0, count)}
        <motion.span
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
          className="inline-block w-[4px] h-[0.85em] bg-yellow-400 ml-1.5 rounded-sm align-[-0.05em]"
        />
      </span>
    </span>
  );
}

// Scroll-triggered reveal: fade + rise + unblur, antigravity-style. The page
// scrolls inside a nested container, so the observer root must be passed in.
function Reveal({
  children,
  rootRef,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  rootRef: React.RefObject<HTMLDivElement | null>;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px", root: rootRef }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Animates a number from 0 to `target` the first time it scrolls into view.
function CountUp({
  target,
  suffix = "",
  duration = 1400,
  rootRef,
  className,
}: {
  target: number;
  suffix?: string;
  duration?: number;
  rootRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px", root: rootRef });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let start: number | null = null;
    let raf: number;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      setValue(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}

const TEAM = [
  { firstName: "นัจกร", fullName: "นางสาวนัจกร อุ่นเสรีภาพ", number: 6, img: "/team/member-1.jpg" },
  { firstName: "พานุวัฒน์", fullName: "นายพานุวัฒน์ วัฒนชัย", number: 29, img: "/team/member-2.jpg" },
  { firstName: "สเตฟาน", fullName: "นายสเตฟาน ทองเปลว", number: 31, img: "/team/member-3.jpg" },
  { firstName: "สุทธิภัทร", fullName: "นายสุทธิภัทร พุตซ้อน", number: 33, img: "/team/member-4.jpg" },
  { firstName: "อธิคุณ", fullName: "นายอธิคุณ ศิราทอง", number: 34, img: "/team/member-5.jpg" },
];

// Horizontal snap carousel of big photo cards with prev/next arrows, modeled
// on the "meet the developers" section of antigravity.google.
function TeamCarousel({ rootRef }: { rootRef: React.RefObject<HTMLDivElement | null> }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-team-card]");
    const step = card ? card.offsetWidth + 24 : 400;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="no-scrollbar flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 -mx-6 px-6 sm:mx-0 sm:px-0"
      >
        {TEAM.map((m, i) => (
          <motion.div
            key={m.number}
            data-team-card
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px", root: rootRef }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="snap-start flex-shrink-0 w-[270px] sm:w-[330px] lg:w-[360px] group text-left"
          >
            <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[4/5] bg-white/5 shadow-2xl">
              <Image
                src={m.img}
                alt={m.fullName}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 640px) 270px, 360px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                  {m.firstName}
                </div>
                <div className="text-yellow-300 text-xs font-bold tracking-widest mt-1 uppercase">
                  เลขที่ {m.number}
                </div>
              </div>
            </div>
            <div className="mt-4 px-1">
              <div className="text-sm font-semibold text-white">{m.fullName}</div>
              <div className="text-xs text-gray-400 mt-0.5">Plankthon Team</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-end gap-3 mt-4">
        <button
          onClick={() => scrollByCard(-1)}
          aria-label="Previous member"
          className="w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-yellow-400/40 text-white flex items-center justify-center transition-colors active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scrollByCard(1)}
          aria-label="Next member"
          className="w-11 h-11 rounded-full border border-white/15 bg-white/5 hover:bg-white/10 hover:border-yellow-400/40 text-white flex items-center justify-center transition-colors active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [userCount, setUserCount] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Live count of registered learners (unique emails), from /api/users.
  useEffect(() => {
    fetch("/api/users")
      .then((r) => r.json())
      .then((d) => {
        if (typeof d.count === "number") setUserCount(d.count);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      setScrolled(el.scrollTop > 50);
    };
    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth-scroll to an in-page section. The page scrolls inside scrollRef
  // (not the window), so native "#anchor" jumps don't work. We animate the
  // container's scrollTop by hand with requestAnimationFrame instead of
  // scrollTo({ behavior: "smooth" }), because native smooth scrolling on a
  // nested overflow container is unreliable across browsers (it often jumps).
  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const root = scrollRef.current;
    const target = document.getElementById(id);
    if (!root || !target) return;

    const startTop = root.scrollTop;
    const endTop = Math.max(0, target.offsetTop - 72); // offset the fixed navbar
    const distance = endTop - startTop;
    if (Math.abs(distance) < 1) return;

    const duration = 700;
    const easeInOutQuad = (t: number) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    let startTime: number | null = null;
    const step = (now: number) => {
      if (startTime === null) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      root.scrollTop = startTop + distance * easeInOutQuad(progress);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <div
      ref={scrollRef}
      className="h-full w-full overflow-y-auto overflow-x-hidden relative bg-[#0A0D14] text-gray-100 font-sans selection:bg-yellow-500 selection:text-black"
    >
      {/* 1. Floating Transparent/Blurred Navbar */}
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 lg:px-12 py-4 flex items-center justify-between",
          scrolled
            ? "bg-[#0A0D14]/80 backdrop-blur-md border-b border-white/10 py-3 shadow-lg"
            : "bg-transparent"
        )}
      >
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-yellow-400 flex items-center justify-center shadow-[0_0_15px_rgba(250,204,21,0.3)] group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 100 100" className="w-6 h-6">
              <path d="M 35 35 L 50 50 L 35 65" fill="transparent" stroke="#171717" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="55" y1="65" x2="70" y2="65" stroke="#171717" strokeWidth="8" strokeLinecap="round" />
            </svg>
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-yellow-400 transition-colors">
            Plankthon
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#features" onClick={scrollToSection("features")} className="hover:text-yellow-400 transition-colors">Features</a>
          <a href="#exercise" onClick={scrollToSection("exercise")} className="hover:text-yellow-400 transition-colors">Interactive IDE</a>
          <a href="#about" onClick={scrollToSection("about")} className="hover:text-yellow-400 transition-colors">Team</a>
        </nav>

        <Link
          href="/auth"
          className="px-5 py-2.5 rounded-full bg-yellow-400 text-black font-semibold text-sm hover:bg-yellow-300 transition-all hover:shadow-[0_0_20px_rgba(250,204,21,0.5)] active:scale-95"
        >
          Start learning free
        </Link>
      </header>

      {/* 2. Full-Screen Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16 overflow-hidden">
        {/* Soft focal glow to anchor the hero */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] max-w-[130vw] max-h-[130vw] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(250,204,21,0.10) 0%, rgba(250,204,21,0.03) 35%, transparent 70%)" }}
        />

        {/* Drifting particle field */}
        <HeroParticles />

        {/* 3D logo — smaller and softer so it frames the text instead of covering it */}
        <LazyScene
          scale={0.68}
          rootRef={scrollRef}
          className="absolute inset-0 w-full h-full pointer-events-auto opacity-80"
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center pointer-events-none mt-12 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-300 text-xs md:text-sm font-semibold mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Learn Python interactively with Planky</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.02] mb-6 font-sans"
          >
            Master Python <br className="hidden sm:inline" />
            <Typewriter
              text="One Line at a Time."
              className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_8px_40px_rgba(250,204,21,0.35)]"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg sm:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 font-normal leading-relaxed"
          >
            Interactive, bite-sized lessons and real coding challenges, with Planky, your AI mentor, guiding you at every step.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
          >
            <Link
              href="/auth"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 text-black font-extrabold text-base sm:text-lg hover:from-yellow-300 hover:to-amber-300 transition-all shadow-[0_0_30px_rgba(250,204,21,0.4)] hover:shadow-[0_0_45px_rgba(250,204,21,0.6)] hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2"
            >
              <span>Start Learning Free</span>
              <ChevronRight className="w-5 h-5 stroke-[3]" />
            </Link>
            <a
              href="#features"
              onClick={scrollToSection("features")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-base sm:text-lg border border-white/10 transition-all backdrop-blur-sm flex items-center justify-center"
            >
              Explore Curriculum
            </a>
          </motion.div>
        </div>
      </section>

      {/* 3. Stat Bar / Logo Bar */}
      <section className="w-full border-y border-white/10 bg-[#0E1118]/80 backdrop-blur-md py-10 relative z-10">
        <div className="max-w-2xl mx-auto px-6 grid grid-cols-2 gap-8 text-center">
          <div>
            <div className="text-3xl lg:text-4xl font-extrabold text-yellow-400 font-mono">
              <CountUp target={100} suffix="%" rootRef={scrollRef} />
            </div>
            <div className="text-sm text-gray-400 mt-1 font-medium">Runs in your browser</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-extrabold text-white font-mono">
              {userCount === null ? "—" : <CountUp target={userCount} rootRef={scrollRef} />}
            </div>
            <div className="text-sm text-gray-400 mt-1 font-medium">Registered learners</div>
          </div>
        </div>
      </section>

      {/* 4. Feature Showcase Sections */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-32 space-y-32 relative z-10">
        {/* Feature 1: Gamified lessons (Left text, Right mockup) */}
        <motion.div
          initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px", root: scrollRef }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Guided Curriculum
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Structured Lessons, <br />
              <span className="text-yellow-400">Built to Stick.</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Learn through focused, bite-sized chapters instead of long video lectures. Each lesson builds on the last, with interactive exercises and immediate feedback so concepts actually stay.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 text-xs">✓</div>
                <span>Interactive exercises with real-time feedback</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 text-xs">✓</div>
                <span>Track progress with XP and badges as you advance</span>
              </li>
            </ul>
          </div>
          {/* App Screenshot: Lesson UI — box sizes itself to the image, no cropping */}
          <div className="w-full rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-2 shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
            <Image
              src="/screenshots/lessons-v2.png"
              alt="Plankthon lesson screen showing an interactive Python exercise"
              width={1040}
              height={900}
              className="w-full h-auto rounded-2xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </motion.div>

        {/* Feature 2: Quest/challenge system (Left mockup, Right text) */}
        <motion.div
          initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px", root: scrollRef }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* App Screenshot: Coding Sandbox — box sizes itself to the image, no cropping */}
          <div className="w-full rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-2 shadow-2xl relative group overflow-hidden order-2 lg:order-1">
            <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
            <Image
              src="/screenshots/coding-v2.png"
              alt="Plankthon browser-based Python coding sandbox with live output"
              width={640}
              height={730}
              className="w-full h-auto rounded-2xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-wider">
              <Code className="w-3.5 h-3.5" />
              Real Coding Exercises
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Write Real Code. <br />
              <span className="text-yellow-400">Not Just Syntax.</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Put your knowledge to the test in a built-in, browser-based coding sandbox. Solve real challenges, debug your own solutions, and get instant guidance from Planky whenever you get stuck.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 text-xs">✓</div>
                <span>Full Pyodide in-browser Python execution</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 text-xs">✓</div>
                <span>AI code review and tailored debugging hints</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Feature 3: Streak system (Left text, Right mockup) */}
        <motion.div
          initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px", root: scrollRef }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              Habit Building
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Build Unstoppable <br />
              <span className="text-yellow-400">Daily Streaks.</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Consistency is key to mastering programming. Track your daily streak and review your activity heatmap to build a steady learning habit that lasts.
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 text-xs">✓</div>
                <span>Activity heatmap that visualizes your progress</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 text-xs">✓</div>
                <span>Daily streaks that keep you accountable</span>
              </li>
            </ul>
          </div>
          {/* App Screenshot: Streak Dashboard — box sizes itself to the image, no cropping */}
          <div className="w-full rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 p-2 shadow-2xl relative group overflow-hidden">
            <div className="absolute inset-0 bg-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
            <Image
              src="/screenshots/streak-v2.png"
              alt="Plankthon home dashboard showing daily streaks and an activity heatmap"
              width={740}
              height={441}
              className="w-full h-auto rounded-2xl"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </motion.div>
      </section>

      {/* 5. Interactive Code Sample Section */}
      <section id="exercise" className="w-full py-28 bg-[#0E1118] border-t border-white/10 relative z-10 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <Reveal rootRef={scrollRef} className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Test Drive Your First <span className="text-yellow-400">Python Script</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Watch code type out live, or take over the terminal and execute it directly in your browser.
            </p>
          </Reveal>

          <TerminalMockup rootRef={scrollRef} />
        </div>
      </section>

      {/* 6. Testimonial / Social Proof Section */}
      <section className="max-w-7xl mx-auto px-6 py-28 text-center space-y-8 relative z-10 border-t border-white/5">
        <Reveal rootRef={scrollRef} className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Loved by Future Developers</h2>
          <p className="text-gray-400 max-w-xl mx-auto">We&apos;re just getting started — real stories from learners will show up here soon.</p>
        </Reveal>
        <Reveal rootRef={scrollRef} delay={0.15}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-300 text-sm font-semibold">
            <Clock className="w-4 h-4" />
            Coming soon
          </div>
        </Reveal>
      </section>

      {/* 7. Development Team / About Section */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-24 relative z-10 border-t border-white/5">
        <Reveal rootRef={scrollRef} className="text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">Meet the Team Behind Plankthon</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Dedicated to making coding accessible, interactive, and joyful for everyone.</p>
        </Reveal>
        <TeamCarousel rootRef={scrollRef} />
      </section>

      {/* 8. Full-Screen Final CTA Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center px-6 py-32 overflow-hidden border-t border-white/10 bg-[#07090E]">
        {/* Secondary 3D Scene in Background */}
        <LazyScene scale={1.4} rootRef={scrollRef} className="absolute inset-0 w-full h-full pointer-events-auto opacity-70" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 pointer-events-none">
          <Reveal rootRef={scrollRef}>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
              Ready to Dive Into <br />
              <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                Your Python Journey?
              </span>
            </h2>
          </Reveal>
          <Reveal rootRef={scrollRef} delay={0.12}>
            <p className="text-lg sm:text-2xl text-gray-300 max-w-xl mx-auto">
              No setup and no installation. Create a free account and start writing Python in your browser in under a minute.
            </p>
          </Reveal>
          <div className="pt-4 pointer-events-auto">
            <Link
              href="/auth"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 text-black font-black text-lg sm:text-xl hover:from-yellow-300 hover:to-amber-300 transition-all shadow-[0_0_40px_rgba(250,204,21,0.5)] hover:shadow-[0_0_60px_rgba(250,204,21,0.8)] hover:-translate-y-1 active:translate-y-0"
            >
              <span>Start Learning Free</span>
              <ChevronRight className="w-6 h-6 stroke-[3]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="w-full bg-[#05070B] border-t border-white/10 py-12 px-6 lg:px-12 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-5 h-5">
                <path d="M 35 35 L 50 50 L 35 65" fill="transparent" stroke="#171717" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="55" y1="65" x2="70" y2="65" stroke="#171717" strokeWidth="8" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight text-white">Plankthon</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
            <a href="#features" onClick={scrollToSection("features")} className="hover:text-yellow-400 transition-colors">Features</a>
            <a href="#exercise" onClick={scrollToSection("exercise")} className="hover:text-yellow-400 transition-colors">Interactive IDE</a>
            <Link href="/about" className="hover:text-yellow-400 transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-yellow-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-yellow-400 transition-colors">Terms of Service</Link>
          </div>

          <div className="flex items-center gap-4 text-gray-400">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors">
              <Globe className="w-5 h-5" />
            </a>
            <a href="mailto:contact@plankthon.app" className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            <a href="#" className="p-2 rounded-full hover:bg-white/10 hover:text-white transition-colors">
              <Shield className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/5 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Plankthon. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default function RootPage() {
  const { state } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (state?.loggedIn) {
      router.replace("/home");
    }
  }, [state, router]);

  if (state?.loggedIn) {
    return <div className="w-full h-full flex items-center justify-center">Loading...</div>;
  }

  return <LandingPage />;
}
