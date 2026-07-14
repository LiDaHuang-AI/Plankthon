"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Sparkles, Flame, Code, ChevronRight, Globe, Mail, Shield } from "lucide-react";
import { LazyScene } from "@/components/landing/LazyScene";
import { TerminalMockup } from "@/components/landing/TerminalMockup";
import { SpotlightCard, ShimmerBadge, ShimmerButton, CyberGrid, AmbientOrbs } from "@/components/landing/AntigravityEffects";
import { TeamMotionCarousel } from "@/components/landing/TeamMotionCarousel";
import { useAppContext } from "./ClientProvider";
import clsx from "clsx";

// Subtle drifting particle field for the hero — soft yellow/amber/white dots
// that gently float and twinkle, adding depth without competing with the text.
function pseudoRandom(seed: number): number {
  const x = Math.sin(seed * 9999.1234) * 10000;
  return x - Math.floor(x);
}

function HeroParticles() {
  const dots = React.useMemo(
    () =>
      Array.from({ length: 44 }, (_, i) => {
        const palette = ["250,204,21", "251,191,36", "255,255,255"];
        return {
          left: pseudoRandom(i * 10 + 1) * 100,
          top: pseudoRandom(i * 10 + 2) * 100,
          size: pseudoRandom(i * 10 + 3) * 2.5 + 1.5,
          alpha: pseudoRandom(i * 10 + 4) * 0.4 + 0.2,
          color: palette[i % 4 === 0 ? 2 : pseudoRandom(i * 10 + 5) > 0.5 ? 1 : 0],
          delay: pseudoRandom(i * 10 + 6) * 8,
          dur: pseudoRandom(i * 10 + 7) * 6 + 7,
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

// True once the element has intersected the scroll container. Uses a raw
// IntersectionObserver per element instead of framer-motion's useInView /
// whileInView: framer multiplexes one shared observer per root, and its
// subscriptions can silently drop for some elements (an entire feature
// section stayed invisible), while a dedicated observer is reliable.
function useSeenOnce(
  ref: React.RefObject<Element | null>,
  rootRef: React.RefObject<HTMLDivElement | null>,
  margin = "0px"
) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (seen || !ref.current) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { root: rootRef.current || null, rootMargin: margin }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [seen, ref, rootRef, margin]);
  return seen;
}

// Types out `text` character-by-character with a blinking caret, like the
// antigravity.google hero. Starts the first time it scrolls into view (the
// page scrolls inside a nested container, so the observer root is passed in).
// Reserves the full text's space up front (invisible copy) so the layout
// doesn't jump while typing. The caret hides once typing finishes unless
// `persistentCaret` keeps it blinking (used for the hero's signature line).
function Typewriter({
  text,
  rootRef,
  startDelay = 0,
  speed = 40,
  persistentCaret = false,
  className,
}: {
  text: string;
  rootRef: React.RefObject<HTMLDivElement | null>;
  startDelay?: number;
  speed?: number;
  persistentCaret?: boolean;
  className?: string;
}) {
  const holder = useRef<HTMLSpanElement>(null);
  const inView = useSeenOnce(holder, rootRef, "-40px");
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const done = count >= text.length;

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => {
        setStarted(true);
        setCount(text.length);
      });
      return;
    }
    let timer: NodeJS.Timeout;
    let raf: number;
    let startTime = 0;

    const startTyping = () => {
      setStarted(true);
      startTime = performance.now();
      const step = (now: number) => {
        const elapsed = now - startTime;
        const targetCount = Math.min(Math.floor(elapsed / speed) + 1, text.length);
        setCount((prev) => (prev !== targetCount ? targetCount : prev));
        if (targetCount < text.length) {
          raf = requestAnimationFrame(step);
        }
      };
      raf = requestAnimationFrame(step);
    };

    if (startDelay > 0) {
      timer = setTimeout(startTyping, startDelay);
    } else {
      startTyping();
    }

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [inView, startDelay, speed, text.length]);

  const showCaret = started && (persistentCaret || !done);

  return (
    <span ref={holder} className="relative inline-block">
      <span className="invisible">{text}</span>
      <span className={clsx("absolute inset-0", className)}>
        {text.slice(0, count)}
        {showCaret && (
          <motion.span
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1] }}
            className="inline-block w-[3px] h-[0.85em] bg-yellow-400 ml-1 rounded-sm align-[-0.05em]"
          />
        )}
      </span>
    </span>
  );
}

