import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { motion } from "framer-motion";

function syntaxHighlight(code: string) {
  let safeCode = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  
  const tokenRegex = /(#.*)|(["'])(?:(?=(\\?))\3.)*?\2|\b(print|def|class|if|else|elif|for|while|in|return|import|from|try|except|pass|break|continue|lambda|self|True|False|None)\b|\b([0-9]+)\b/g;
  
  return safeCode.replace(tokenRegex, (match, comment, quote, _esc, keyword, number) => {
    if (comment) return `<span class="text-c-comment">${match}</span>`;
    if (quote) return `<span class="text-c-string">${match}</span>`;
    if (keyword) {
      if (['self', 'True', 'False', 'None'].includes(keyword)) {
        return `<span class="text-c-key">${match}</span>`;
      }
      return `<span class="text-c-keyword">${match}</span>`;
    }
    if (number) return `<span class="text-c-number">${match}</span>`;
    return match;
  });
}

export function CodeBlock({
  code,
  filename,
  animateTyping = false,
  className
}: {
  code: string;
  filename?: string;
  animateTyping?: boolean;
  className?: string;
}) {
  const [displayedCode, setDisplayedCode] = useState(animateTyping ? "" : code);

  useEffect(() => {
    if (!animateTyping) {
      setDisplayedCode(code);
      return;
    }
    
    let i = 0;
    setDisplayedCode("");
    const interval = setInterval(() => {
      setDisplayedCode(code.slice(0, i));
      i++;
      if (i > code.length) clearInterval(interval);
    }, 15);
    return () => clearInterval(interval);
  }, [code, animateTyping]);

  return (
    <div className={clsx("rounded-xl border border-border bg-screen overflow-hidden flex flex-col font-mono text-[13px] leading-relaxed", className)}>
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>
        {filename && <span className="ml-2 text-muted text-xs">{filename}</span>}
      </div>
      <div className="p-4 overflow-x-auto">
        <pre dangerouslySetInnerHTML={{ __html: syntaxHighlight(displayedCode) + (animateTyping && displayedCode.length < code.length ? "<span class='animate-pulse'>_</span>" : "") }} />
      </div>
    </div>
  );
}
