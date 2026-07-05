"use client";

import React, { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowDown, Sparkles, Flame, Code, ChevronRight, Globe, Mail, Shield } from "lucide-react";
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400/10 border border-yellow-400/20 text-yellow-300 text-xs md:text-sm font-semibold mb-6 backdrop-blur-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span>Learn Python interactively with Planky</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.02] mb-6 font-sans"
          >
            Master Python <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_8px_40px_rgba(250,204,21,0.35)]">
              One Line at a Time.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg sm:text-2xl text-gray-300 max-w-2xl mx-auto mb-10 font-normal leading-relaxed"
          >
            Interactive, bite-sized lessons and real coding challenges, with Planky, your AI mentor, guiding you at every step.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
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
            <div className="text-3xl lg:text-4xl font-extrabold text-yellow-400 font-mono">100%</div>
            <div className="text-sm text-gray-400 mt-1 font-medium">Runs in your browser</div>
          </div>
          <div>
            <div className="text-3xl lg:text-4xl font-extrabold text-white font-mono">
              {userCount === null ? "—" : userCount.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400 mt-1 font-medium">Registered learners</div>
          </div>
        </div>
      </section>

      {/* 4. Feature Showcase Sections */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-32 space-y-32 relative z-10">
        {/* Feature 1: Gamified lessons (Left text, Right mockup) */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px", root: scrollRef }}
          transition={{ duration: 0.8 }}
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
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px", root: scrollRef }}
          transition={{ duration: 0.8 }}
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
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px", root: scrollRef }}
          transition={{ duration: 0.8 }}
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
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Test Drive Your First <span className="text-yellow-400">Python Script</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Watch code type out live, or take over the terminal and execute it directly in your browser.
            </p>
          </div>

          <TerminalMockup rootRef={scrollRef} />
        </div>
      </section>

      {/* 6. Testimonial / Social Proof Section (Empty for now) */}
      <section className="max-w-7xl mx-auto px-6 py-28 text-center space-y-8 relative z-10 border-t border-white/5">
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Loved by Future Developers</h2>
          <p className="text-gray-400 max-w-xl mx-auto">[TODO: Testimonial & Social proof cards to be added here soon]</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto opacity-50">
          {[1, 2, 3].map((item) => (
            <div key={item} className="p-6 rounded-2xl bg-white/5 border border-white/10 min-h-[160px] flex items-center justify-center">
              <span className="text-sm font-mono text-gray-500">[Placeholder Testimonial Card {item}]</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Development Team / About Section */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-24 text-center space-y-12 relative z-10 border-t border-white/5">
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Meet the Team Behind Plankthon</h2>
          <p className="text-gray-400 max-w-xl mx-auto">Dedicated to making coding accessible, interactive, and joyful for everyone.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[1, 2, 3, 4].map((member) => (
            <div key={member} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-4 hover:border-yellow-400/40 transition-all">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-yellow-400/20 to-white/10 border border-white/10 flex items-center justify-center font-mono text-xl font-bold text-yellow-400">
                T{member}
              </div>
              <div>
                <h3 className="font-bold text-white">[TODO: Name {member}]</h3>
                <p className="text-xs text-yellow-400 font-medium mt-0.5">[TODO: Role]</p>
              </div>
              <div className="flex items-center gap-3 text-gray-400 text-xs font-mono pt-2 border-t border-white/10 w-full justify-center">
                <span>[Social Links TODO]</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Full-Screen Final CTA Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center px-6 py-32 overflow-hidden border-t border-white/10 bg-[#07090E]">
        {/* Secondary 3D Scene in Background */}
        <LazyScene scale={1.4} rootRef={scrollRef} className="absolute inset-0 w-full h-full pointer-events-auto opacity-70" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8 pointer-events-none">
          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
            Ready to Dive Into <br />
            <span className="bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Your Python Journey?
            </span>
          </h2>
          <p className="text-lg sm:text-2xl text-gray-300 max-w-xl mx-auto">
            No setup and no installation. Create a free account and start writing Python in your browser in under a minute.
          </p>
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
