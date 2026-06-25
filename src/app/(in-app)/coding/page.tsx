"use client";

import { useState, useEffect, Suspense } from "react";
import { Terminal } from "@/components/ui/Terminal";
import { usePyodide } from "@/lib/pyodide/client";
import { Play } from "lucide-react";
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
    <div className="w-full h-[calc(100vh-56px)] bg-bg p-6">
      <div className="flex flex-col h-[calc(100vh-104px)] gap-4 min-h-0">
        {/* Editor */}
        <div className="flex-1 bg-surface-2 border border-border rounded-xl flex flex-col overflow-hidden min-h-0">
          <div className="bg-white/5 border-b border-border px-4 py-2 flex items-center justify-between font-mono text-xs text-muted">
            <span>main.py</span>
            <button 
              onClick={handleRun}
              disabled={!isReady}
              className="flex items-center gap-1.5 px-3 py-1 bg-accent text-bg font-bold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <Play className="w-3 h-3 fill-current" />
              Run
            </button>
          </div>
          <div className="flex-1 flex relative min-h-0">
            <div className="w-10 bg-white/5 border-r border-border font-mono text-[13px] leading-[1.5] text-muted/50 select-none overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 pt-4 pr-2 flex flex-col items-end" style={{ transform: `translateY(-${scrollTop}px)` }}>
                {code.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
              </div>
            </div>
            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
              onKeyDown={handleKeyDown}
              className="w-full h-full bg-transparent p-4 text-white font-mono text-[13px] outline-none resize-none leading-[1.5]"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Terminal */}
        <div className="h-48 flex-shrink-0">
          <Terminal 
            lines={terminalLines}
            prompt=""
            isTyping={isTyping}
            waitingForInput={waitingForInput}
            onInputSubmit={handleInputSubmit}
          />
        </div>
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

