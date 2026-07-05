"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { State, useAppState } from "@/lib/state";
import { DialogProvider } from "@/components/ui/Dialog";
import { setSoundEnabled } from "@/lib/sound";

type AppContextType = {
  state: State | null;
  updateState: (updater: (prev: State) => State) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function ClientProvider({ children }: { children: React.ReactNode }) {
  const { state, updateState } = useAppState();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Record daily activity once per session (debounced by checking the last entry)
  useEffect(() => {
    if (!state || !mounted) return;

    const now = new Date();
    const lastEntryStr = state.progress.activityLog?.[state.progress.activityLog.length - 1];
    
    // Only log if there's no entry or the last entry was more than an hour ago
    let shouldLog = true;
    if (lastEntryStr) {
      const lastEntry = new Date(lastEntryStr);
      const diffMs = now.getTime() - lastEntry.getTime();
      if (diffMs < 60 * 60 * 1000) {
        shouldLog = false;
      }
    }

    if (shouldLog) {
      updateState(prev => ({
        ...prev,
        progress: {
          ...prev.progress,
          activityLog: [...(prev.progress.activityLog || []), now.toISOString()]
        }
      }));
    }
  }, [mounted]); // Only run once when mounted is true

  useEffect(() => {
    if (state && mounted) {
      if (state.settings.theme === "light") {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
      }
      document.documentElement.lang = state.settings.language;
      setSoundEnabled(state.settings.sound);
    }
  }, [state?.settings.theme, state?.settings.language, mounted]);

  if (!mounted || !state) return null; // Prevent hydration mismatch

  return (
    <AppContext.Provider value={{ state, updateState }}>
      <DialogProvider>
        {children}
      </DialogProvider>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within ClientProvider");
  return ctx;
}
