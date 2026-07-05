"use client";

import { useState, useEffect, useCallback } from "react";

export type State = {
  account: { email: string } | null;
  loggedIn: boolean;
  profile: { name: string; handle: string; avatar: string };
  progress: {
    unlocked: string[];
    lessonsCompleted: string[];
    challengesSolved: string[];
    accuracy: number;
    currentChapter: number;
    lastVisited?: string;
    activityLog: string[];
  };
  settings: {
    theme: "dark" | "light";
    fontSize: number;
    sound: boolean;
    language: "en" | "th";
    reducedMotion: boolean;
  };
  plankyChat: { id: string; role: "you" | "planky"; text: string; code?: string; output?: string }[];
  coding: {
    code?: string;
    files?: { name: string; content: string }[];
    activeFile?: string;
    terminalLines: {text: string, type?: "default" | "error" | "success" | "command"}[];
  };
  isAdmin?: boolean;
};

const DEFAULT_STATE: State = {
  account: null,
  loggedIn: false,
  profile: { name: "New User", handle: "@newuser", avatar: "" },
  progress: {
    unlocked: ["ch1-basic"],
    lessonsCompleted: [],
    challengesSolved: [],
    accuracy: 100,
    currentChapter: 1,
    activityLog: [],
  },
  settings: {
    theme: "dark",
    fontSize: 14,
    sound: true,
    language: "en",
    reducedMotion: false,
  },
  plankyChat: [{ id: "welcome", role: "planky", text: "Can I help you :)" }],
  coding: {
    code: "print(\"Hello, Planky!\")\n",
    terminalLines: []
  },
  isAdmin: false
};

// Deep merge utility
function deepMerge(target: any, source: any): any {
  if (typeof target !== "object" || target === null) return source;
  if (typeof source !== "object" || source === null) return target;

  const output = { ...target };
  Object.keys(source).forEach((key) => {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      if (!(key in target)) {
        output[key] = source[key];
      } else {
        output[key] = deepMerge(target[key], source[key]);
      }
    } else {
      output[key] = source[key];
    }
  });
  return output;
}

export function useAppState() {
  const [state, setState] = useState<State | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("plankthon");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(deepMerge(DEFAULT_STATE, parsed) as State);
      } catch (e) {
        console.error("Failed to parse state", e);
        setState(DEFAULT_STATE);
      }
    } else {
      setState(DEFAULT_STATE);
    }
  }, []);

  const updateState = useCallback((updater: (prev: State) => State) => {
    setState((prev) => {
      if (!prev) return prev;
      const next = updater(prev);
      // Persist everything except the AI chat and the transient terminal output.
      // The coding sandbox's files + active tab ARE saved, so multi-file work
      // survives a page reload; only the ephemeral terminal log is dropped.
      const { plankyChat, coding, ...rest } = next;
      const { terminalLines, ...codingToSave } = coding;
      const savableState = { ...rest, coding: codingToSave };
      localStorage.setItem("plankthon", JSON.stringify(savableState));
      return next;
    });
  }, []);

  return { state, updateState };
}
