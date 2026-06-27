"use client";

import { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { Terminal } from "@/components/ui/Terminal";
import { usePyodide } from "@/lib/pyodide/client";
import { Play, Square, Trash2, FileCode, RotateCcw, Wand2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "../../ClientProvider";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { keymap, EditorView } from "@codemirror/view";
import { Prec } from "@codemirror/state";
import { lintGutter, setDiagnostics, type Diagnostic } from "@codemirror/lint";

const DEFAULT_CODE = 'print("Hello, Planky!")\n';

function CodingSandboxContent() {
  const searchParams = useSearchParams();
  const { state, updateState } = useAppContext();

  const [code, setCode] = useState(state?.coding?.code || DEFAULT_CODE);
  const [terminalLines, setTerminalLines] = useState<{ text: string; type?: "default" | "error" | "success" | "command" }[]>(state?.coding?.terminalLines || []);
  const [isTyping, setIsTyping] = useState(false);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isFormatting, setIsFormatting] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const { isReady, runCode, submitInput, stop, format, lint } = usePyodide();

  // Autosave code (debounced) + persist terminal output
  useEffect(() => {
    const timeout = setTimeout(() => {
      updateState(prev => ({ ...prev, coding: { ...prev.coding, code } }));
    }, 500);
    return () => clearTimeout(timeout);
  }, [code, updateState]);

  useEffect(() => {
    updateState(prev => ({ ...prev, coding: { ...prev.coding, terminalLines } }));
  }, [terminalLines, updateState]);

  // Load code passed from Plank AI's "Insert"
  useEffect(() => {
    const qCode = searchParams.get("code");
    if (qCode) setCode(qCode);
  }, [searchParams]);

  // Follow the app's light/dark theme (toggled as a class on <html>)
  useEffect(() => {
    const el = document.documentElement;
    const update = () => setIsDark(el.classList.contains("dark"));
    update();
    const obs = new MutationObserver(update);
    obs.observe(el, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  const handleRun = async () => {
    if (!isReady || isRunning) return;
    setIsRunning(true);
    setIsTyping(true);
    setWaitingForInput(false);
    setTerminalLines([{ text: "python main.py", type: "command" }]);
    try {
      await runCode(
        code,
        (text) => {
          const trimmed = text.trim();
          if (trimmed === "I AM ADMIN") {
            updateState(s => ({ ...s, isAdmin: true }));
          } else if (trimmed === "I AM OUT") {
            updateState(s => ({ ...s, isAdmin: false }));
          }
          setTerminalLines(prev => [...prev, { text: text.trimEnd() }]);
        },
        () => {
          setIsTyping(false);
          setWaitingForInput(true);
        }
      );
    } catch (e: any) {
      if (e?.message === "__STOPPED__") {
        setTerminalLines(prev => [...prev, { text: "⛔ Stopped", type: "error" }]);
      } else {
        setTerminalLines(prev => [...prev, { text: e.message, type: "error" }]);
      }
    } finally {
      setIsTyping(false);
      setWaitingForInput(false);
      setIsRunning(false);
    }
  };

  const handleInputSubmit = (val: string) => {
    setTerminalLines(prev => [...prev, { text: val, type: "default" }]);
    submitInput(val);
    setWaitingForInput(false);
    setIsTyping(true);
  };

  const handleReset = () => {
    if (window.confirm("ล้างโค้ดในเอดิเตอร์กลับเป็นค่าเริ่มต้น?")) {
      setCode(DEFAULT_CODE);
    }
  };

  const handleFormat = async () => {
    if (!isReady || isFormatting || isRunning) return;
    setIsFormatting(true);
    try {
      const formatted = await format(code);
      setCode(formatted);
    } catch {
      setTerminalLines(prev => [...prev, { text: "⚠ จัดรูปแบบไม่ได้ — โค้ดมี syntax error", type: "error" }]);
    } finally {
      setIsFormatting(false);
    }
  };

  // CodeMirror view ref + latest handleRun/lint for the (stable) extensions
  const viewRef = useRef<EditorView | null>(null);
  const runRef = useRef(handleRun);
  runRef.current = handleRun;
  const lintRef = useRef(lint);
  lintRef.current = lint;

  const extensions = useMemo(
    () => [
      python(),
      lintGutter(),
      Prec.highest(
        keymap.of([{ key: "Mod-Enter", run: () => { runRef.current(); return true; } }])
      ),
    ],
    []
  );

  // Live linting with pyflakes (debounced) — drive diagnostics into the editor
  useEffect(() => {
    if (!isReady || isRunning) return;
    const t = setTimeout(async () => {
      if (!viewRef.current) return;
      let diags: { line: number; col: number; message: string; error?: boolean }[] = [];
      try {
        diags = await lintRef.current(code);
      } catch {
        return;
      }
      const v = viewRef.current;
      if (!v) return;
      const doc = v.state.doc;
      const mapped: Diagnostic[] = diags.map((d) => {
        const ln = Math.min(Math.max(d.line || 1, 1), doc.lines);
        const line = doc.line(ln);
        const from = Math.min(line.from + Math.max((d.col || 1) - 1, 0), line.to);
        return { from, to: line.to, severity: d.error ? "error" : "warning", message: d.message };
      });
      v.dispatch(setDiagnostics(v.state, mapped));
    }, 700);
    return () => clearTimeout(t);
  }, [code, isReady, isRunning]);

  const isMac = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);
  const runKbd = `${isMac ? "⌘" : "Ctrl"}+↵`;

  return (
    <div className="w-full h-full bg-bg p-3 md:p-4 grid grid-rows-[3fr_2fr] gap-4 overflow-hidden">

      {/* Editor Section */}
      <div className="bg-surface border border-border rounded-xl flex flex-col overflow-hidden min-h-0 shadow-xl ring-1 ring-white/5">

        {/* IDE-style Tab Bar */}
        <div className="flex items-center justify-between bg-bg border-b border-border pr-3">
          <div className="flex items-center gap-2 bg-surface px-4 py-2.5 border-r border-border text-sm font-medium text-text relative">
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent" />
            <FileCode className="w-4 h-4 text-accent" />
            main.py
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleFormat}
              disabled={!isReady || isFormatting || isRunning}
              title="จัดรูปแบบโค้ดด้วย Black"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-muted hover:text-text transition-colors disabled:opacity-40"
            >
              <Wand2 className="w-3.5 h-3.5" />
              {isFormatting ? "Formatting…" : "Format"}
            </button>
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-muted hover:text-text transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
            <button
              onClick={() => setTerminalLines([])}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-muted hover:text-text transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
            {isRunning ? (
              <button
                onClick={stop}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-c-danger text-white font-bold rounded hover:opacity-90 transition-opacity text-sm"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                Stop
              </button>
            ) : (
              <button
                onClick={handleRun}
                disabled={!isReady}
                className="flex items-center gap-1.5 px-4 py-1.5 bg-accent text-bg font-bold rounded hover:opacity-90 transition-opacity disabled:opacity-50 text-sm shadow-[0_0_10px_rgba(255,212,59,0.2)]"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {isReady ? "Run" : "Loading…"}
                {isReady && (
                  <span className="hidden sm:inline text-[10px] font-semibold opacity-70 ml-1 px-1.5 py-0.5 rounded bg-black/20">
                    {runKbd}
                  </span>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Editor Area (CodeMirror) */}
        <div className="flex-1 min-h-0 overflow-hidden text-[14px]">
          <CodeMirror
            value={code}
            onChange={(val) => setCode(val)}
            onCreateEditor={(view) => { viewRef.current = view; }}
            height="100%"
            theme={isDark ? oneDark : "light"}
            extensions={extensions}
            style={{ height: "100%", fontSize: "14px" }}
            basicSetup={{ highlightActiveLine: true, autocompletion: true, foldGutter: true }}
          />
        </div>
      </div>

      {/* Terminal Section */}
      <div className="flex flex-col min-h-0 shadow-xl rounded-xl ring-1 ring-white/5">
        <Terminal
          lines={terminalLines}
          prompt="Plankthon:\Home\USER>"
          isTyping={isTyping}
          waitingForInput={waitingForInput}
          onInputSubmit={handleInputSubmit}
          className="rounded-xl"
        />
      </div>
    </div>
  );
}

export default function CodingSandbox() {
  return (
    <Suspense fallback={<div className="w-full h-full bg-bg" />}>
      <CodingSandboxContent />
    </Suspense>
  );
}
