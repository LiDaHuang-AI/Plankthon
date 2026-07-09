"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

/**
 * 1. SpotlightCard:
 * A card that tracks mouse movement and projects a glowing golden spotlight
 * onto its border and inner background, identical to Google Antigravity cards.
 */
export function SpotlightCard({
  children,
  className,
  glowColor = "rgba(250, 204, 33, 0.25)",
  borderGlowColor = "rgba(250, 204, 33, 0.6)",
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  borderGlowColor?: string;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={clsx(
        "relative rounded-3xl p-[1px] overflow-hidden transition-all duration-300",
        className
      )}
    >
      {/* Dynamic mouse-tracking border glow */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 rounded-3xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, ${borderGlowColor}, transparent 40%)`,
        }}
      />

      {/* Default subtle border when not hovered */}
      <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />

      {/* Inner card container */}
      <div className="relative z-10 h-full w-full rounded-[23px] bg-[#0E1118]/90 backdrop-blur-xl overflow-hidden p-8 sm:p-10 flex flex-col justify-between">
        {/* Dynamic mouse-tracking inner background glow */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 50%)`,
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  );
}

/**
 * 2. ShimmerBadge:
 * A sleek pill badge with an animated shimmering border that continuously
 * sweeps light around it.
 */
export function ShimmerBadge({
  children,
  className,
  icon,
}: {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-yellow-300 text-xs md:text-sm font-semibold mb-6 overflow-hidden group shadow-[0_0_25px_rgba(250,204,21,0.2)]",
        className
      )}
    >
      {/* Animated gradient rotating border */}
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500/20 via-yellow-400/80 to-amber-500/20 p-[1px] animate-pulse pointer-events-none">
        <span className="absolute inset-0 rounded-full bg-[#0E1118]/95 backdrop-blur-md" />
      </span>

      {/* Shimmer sweep effect */}
      <motion.div
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent -skew-x-12 pointer-events-none"
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && <span className="text-yellow-400 animate-pulse">{icon}</span>}
        {children}
      </span>
    </div>
  );
}

/**
 * 3. ShimmerButton:
 * A high-impact CTA button with animated shine sweep, glassmorphism,
 * and magnetic hover elevation.
 */
