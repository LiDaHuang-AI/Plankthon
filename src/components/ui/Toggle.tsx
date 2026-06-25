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
    <div className={clsx("flex items-center gap-3 font-mono text-[14px]", className)}>
      {options.map((opt) => {
        const isActive = value === opt.value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={clsx(
              "transition-colors",
              isActive ? "text-accent" : "text-muted hover:text-text"
            )}
          >
            {isActive ? `[ ${opt.label} ]` : opt.label}
          </button>
        );
      })}
    </div>
  );
}
