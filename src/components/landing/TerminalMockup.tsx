"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { keymap } from "@codemirror/view";
import { Prec } from "@codemirror/state";
import { Terminal as TerminalIcon, Play, Square, RotateCcw } from "lucide-react";
import { usePyodide } from "@/lib/pyodide/client";
import { Terminal } from "@/components/ui/Terminal";

const DEFAULT_CODE = `# Welcome to Plankthon. Edit this code and press Run.

def greet(name):
    return f"Hello, {name}! Welcome to Plankthon."

print(greet("Planky"))
`;

type Line = { text: string; type?: "default" | "error" | "success" | "command" };

function Chrome({
  actions,
  children,
}: {
  actions: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl overflow-hidden border border-white/10 bg-[#0E1117] shadow-2xl">
      {/* Title bar */}
      <div className="flex items-center justify-between gap-2 px-3 sm:px-4 py-3 bg-[#161B22] border-b border-white/10">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-3 h-3 rounded-full bg-red-500/80 flex-shrink-0" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 flex-shrink-0" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 flex-shrink-0" />
          <span className="ml-2 text-xs text-gray-400 font-mono flex items-center gap-1.5 min-w-0">
            <TerminalIcon className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
            <span className="truncate">exercise_01.py</span>
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">{actions}</div>
      </div>
      {children}
    </div>
  );
}

// The real, runnable editor. Loads Pyodide via the shared worker (same engine
// the in-app coding sandbox uses), so visitors can edit the code and actually
// execute Python — including input() — right on the landing page.
function LiveEditor() {
  const [code, setCode] = useState("");
  const [lines, setLines] = useState<Line[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [autoTyping, setAutoTyping] = useState(true);

  const { isReady, runCode, submitInput, stop } = usePyodide();
  const runRef = useRef<() => void>(() => {});
  const cancelAutoTypeRef = useRef<() => void>(() => {});

  // Type the starter code out character-by-character when the editor first
  // appears (the section copy promises "watch code type out live"). Reset
  // cancels it; the editor is read-only until typing finishes.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCode(DEFAULT_CODE);
      setAutoTyping(false);
      return;
    }
    let cancelled = false;
    let i = 0;
    let t: ReturnType<typeof setTimeout>;
    const finish = () => {
      cancelled = true;
      setCode(DEFAULT_CODE);
      setAutoTyping(false);
    };
    cancelAutoTypeRef.current = finish;
    const tick = () => {
      if (cancelled) return;
      i = Math.min(DEFAULT_CODE.length, i + 2);
      setCode(DEFAULT_CODE.slice(0, i));
      if (i < DEFAULT_CODE.length) {
        t = setTimeout(tick, 20);
      } else {
        setAutoTyping(false);
      }
    };
    t = setTimeout(tick, 400);
    return () => {
      cancelled = true;
      clearTimeout(t);
    };
  }, []);

  const handleRun = async () => {
    if (!isReady || isRunning) return;
    setIsRunning(true);
    setIsTyping(true);
    setWaitingForInput(false);
    setLines([{ text: "python exercise_01.py", type: "command" }]);
    try {
      await runCode(
        code,
        undefined,
        (text) => setLines((prev) => [...prev, { text: text.trimEnd() }]),
        () => {
          setIsTyping(false);
          setWaitingForInput(true);
        }
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      setLines((prev) => [
        ...prev,
        { text: msg === "__STOPPED__" ? "Stopped" : msg, type: "error" },
      ]);
    } finally {
      setIsTyping(false);
      setWaitingForInput(false);
      setIsRunning(false);
    }
  };
  runRef.current = handleRun;

  const handleInputSubmit = (val: string) => {
    setLines((prev) => [...prev, { text: val }]);
    submitInput(val);
    setWaitingForInput(false);
    setIsTyping(true);
  };

  const extensions = useMemo(
    () => [
      python(),
      Prec.highest(
        keymap.of([{ key: "Mod-Enter", run: () => { runRef.current(); return true; } }])
      ),
    ],
    []
  );

  const actions = (
    <>
      <button
        onClick={() => { cancelAutoTypeRef.current(); setCode(DEFAULT_CODE); setLines([]); }}
        className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
      >
        <RotateCcw className="w-3.5 h-3.5" /> Reset
      </button>
      {isRunning ? (
        <button
          onClick={stop}
          className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-red-500 text-white hover:opacity-90 transition-opacity"
        >
          <Square className="w-3.5 h-3.5 fill-current" /> Stop
        </button>
      ) : (
        <button
          onClick={handleRun}
          disabled={!isReady || autoTyping}
          className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-yellow-400 text-black hover:bg-yellow-300 transition-colors disabled:opacity-60"
        >
          <Play className="w-3.5 h-3.5 fill-current" /> {isReady ? "Run" : "Loading..."}
        </button>
      )}
    </>
  );

  return (
    <Chrome actions={actions}>
      <div className="text-[13px] font-mono">
        <CodeMirror
          value={code}
          onChange={(v) => setCode(v)}
          height="240px"
          theme={oneDark}
          readOnly={autoTyping}
          extensions={extensions}
          basicSetup={{ highlightActiveLine: false, autocompletion: true, foldGutter: false }}
        />
      </div>
      <div className="h-48 border-t border-white/10">
        <Terminal
          lines={lines}
          isTyping={isTyping}
          waitingForInput={waitingForInput}
          onInputSubmit={handleInputSubmit}
        />
      </div>
    </Chrome>
  );
}

export function TerminalMockup({
  rootRef,
}: {
  rootRef?: React.RefObject<HTMLElement | null>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  // Defer loading Pyodide (several MB) until the editor is near the viewport,
  // so it never slows the top of the landing page. The page scrolls inside a
  // container, so observe against that root when provided.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { root: rootRef?.current ?? null, rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootRef]);

  const skeletonActions = (
    <button
      disabled
      className="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-yellow-400/60 text-black"
    >
      <Play className="w-3.5 h-3.5 fill-current" /> Loading...
    </button>
  );

  return (
    <div ref={ref}>
      {active ? (
        <LiveEditor />
      ) : (
        <Chrome actions={skeletonActions}>
          {/* Empty editor area — the live editor types the code out once it
              activates, so showing the full code here would flash. */}
          <div className="h-[240px] bg-[#0B0F16]/60" />
          <div className="h-48 border-t border-white/10 bg-[#0B0F16]" />
        </Chrome>
      )}
    </div>
  );
}