// Cumulative start times (ms) for typing several texts one after another.
function typingSchedule(items: [text: string, speed: number][], gap = 150): number[] {
  const starts: number[] = [];
  let t = 0;
  for (const [text, speed] of items) {
    starts.push(t);
    t += text.length * speed + gap;
  }
  return starts;
}

// Scroll-triggered reveal: fade + rise + unblur, antigravity-style. The page
// scrolls inside a nested container, so the observer root must be passed in.
function Reveal({
  children,
  rootRef,
  delay = 0,
  y = 35,
  margin = "-60px",
  className,
}: {
  children: React.ReactNode;
  rootRef: React.RefObject<HTMLDivElement | null>;
  delay?: number;
  y?: number;
  margin?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const seen = useSeenOnce(ref, rootRef, margin);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, scale: 0.98 }}
      animate={seen ? { opacity: 1, y: 0, scale: 1 } : undefined}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
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
  const inView = useSeenOnce(ref, rootRef, "-40px");
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      queueMicrotask(() => setValue(target));
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


// Copy + typing schedules for the typewriter sections. Every visible string
// types out in sequence; schedules are computed from the real text lengths so
// each element starts right as the previous one finishes.
const HERO = {
  badge: "Learn Python interactively with Planky",
  l1: "Master Python",
  l2: "One Line at a Time.",
  sub: "Interactive, bite-sized lessons and real coding challenges, with Planky, your AI mentor, guiding you at every step.",
};
const [heroBadgeAt, heroL1At, heroL2At, heroSubAt] = typingSchedule([
  [HERO.badge, 14],
  [HERO.l1, 55],
  [HERO.l2, 55],
  [HERO.sub, 8],
]);

const FEAT_A = {
  badge: "Guided Curriculum",
  l1: "Structured Lessons,",
  l2: "Built to Stick.",
  para: "Learn through focused, bite-sized chapters instead of long video lectures. Each lesson builds on the last, with interactive exercises and immediate feedback so concepts actually stay.",
  b1: "Interactive exercises with real-time feedback",
  b2: "Track progress with XP and badges as you advance",
};
const [aBadgeAt, aL1At, aL2At, aParaAt, aB1At, aB2At] = typingSchedule([
  [FEAT_A.badge, 16],
  [FEAT_A.l1, 40],
  [FEAT_A.l2, 40],
  [FEAT_A.para, 6],
  [FEAT_A.b1, 9],
  [FEAT_A.b2, 9],
]);

const FEAT_B = {
  badge: "Real Coding Exercises",
  l1: "Write Real Code.",
  l2: "Not Just Syntax.",
  para: "Put your knowledge to the test in a built-in, browser-based coding sandbox. Solve real challenges, debug your own solutions, and get instant guidance from Planky whenever you get stuck.",
  b1: "Full Pyodide in-browser Python execution",
  b2: "AI code review and tailored debugging hints",
};
const [bBadgeAt, bL1At, bL2At, bParaAt, bB1At, bB2At] = typingSchedule([
  [FEAT_B.badge, 16],
  [FEAT_B.l1, 40],
  [FEAT_B.l2, 40],
  [FEAT_B.para, 6],
  [FEAT_B.b1, 9],
  [FEAT_B.b2, 9],
]);

