import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

export function Terminal({
  lines,
  prompt = "Plankthon:\\Home\\USER>",
  isTyping = false,
  waitingForInput = false,
  onInputSubmit,
  className
}: {
  lines: { text: string; type?: "default" | "error" | "success" | "command" }[];
  prompt?: string;
  isTyping?: boolean;
  waitingForInput?: boolean;
  onInputSubmit?: (val: string) => void;
  className?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, isTyping, waitingForInput]);

  useEffect(() => {
    if (waitingForInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [waitingForInput]);

  return (
    <div className={clsx("font-mono text-[13px] flex flex-col h-full bg-bg border border-border overflow-hidden", className)}>
      <div className="px-4 py-2 border-b border-border bg-surface text-xs text-muted font-sans font-semibold tracking-wider flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>TERMINAL</span>
        </div>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-1">
        {lines.map((line, i) => (
          <div key={i} className={clsx(
            "whitespace-pre-wrap",
            line.type === "error" && "text-c-danger",
            line.type === "success" && "text-c-string",
            line.type === "command" && "text-accent",
            !line.type && "text-text"
          )}>
            {line.type === "command" ? `> ${line.text}` : line.text}
          </div>
        ))}
        {waitingForInput ? (
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              onInputSubmit?.(inputValue);
              setInputValue("");
            }} 
            className="flex items-center mt-2"
          >
            <input 
              ref={inputRef}
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="bg-transparent outline-none border-none flex-1 text-text min-w-0"
              spellCheck={false}
              autoComplete="off"
            />
          </form>
        ) : (
          <div className="flex items-center text-text mt-2">
            {prompt && <span className="mr-2">{prompt}</span>}
            {isTyping ? (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-2 h-4 bg-accent inline-block"
              />
            ) : (
              <span className="w-2 h-4 bg-transparent border border-accent inline-block" />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
