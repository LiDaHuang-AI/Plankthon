"use client";

import React from "react";
import clsx from "clsx";

export function Toggle({
  options,
  value,
  onChange,
  className
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (val: string) => void;
  className?: string;
}) {
  return (
    <div className={clsx("flex items-center p-1 bg-surface-2 border border-border rounded-lg w-max", className)}>
      {options.map((opt) => {
        const isActive = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={clsx(
              "px-4 py-1.5 rounded-md transition-all duration-200 font-mono text-[13px] outline-none",
              isActive 
                ? "text-bg bg-accent shadow-[0_0_10px_var(--color-accent)] font-bold" 
                : "text-muted hover:text-text hover:bg-surface"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