export function ShimmerButton({
  children,
  href,
  onClick,
  className,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const content = (
    <span
      className={clsx(
        "relative inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 text-black font-black text-base sm:text-lg transition-all duration-300 shadow-[0_0_35px_rgba(250,204,21,0.5)] hover:shadow-[0_0_70px_rgba(250,204,21,0.9)] hover:-translate-y-1 active:translate-y-0 overflow-hidden group cursor-pointer",
        className
      )}
    >
      {/* Continuous shine sweep across button */}
      <motion.span
        animate={{ left: ["-100%", "200%"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
        className="absolute top-0 bottom-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent -skew-x-[25deg] pointer-events-none z-10"
      />
      <span className="relative z-20 flex items-center gap-2">{children}</span>
    </span>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }
  return <button onClick={onClick} className="border-none bg-transparent p-0">{content}</button>;
}

/**
 * 4. CyberGrid:
 * A futuristic perspective grid floor that sits in the background of sections,
 * adding deep atmospheric space perspective.
 */
export function CyberGrid({ className }: { className?: string }) {
  return (
    <div
      className={clsx(
        "absolute inset-0 pointer-events-none overflow-hidden opacity-30 select-none",
        className
      )}
    >
      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(250, 204, 33, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(250, 204, 33, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 80%)",
        }}
      />
      {/* Horizon glow */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-yellow-500/10 to-transparent blur-3xl" />
    </div>
  );
}

/**
 * 5. AmbientOrbs:
 * Soft floating light orbs that drift in the background between sections,
 * bridging section transitions smoothly.
 */
export function AmbientOrbs() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -40, 40, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-yellow-500/10 blur-[130px]"
      />
      <motion.div
        animate={{
          x: [0, -60, 60, 0],
          y: [0, 50, -30, 0],
          scale: [1, 1.1, 0.85, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-2/3 -right-32 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-[150px]"
      />
      <motion.div
        animate={{
          x: [0, 40, -40, 0],
          y: [0, 30, -50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 left-1/3 w-80 h-80 rounded-full bg-cyan-500/5 blur-[120px]"
      />
    </div>
  );
}

/**
 * 6. GlowingTrailCursor:
 * A custom glowing ring cursor that smoothly follows the user's mouse across the landing page.
 */
export function GlowingTrailCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);

  React.useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsHovering(!!target?.closest("button, a, input, [role='button'], [data-magnetic]"));
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      <motion.div
        animate={{
          x: pos.x - (isHovering ? 24 : 12),
          y: pos.y - (isHovering ? 24 : 12),
          scale: isHovering ? 1.6 : 1,
          opacity: pos.x === -100 ? 0 : 0.8,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 350, mass: 0.5 }}
        className={clsx(
          "absolute rounded-full border border-yellow-400/60 backdrop-blur-[1px] transition-colors",
          isHovering ? "w-12 h-12 bg-yellow-400/10 border-yellow-300" : "w-6 h-6 bg-transparent"
        )}
      />
      <motion.div
        animate={{
          x: pos.x - 3,
          y: pos.y - 3,
          opacity: pos.x === -100 ? 0 : 1,
        }}
        transition={{ type: "spring", damping: 35, stiffness: 800, mass: 0.1 }}
        className="absolute w-1.5 h-1.5 rounded-full bg-yellow-300 shadow-[0_0_8px_#FACC15]"
      />
    </div>
  );
}

/**
 * 7. MagneticButton:
 * Pulls the button toward the cursor when hovering nearby, simulating gravity.
 */
export function MagneticButton({
  children,
  className,
  onClick,
  strength = 0.3,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    setOffset({ x: dx * strength, y: dy * strength });
  };

  const handleMouseLeave = () => {
    setOffset({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      data-magnetic
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", damping: 15, stiffness: 150, mass: 0.1 }}
      className={clsx("inline-block cursor-pointer", className)}
    >
      {children}
    </motion.div>
  );
}

/**
 * 8. ScrollWordReveal:
 * Reveals text word-by-word with a glowing golden transition as it scrolls into view.
 */
export function ScrollWordReveal({
  text,
  className,
  rootRef,
}: {
  text: string;
  className?: string;
  rootRef?: React.RefObject<HTMLElement | null>;
}) {
  const words = text.split(" ");
  return (
    <span className={clsx("inline-flex flex-wrap gap-x-2", className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0.15, y: 10, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px", root: rootRef }}
          transition={{ duration: 0.4, delay: i * 0.04, ease: "easeOut" }}
          className="inline-block transition-colors hover:text-yellow-300 hover:drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/**
 * 9. BorderBeamCard:
 * Bento box card with a sleek animated light beam rotating around its border.
 */
export function BorderBeamCard({
  children,
  className,
  duration = 8,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}) {
  return (
    <div
      className={clsx(
        "relative rounded-3xl overflow-hidden bg-[#0E1118]/90 border border-white/10 p-6 shadow-2xl backdrop-blur-xl group",
        className
      )}
    >
      {/* Rotating border beam */}
      <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-[100%] bg-[conic-gradient(from_0deg,transparent_0_300deg,#FACC15_330deg,#38BDF8_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>
      <div className="absolute inset-[1px] rounded-[23px] bg-[#0E1118] pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/**
 * 10. CyberAudioToggle:
 * Web Audio API synthesized sci-fi UI sound effects toggle for a futuristic OS experience.
 */
export function CyberAudioToggle() {
  const [enabled, setEnabled] = useState(false);

  const playClick = () => {
    if (!enabled) return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // AudioContext blocked or unsupported
    }
  };

  React.useEffect(() => {
    if (!enabled) return;
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target?.closest("button, a, [role='button']")) {
        try {
          const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.frequency.setValueAtTime(1200, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.04);
          gain.gain.setValueAtTime(0.03, ctx.currentTime);
          gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.04);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 0.04);
        } catch {}
      }
    };
    window.addEventListener("mouseover", handleHover);
    window.addEventListener("click", playClick);
    return () => {
      window.removeEventListener("mouseover", handleHover);
      window.removeEventListener("click", playClick);
    };
  }, [enabled]);

  return (
    <button
      onClick={() => setEnabled(!enabled)}
      title={enabled ? "Mute Sci-Fi UI Sounds" : "Enable Sci-Fi UI Sounds"}
      className={clsx(
        "fixed bottom-8 left-8 z-50 px-4 py-2.5 rounded-full border text-xs font-mono font-bold flex items-center gap-2 shadow-xl backdrop-blur-md transition-all duration-300 active:scale-95",
        enabled
          ? "bg-yellow-400/20 border-yellow-400 text-yellow-300 shadow-[0_0_20px_rgba(250,204,21,0.4)]"
          : "bg-[#0E1118]/80 border-white/10 text-gray-400 hover:text-white hover:border-white/25"
      )}
    >
      <span className={clsx("w-2 h-2 rounded-full", enabled ? "bg-yellow-400 animate-ping" : "bg-gray-500")} />
      <span>{enabled ? "AUDIO: ON" : "AUDIO: OFF"}</span>
    </button>
  );
}
