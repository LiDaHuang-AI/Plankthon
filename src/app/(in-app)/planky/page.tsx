"use client";

import { useState, useRef, useEffect } from "react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { usePyodide } from "@/lib/pyodide/client";
import { useRouter } from "next/navigation";
import { useAppContext } from "../../ClientProvider";
import { RippleButton } from "@/components/ui/RippleButton";

type ChatMessage = {
  id: string;
  role: "you" | "planky";
  text: string;
  code?: string;
  output?: string;
};

// Parse a markdown string into text and python code parts
function parseMessage(content: string) {
  const parts = content.split(/```(?:python)?\n([\s\S]*?)```/);
  const textParts = [];
  const codeParts = [];
  
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      if (parts[i].trim()) textParts.push(parts[i].trim());
    } else {
      codeParts.push(parts[i].trim());
    }
  }
  
  return {
    text: textParts.join("\n\n"),
    code: codeParts[0] || undefined
  };
}

export default function PlankyChat() {
  const { state, updateState } = useAppContext();
  const messages = (state?.plankyChat as ChatMessage[]) || [];

  const setMessages = (updater: React.SetStateAction<ChatMessage[]>) => {
    updateState(prev => {
      const nextMessages = typeof updater === "function" ? updater(prev.plankyChat as ChatMessage[]) : updater;
      return { ...prev, plankyChat: nextMessages };
    });
  };
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { isReady, runCode } = usePyodide();
  const router = useRouter();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: "you", text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        text: m.code ? `${m.text}\n\n\`\`\`python\n${m.code}\n\`\`\`` : m.text,
      }));
      const res = await fetch("/api/planky", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text, history, language: state?.settings?.language || "en" })
      });
      const data = await res.json();
      
      const { text, code } = parseMessage(data.text || data.error || "No response.");
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "planky",
        text,
        code
      }]);
    } catch (e: any) {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: "planky", text: "Error connecting to Plank AI." }]);
    }
    setIsLoading(false);
  };

  const handleRunAction = async (msgId: string, code: string) => {
    if (!isReady) return;
    try {
      const res = await runCode(code);
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, output: res } : m));
    } catch (e: any) {
      setMessages(prev => prev.map(m => m.id === msgId ? { ...m, output: e.message } : m));
    }
  };

  const handleInsertAction = (code: string) => {
    router.push("/coding?code=" + encodeURIComponent(code));
  };

  return (
    <div className="w-full h-full flex flex-col bg-surface text-muted font-mono text-[13px] p-6 pt-8">
      <div className="flex-1 flex flex-col border border-accent rounded relative shadow-2xl">
        {/* Border Title */}
        <div className="absolute -top-[10px] left-6 px-2 bg-surface text-accent tracking-wider text-sm flex items-center gap-2">
          Planky Code v1.0.0
        </div>

        {/* Top Banner Area */}
        <div className="flex flex-col md:flex-row border-b border-accent">
          {/* Left Column */}
          <div className="flex-1 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-accent">
            <div className="text-center mb-4">Welcome back {state?.profile?.name || "User"}!</div>
            
            <svg viewBox="0 0 100 100" className="w-16 h-16 my-2">
              <circle cx="50" cy="50" r="50" fill="#facc15" />
              <path d="M 35 35 L 50 50 L 35 65" fill="transparent" stroke="#171717" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="55" y1="65" x2="70" y2="65" stroke="#171717" strokeWidth="8" strokeLinecap="round" />
            </svg>


          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b border-accent flex-1 flex flex-col justify-center">
              <div className="text-accent mb-2">Tips for getting started</div>
              <div className="opacity-80 leading-relaxed text-[12px] flex flex-col gap-1">
                <div>| Run <span className="text-text">/help</span> to see available commands for Planky.</div>
                <div>| Note: You can run generated Python code directly in your browser.</div>
              </div>
            </div>
            <div className="p-4 flex-1 flex flex-col justify-center">
              <div className="text-accent mb-2">What's new</div>
              <div className="opacity-80 leading-relaxed text-[12px] flex flex-col gap-1">
                <div>| Added Terminal Theme inspired by Claude Code.</div>
                <div>| Improved python code execution.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Log */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className="flex flex-col gap-1">
              {msg.role === "you" ? (
                <div className="text-text font-bold opacity-80 flex items-center gap-2">
                  <span className="text-accent">&gt;</span> {msg.text}
                </div>
              ) : (
                <div className="pl-4 border-l-2 border-accent/30 py-2 flex flex-col gap-3">
                  {msg.text && (
                    <div className="whitespace-pre-wrap leading-relaxed">
                      {msg.text}
                    </div>
                  )}

                  {msg.code && (
                    <div className="flex flex-col gap-2 mt-2 max-w-4xl bg-surface-2 p-3 rounded border border-border">
                      <CodeBlock code={msg.code} animateTyping={false} />
                      <div className="flex gap-4 mt-2">
                        <RippleButton
                          onClick={() => navigator.clipboard.writeText(msg.code!)}
                          className="text-accent hover:text-text transition-colors uppercase text-[10px] tracking-wider"
                        >
                          [ Copy ]
                        </RippleButton>
                        <RippleButton
                          onClick={() => handleRunAction(msg.id, msg.code!)}
                          disabled={!isReady}
                          className="text-accent hover:text-text transition-colors uppercase text-[10px] tracking-wider disabled:opacity-50"
                        >
                          [ Run ]
                        </RippleButton>
                        <RippleButton
                          onClick={() => handleInsertAction(msg.code!)}
                          className="text-accent hover:text-text transition-colors uppercase text-[10px] tracking-wider"
                        >
                          [ Insert ]
                        </RippleButton>
                      </div>
                      {msg.output && (
                        <div className="bg-surface-2 border border-accent/30 p-2 text-muted mt-2 font-mono text-xs">
                          {msg.output}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="pl-4 border-l-2 border-accent/30 py-2 flex items-center gap-2">
              <span className="animate-pulse text-accent">Planky is typing...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 flex items-center gap-3 relative">
          <span className="text-accent font-bold">&gt;</span>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Try 'write a python script for...'"
            className="flex-1 bg-transparent text-text outline-none font-mono placeholder:text-muted/50"
            autoComplete="off"
            autoFocus
          />
          {isLoading && <span className="absolute right-4 text-accent animate-pulse">Running...</span>}
        </form>
      </div>
    </div>
  );
}