const FEAT_C = {
  badge: "Habit Building",
  l1: "Build Unstoppable",
  l2: "Daily Streaks.",
  para: "Consistency is key to mastering programming. Track your daily streak and review your activity heatmap to build a steady learning habit that lasts.",
  b1: "Activity heatmap that visualizes your progress",
  b2: "Daily streaks that keep you accountable",
};
const [cBadgeAt, cL1At, cL2At, cParaAt, cB1At, cB2At] = typingSchedule([
  [FEAT_C.badge, 16],
  [FEAT_C.l1, 40],
  [FEAT_C.l2, 40],
  [FEAT_C.para, 6],
  [FEAT_C.b1, 9],
  [FEAT_C.b2, 9],
]);

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
      <CyberGrid />
      <AmbientOrbs />

      {/* 1. Floating Glass Capsule Navbar */}
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <header
          className={clsx(
            "pointer-events-auto transition-all duration-500 flex items-center justify-between gap-6 sm:gap-12 px-6 py-3 rounded-full border shadow-2xl backdrop-blur-xl",
            scrolled
              ? "bg-[#0E1118]/85 border-yellow-400/30 shadow-[0_10px_35px_rgba(0,0,0,0.8)] scale-100"
              : "bg-[#0E1118]/60 border-white/10 shadow-[0_10px_25px_rgba(0,0,0,0.5)] scale-[0.99]"
          )}
        >
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center shadow-[0_0_15px_rgba(250,204,21,0.4)] group-hover:scale-110 transition-transform">
              <svg viewBox="0 0 100 100" className="w-5 h-5">
                <path d="M 35 35 L 50 50 L 35 65" fill="transparent" stroke="#171717" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="55" y1="65" x2="70" y2="65" stroke="#171717" strokeWidth="8" strokeLinecap="round" />
              </svg>
            </div>
            <span className="font-extrabold text-lg tracking-tight text-white group-hover:text-yellow-400 transition-colors">
              Plankthon
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-300">
            <a href="#features" onClick={scrollToSection("features")} className="hover:text-yellow-400 px-3 py-1 rounded-full hover:bg-white/5 transition-all">Features</a>
            <a href="#exercise" onClick={scrollToSection("exercise")} className="hover:text-yellow-400 px-3 py-1 rounded-full hover:bg-white/5 transition-all">Interactive IDE</a>
            <a href="#about" onClick={scrollToSection("about")} className="hover:text-yellow-400 px-3 py-1 rounded-full hover:bg-white/5 transition-all">Team</a>
          </nav>

          <Link
            href="/auth"
            className="px-5 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 text-black font-bold text-xs sm:text-sm hover:from-yellow-300 hover:to-amber-300 transition-all hover:shadow-[0_0_20px_rgba(250,204,21,0.6)] active:scale-95"
          >
            Start learning free
          </Link>
        </header>
      </div>

      {/* 2. Full-Screen Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16 overflow-hidden">
        {/* Soft cosmic focal glow to anchor the hero */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] max-w-[140vw] max-h-[140vw] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 45%, rgba(250,204,21,0.18) 0%, rgba(56,189,248,0.08) 35%, rgba(168,85,247,0.03) 65%, transparent 80%)" }}
        />

        {/* Drifting particle field */}
        <HeroParticles />

        {/* 3D logo — massive and impressive per user request */}
        <LazyScene
          scale={1.45}
          rootRef={scrollRef}
          className="absolute inset-0 w-full h-full pointer-events-auto opacity-90"
        />

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center pointer-events-none mt-12 md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            <ShimmerBadge icon={<Sparkles className="w-4 h-4 text-yellow-400" />}>
              <Typewriter text={HERO.badge} rootRef={scrollRef} startDelay={heroBadgeAt + 200} speed={14} />
            </ShimmerBadge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.02] mb-6 font-sans drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
          >
            <Typewriter text={HERO.l1} rootRef={scrollRef} startDelay={heroL1At + 200} speed={55} />{" "}
            <br className="hidden sm:inline" />
            <Typewriter
              text={HERO.l2}
              rootRef={scrollRef}
              startDelay={heroL2At + 200}
              speed={55}
              className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_8px_50px_rgba(250,204,21,0.4)]"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 font-normal leading-relaxed drop-shadow-md"
          >
            <Typewriter text={HERO.sub} rootRef={scrollRef} startDelay={heroSubAt + 200} speed={8} />
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto"
          >
            <ShimmerButton href="/auth" className="w-full sm:w-auto">
              <span>Start Learning Free</span>
              <ChevronRight className="w-5 h-5 stroke-[3] group-hover:translate-x-1 transition-transform" />
            </ShimmerButton>
            <a
              href="#features"
              onClick={scrollToSection("features")}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-base sm:text-lg border border-white/10 hover:border-yellow-400/40 transition-all duration-300 backdrop-blur-md flex items-center justify-center hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(250,204,21,0.2)]"
            >
              Explore Curriculum
            </a>
          </motion.div>
        </div>
      </section>

      {/* 3. Stat Bar / Logo Bar */}
      <section className="w-full py-12 relative z-10">
        <div className="max-w-2xl mx-auto px-6 grid grid-cols-2 gap-6">
          <SpotlightCard className="p-6 text-center shadow-xl hover:shadow-[0_15px_40px_rgba(250,204,21,0.15)] transition-all duration-500 hover:-translate-y-1">
            <div className="text-4xl font-black text-yellow-400 font-mono drop-shadow-[0_0_15px_rgba(250,204,21,0.4)]">
              <CountUp target={100} suffix="%" duration={2600} rootRef={scrollRef} />
            </div>
            <div className="text-sm text-gray-300 mt-2 font-semibold">Runs in browser</div>
            <div className="text-xs text-gray-500 mt-0.5">Zero installation needed</div>
          </SpotlightCard>

          <SpotlightCard className="p-6 text-center shadow-xl hover:shadow-[0_15px_40px_rgba(168,85,247,0.15)] transition-all duration-500 hover:-translate-y-1">
            <div className="text-4xl font-black text-purple-400 font-mono drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
              {userCount === null ? "—" : <CountUp target={userCount} duration={2600} rootRef={scrollRef} />}
            </div>
            <div className="text-sm text-gray-300 mt-2 font-semibold">Registered learners</div>
            <div className="text-xs text-gray-500 mt-0.5">Growing community</div>
          </SpotlightCard>
        </div>
      </section>

      {/* 4. Feature Showcase Sections */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-32 space-y-32 relative z-10">
        {/* Feature 1: Gamified lessons (Left text, Right mockup) */}
        <Reveal
          rootRef={scrollRef}
          y={60}
          margin="-100px"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <div className="inline-block">
              <ShimmerBadge icon={<Sparkles className="w-3.5 h-3.5" />}>
                <Typewriter text={FEAT_A.badge} rootRef={scrollRef} startDelay={aBadgeAt} speed={16} />
              </ShimmerBadge>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              <Typewriter text={FEAT_A.l1} rootRef={scrollRef} startDelay={aL1At} speed={40} /> <br />
              <Typewriter text={FEAT_A.l2} rootRef={scrollRef} startDelay={aL2At} speed={40} className="text-yellow-400" />
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              <Typewriter text={FEAT_A.para} rootRef={scrollRef} startDelay={aParaAt} speed={6} />
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 text-xs">✓</div>
                <Typewriter text={FEAT_A.b1} rootRef={scrollRef} startDelay={aB1At} speed={9} />
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 text-xs">✓</div>
                <Typewriter text={FEAT_A.b2} rootRef={scrollRef} startDelay={aB2At} speed={9} />
              </li>
            </ul>
          </div>
          {/* App Screenshot: Lesson UI */}
          <SpotlightCard className="w-full shadow-2xl hover:shadow-[0_25px_60px_-15px_rgba(250,204,21,0.25)] transition-all duration-700 hover:-translate-y-2">
            <div className="w-full relative group overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
              <Image
                src="/screenshots/lessons-v2.png"
                alt="Plankthon lesson screen showing an interactive Python exercise"
                width={1040}
                height={900}
                className="w-full h-auto rounded-2xl transition-transform duration-700 group-hover:scale-[1.01]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </SpotlightCard>
        </Reveal>

        {/* Feature 2: Quest/challenge system (Left mockup, Right text) */}
        <Reveal
          rootRef={scrollRef}
          y={60}
          margin="-100px"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          {/* App Screenshot: Coding Sandbox */}
          <SpotlightCard className="w-full shadow-2xl hover:shadow-[0_25px_60px_-15px_rgba(250,204,21,0.25)] transition-all duration-700 hover:-translate-y-2 order-2 lg:order-1">
            <div className="w-full relative group overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
              <Image
                src="/screenshots/coding-v2.png"
                alt="Plankthon browser-based Python coding sandbox with live output"
                width={640}
                height={730}
                className="w-full h-auto rounded-2xl transition-transform duration-700 group-hover:scale-[1.01]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </SpotlightCard>
          <div className="space-y-6 order-1 lg:order-2">
            <div className="inline-block">
              <ShimmerBadge icon={<Code className="w-3.5 h-3.5" />}>
                <Typewriter text={FEAT_B.badge} rootRef={scrollRef} startDelay={bBadgeAt} speed={16} />
              </ShimmerBadge>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              <Typewriter text={FEAT_B.l1} rootRef={scrollRef} startDelay={bL1At} speed={40} /> <br />
              <Typewriter text={FEAT_B.l2} rootRef={scrollRef} startDelay={bL2At} speed={40} className="text-yellow-400" />
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              <Typewriter text={FEAT_B.para} rootRef={scrollRef} startDelay={bParaAt} speed={6} />
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 text-xs">✓</div>
                <Typewriter text={FEAT_B.b1} rootRef={scrollRef} startDelay={bB1At} speed={9} />
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 text-xs">✓</div>
                <Typewriter text={FEAT_B.b2} rootRef={scrollRef} startDelay={bB2At} speed={9} />
              </li>
            </ul>
          </div>
        </Reveal>

        {/* Feature 3: Streak system (Left text, Right mockup) */}
        <Reveal
          rootRef={scrollRef}
          y={60}
          margin="-100px"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="space-y-6">
            <div className="inline-block">
              <ShimmerBadge icon={<Flame className="w-3.5 h-3.5" />}>
                <Typewriter text={FEAT_C.badge} rootRef={scrollRef} startDelay={cBadgeAt} speed={16} />
              </ShimmerBadge>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              <Typewriter text={FEAT_C.l1} rootRef={scrollRef} startDelay={cL1At} speed={40} /> <br />
              <Typewriter text={FEAT_C.l2} rootRef={scrollRef} startDelay={cL2At} speed={40} className="text-yellow-400" />
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              <Typewriter text={FEAT_C.para} rootRef={scrollRef} startDelay={cParaAt} speed={6} />
            </p>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 text-xs">✓</div>
                <Typewriter text={FEAT_C.b1} rootRef={scrollRef} startDelay={cB1At} speed={9} />
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-yellow-400/20 flex items-center justify-center text-yellow-400 text-xs">✓</div>
                <Typewriter text={FEAT_C.b2} rootRef={scrollRef} startDelay={cB2At} speed={9} />
              </li>
            </ul>
          </div>
          {/* App Screenshot: Streak Dashboard */}
          <SpotlightCard className="w-full shadow-2xl hover:shadow-[0_25px_60px_-15px_rgba(250,204,21,0.25)] transition-all duration-700 hover:-translate-y-2">
            <div className="w-full relative group overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 pointer-events-none" />
              <Image
                src="/screenshots/streak-v2.png"
                alt="Plankthon home dashboard showing daily streaks and an activity heatmap"
                width={740}
                height={441}
                className="w-full h-auto rounded-2xl transition-transform duration-700 group-hover:scale-[1.01]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </SpotlightCard>
        </Reveal>
      </section>

      {/* 5. Interactive Code Sample Section */}
      <section id="exercise" className="w-full py-28 bg-[#0E1118] border-t border-white/10 relative z-10 px-6">
        <div className="max-w-5xl mx-auto space-y-12">
          <Reveal rootRef={scrollRef} className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              <Typewriter text="Test Drive Your First" rootRef={scrollRef} speed={35} />{" "}
              <Typewriter text="Python Script" rootRef={scrollRef} startDelay={700} speed={40} className="text-yellow-400" />
            </h2>
            <p className="text-gray-400 text-lg">
              <Typewriter text="Watch code type out live, or take over the terminal and execute it directly in your browser." rootRef={scrollRef} startDelay={1200} speed={10} />
            </p>
          </Reveal>

          <SpotlightCard className="w-full shadow-2xl">
            <div className="relative">
              <TerminalMockup rootRef={scrollRef} />
            </div>
          </SpotlightCard>
        </div>
      </section>


      {/* 7. Development Team / About Section */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-24 relative z-10 border-t border-white/5">
        <Reveal rootRef={scrollRef} className="text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            <Typewriter text="Meet the Team Behind Plankthon" rootRef={scrollRef} speed={40} />
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            <Typewriter text="Dedicated to making coding accessible, interactive, and joyful for everyone." rootRef={scrollRef} startDelay={1000} speed={12} />
          </p>
        </Reveal>
        <TeamMotionCarousel />
      </section>

      {/* 8. Full-Screen Final CTA Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center px-6 py-32 overflow-hidden border-t border-white/10 bg-[#07090E]">
        {/* Lightweight CSS atmosphere (no second WebGL context, to keep memory
            low). A soft focal glow plus a drifting particle field. */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] max-w-[130vw] max-h-[130vw] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 50%, rgba(250,204,21,0.14) 0%, rgba(56,189,248,0.06) 40%, transparent 72%)" }}
        />
        <HeroParticles />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 pointer-events-none">
          <Reveal rootRef={scrollRef}>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
              <Typewriter text="Ready to Dive Into" rootRef={scrollRef} speed={45} /> <br />
              <Typewriter
                text="Your Python Journey?"
                rootRef={scrollRef}
                startDelay={800}
                speed={45}
                className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent"
              />
            </h2>
          </Reveal>
          <Reveal rootRef={scrollRef} delay={0.12}>
            <p className="text-lg sm:text-2xl text-gray-300 max-w-xl mx-auto">
              <Typewriter text="No setup and no installation. Create a free account and start writing Python in your browser in under a minute." rootRef={scrollRef} startDelay={1600} speed={10} />
            </p>
          </Reveal>
          <div className="pt-4 pointer-events-auto">
            <ShimmerButton href="/auth">
              <span>Start Learning Free</span>
              <ChevronRight className="w-6 h-6 stroke-[3]" />
            </ShimmerButton>
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

      {/* 10. Floating Glowing Back-to-Top Orb */}
      <button
        onClick={() => {
          scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
        }}
        aria-label="Back to top"
        className={clsx(
          "fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-tr from-yellow-400 via-amber-400 to-yellow-300 text-black shadow-[0_0_30px_rgba(250,204,21,0.6)] hover:shadow-[0_0_50px_rgba(250,204,21,0.9)] transition-all duration-500 flex items-center justify-center hover:scale-110 active:scale-95 group",
          scrolled ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-12 pointer-events-none"
        )}
      >
        <ArrowDown className="w-6 h-6 stroke-[3] rotate-180 group-hover:-translate-y-0.5 transition-transform" />
      </button>
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
