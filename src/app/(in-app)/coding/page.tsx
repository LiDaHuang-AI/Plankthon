"use client";

import { useState, useEffect, Suspense } from "react";
import { Terminal } from "@/components/ui/Terminal";
import { usePyodide } from "@/lib/pyodide/client";
import { Play, TerminalSquare, Trash2, FileCode } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useAppContext } from "../../ClientProvider";

function CodingSandboxContent() {
  const searchParams = useSearchParams();
  const { state, updateState } = useAppContext();
  
  const [code, setCode] = useState(state?.coding?.code || "print(\"Hello, Planky!\")\n");
  const [scrollTop, setScrollTop] = useState(0);
  const [terminalLines, setTerminalLines] = useState<{text: string, type?: "default" | "error" | "success" | "command"}[]>(state?.coding?.terminalLines || []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      updateState(prev => ({ ...prev, coding: { ...prev.coding, code } }));
    }, 500);
    return () => clearTimeout(timeout);
  }, [code, updateState]);

  useEffect(() => {
    updateState(prev => ({ ...prev, coding: { ...prev.coding, terminalLines } }));
  }, [terminalLines, updateState]);
  const [isTyping, setIsTyping] = useState(false);
  const [waitingForInput, setWaitingForInput] = useState(false);
  const { isReady, runCode, submitInput } = usePyodide();

  useEffect(() => {
    const qCode = searchParams.get("code");
    if (qCode) setCode(qCode);
  }, [searchParams]);

  const handleRun = async () => {
    if (!isReady) return;
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
      setTerminalLines(prev => [...prev, { text: e.message, type: "error" }]);
    }
    setIsTyping(false);
    setWaitingForInput(false);
  };

  const handleInputSubmit = (val: string) => {
    setTerminalLines(prev => [...prev, { text: val, type: "default" }]);
    submitInput(val);
    setWaitingForInput(false);
    setIsTyping(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      handleRun();
    }
  };

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
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setTerminalLines([])}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-muted hover:text-text transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear
            </button>
            <button 
              onClick={handleRun}
              disabled={!isReady}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-accent text-bg font-bold rounded hover:opacity-90 transition-opacity disabled:opacity-50 text-sm shadow-[0_0_10px_rgba(255,212,59,0.2)]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Run Code
            </button>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex relative min-h-0 bg-surface">
          <div className="w-12 bg-bg border-r border-border font-mono text-[13px] leading-[1.6] text-muted/40 select-none overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 pt-4 pr-3 flex flex-col items-end" style={{ transform: `translateY(-${scrollTop}px)` }}>
              {code.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
            </div>
          </div>
          <textarea 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
            onKeyDown={handleKeyDown}
            className="w-full h-full bg-transparent p-4 text-text font-mono text-[14px] outline-none resize-none leading-[1.6] selection:bg-accent/30"
            spellCheck={false}
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

