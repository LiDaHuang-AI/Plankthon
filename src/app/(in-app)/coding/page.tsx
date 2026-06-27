"use client";

import { useState, useEffect, useRef, useMemo, Suspense } from "react";
import { Terminal } from "@/components/ui/Terminal";
import { usePyodide } from "@/lib/pyodide/client";
import { Play, Square, Trash2, FileCode, RotateCcw, Wand2, Plus, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "../../ClientProvider";
import CodeMirror from "@uiw/react-codemirror";
import { python } from "@codemirror/lang-python";
import { oneDark } from "@codemirror/theme-one-dark";
import { keymap, EditorView } from "@codemirror/view";
import { Prec } from "@codemirror/state";
import { lintGutter, setDiagnostics, type Diagnostic } from "@codemirror/lint";
import clsx from "clsx";

const DEFAULT_CODE = 'print("Hello, Planky!")\n';

type PyFile = { name: string; content: string };

function CodingSandboxContent() {
  const searchParams = useSearchParams();
  const { state, updateState } = useAppContext();

  const [files, setFiles] = useState<PyFile[]>(() => {
    const f = state?.coding?.files;
    if (f && f.length) return f;
    return [{ name: "main.py", content: state?.coding?.code || DEFAULT_CODE }];
  });
  const [activeName, setActiveName] = useState<string>(() => {
    const f = state?.coding?.files;
    const af = state?.coding?.activeFile;
    if (f && f.length && af && f.some((x) => x.name === af)) return af;
    return f && f.length ? f[0].name : "main.py";
  });

  const [terminalLines, setTerminalLines] = useState<{ text: string; type?: "default" | "error" | "success" | "command" }[]>(state?.coding?.terminalLines || []);
  const [isTyping, setIsTyping] = useState(false);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isFormatting, setIsFormatting] = useState(false);
  const [isDark, setIsDark] = useState(true);

  const { isReady, runCode, submitInput, stop, format, lint } = usePyodide();

  const activeFile = files.find((f) => f.name === activeName) || files[0];
  const code = activeFile?.content ?? "";
  const setCode = (val: string) => {
    setFiles((prev) => prev.map((f) => (f.name === activeName ? { ...f, content: val } : f)));
  };

  // Autosave files + active tab (debounced) + persist terminal output
  useEffect(() => {
    const timeout = setTimeout(() => {
      updateState((prev) => ({ ...prev, coding: { ...prev.coding, files, activeFile: activeName } }));
    }, 500);
    return () => clearTimeout(timeout);
  }, [files, activeName, updateState]);

  useEffect(() => {
    updateState((prev) => ({ ...prev, coding: { ...prev.coding, terminalLines } }));
  }, [terminalLines, updateState]);

  // Load code passed from Plank AI's "Insert" into the active file
  useEffect(() => {
    const qCode = searchParams.get("code");
    if (qCode) setCode(qCode);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    setTerminalLines([{ text: `python ${activeName}`, type: "command" }]);
    try {
      await runCode(
        code,
        files,
        (text) => {
          const trimmed = text.trim();
          if (trimmed === "I AM ADMIN") {
            updateState((s) => ({ ...s, isAdmin: true }));
          } else if (trimmed === "I AM OUT") {
            updateState((s) => ({ ...s, isAdmin: false }));
          }
          setTerminalLines((prev) => [...prev, { text: text.trimEnd() }]);
        },
        () => {
          setIsTyping(false);
          setWaitingForInput(true);
        }
      );
    } catch (e: any) {
      if (e?.message === "__STOPPED__") {
        setTerminalLines((prev) => [...prev, { text: "⛔ Stopped", type: "error" }]);
      } else {
        setTerminalLines((prev) => [...prev, { text: e.message, type: "error" }]);
      }
    } finally {
      setIsTyping(false);
      setWaitingForInput(false);
      setIsRunning(false);
    }
  };

  const handleInputSubmit = (val: string) => {
    setTerminalLines((prev) => [...prev, { text: val, type: "default" }]);
    submitInput(val);
    setWaitingForInput(false);
    setIsTyping(true);
  };

  const handleReset = () => {
    if (window.confirm(`ล้างโค้ดในไฟล์ ${activeName} กลับเป็นค่าเริ่มต้น?`)) {
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
      setTerminalLines((prev) => [...prev, { text: "⚠ จัดรูปแบบไม่ได้ — โค้ดมี syntax error", type: "error" }]);
    } finally {
      setIsFormatting(false);
    }
  };

  // ---- File tab management ----
  const addFile = () => {
    let n = 1;
    let suggested = `file${n}.py`;
    while (files.some((f) => f.name === suggested)) {
      n++;
      suggested = `file${n}.py`;
    }
    const input = window.prompt("ชื่อไฟล์ใหม่ (.py)", suggested);
    if (!input) return;
    let fname = input.trim();
    if (!fname.endsWith(".py")) fname += ".py";
    if (files.some((f) => f.name === fname)) {
      window.alert("มีไฟล์ชื่อนี้อยู่แล้ว");
      return;
    }
    setFiles((prev) => [...prev, { name: fname, content: "" }]);
    setActiveName(fname);
  };

  const closeFile = (name: string) => {
    if (files.length <= 1) return;
    if (!window.confirm(`ปิดไฟล์ ${name}?`)) return;
    const remaining = files.filter((f) => f.name !== name);
    setFiles(remaining);
    if (activeName === name) setActiveName(remaining[0]?.name || "main.py");
  };

  const renameFile = (name: string) => {
    const input = window.prompt("เปลี่ยนชื่อไฟล์", name);
    if (!input) return;
    let fname = input.trim();
    if (!fname.endsWith(".py")) fname += ".py";
    if (fname === name) return;
    if (files.some((f) => f.name === fname)) {
      window.alert("มีไฟล์ชื่อนี้อยู่แล้ว");
      return;
    }
    setFiles((prev) => prev.map((f) => (f.name === name ? { ...f, name: fname } : f)));
    if (activeName === name) setActiveName(fname);
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

        {/* IDE-style Tab Bar with file tabs */}
        <div className="flex items-stretch bg-bg border-b border-border">
          {/* File tabs (scrollable) */}
          <div className="flex items-stretch overflow-x-auto min-w-0">
            {files.map((f) => (
              <div
                key={f.name}
                onClick={() => setActiveName(f.name)}
                onDoubleClick={() => renameFile(f.name)}
                title="ดับเบิลคลิกเพื่อเปลี่ยนชื่อ"
                className={clsx(
                  "group flex items-center gap-2 px-3 py-2.5 border-r border-border text-sm cursor-pointer relative whitespace-nowrap select-none",
                  f.name === activeName ? "bg-surface text-text" : "text-muted hover:text-text"
                )}
              >
                {f.name === activeName && <div className="absolute top-0 left-0 right-0 h-0.5 bg-accent" />}
                <FileCode className={clsx("w-3.5 h-3.5", f.name === activeName ? "text-accent" : "")} />
                {f.name}
                {files.length > 1 && (
                  <button
                    onClick={(e) => { e.stopPropagation(); closeFile(f.name); }}
                    className="opacity-0 group-hover:opacity-100 hover:text-c-danger transition-opacity"
                    title="ปิดไฟล์"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addFile}
              title="เพิ่มไฟล์ใหม่"
              className="px-2.5 text-muted hover:text-text border-r border-border flex items-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto pr-3 flex-shrink-0">
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
