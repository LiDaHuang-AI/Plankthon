"use client";

export type SoundKind = "correct" | "wrong" | "complete" | "run" | "error" | "reply";

let audioCtx: AudioContext | null = null;

// Module-level flag kept in sync with settings
let soundEnabled = true;

export function setSoundEnabled(enabled: boolean) {
  soundEnabled = enabled;
}

function getAudioContext() {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    try {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      return null;
    }
  }
  return audioCtx;
}

export function playSound(kind: SoundKind) {
  if (typeof window === "undefined") return;
  
  // If not enabled or if we're not in the browser, no-op
  if (!soundEnabled) {
    // Try to fallback to reading local storage just in case the flag wasn't synced
    try {
      const saved = localStorage.getItem("plankthon");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.settings && parsed.settings.sound === false) {
          return;
        }
      }
    } catch (e) {
      // Ignore
    }
  }

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    const now = ctx.currentTime;
    
    // Default duration
    let duration = 0.5;

    switch (kind) {
      case "correct":
        // Pleasant ascending chime
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.2); // G5
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.2, now + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        duration = 0.5;
        break;

      case "wrong":
        // Gentle low descending thud
        osc.type = "triangle";
        osc.frequency.setValueAtTime(311.13, now); // Eb4
        osc.frequency.exponentialRampToValueAtTime(261.63, now + 0.2); // C4
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.15, now + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        duration = 0.4;
        break;

      case "complete":
        // Triumphant arpeggio
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        osc.frequency.setValueAtTime(1046.50, now + 0.3); // C6
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.2, now + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.8);
        duration = 0.8;
        break;

      case "run":
        // Quick subtle blip
        osc.type = "sine";
        osc.frequency.setValueAtTime(880, now); // A5
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.05, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        duration = 0.1;
        break;

      case "error":
        // Short harsh buzz
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(155.56, now); // Eb3
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.1, now + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        duration = 0.3;
        break;

      case "reply":
        // Soft pop
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
        gainNode.gain.setValueAtTime(0, now);
        gainNode.gain.linearRampToValueAtTime(0.1, now + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        duration = 0.15;
        break;
    }

    osc.start(now);
    osc.stop(now + duration);
  } catch (e) {
    // Silently ignore audio errors to prevent crashing
  }
}
