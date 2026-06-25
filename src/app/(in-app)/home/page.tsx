"use client";

import { useAppContext } from "../../ClientProvider";
import Link from "next/link";
import { Terminal as TerminalIcon, BookOpen, Trophy, Code, Play } from "lucide-react";
import { Terminal } from "@/components/ui/Terminal";
import { lessons } from "@/lib/content/lessons";

export default function HomePage() {
  const { state } = useAppContext();
  
  // Find next lesson
  const unlockedLessons = lessons.filter(l => state?.progress.unlocked.includes(l.id));
  const incompleteLessons = unlockedLessons.filter(l => !state?.progress.lessonsCompleted.includes(l.id));
  const nextLesson = incompleteLessons[0] || lessons[0];

  const chapterLessons = lessons.filter(l => l.chapter === nextLesson.chapter);
  const chapterCompleted = chapterLessons.filter(l => state?.progress.lessonsCompleted.includes(l.id));
  const progressPct = Math.max(5, Math.round((chapterCompleted.length / chapterLessons.length) * 100));

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Profile Header */}
      <div className="flex items-center gap-6 mb-2 bg-surface-2 border border-border rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="w-20 h-20 rounded-full bg-accent text-bg flex flex-shrink-0 items-center justify-center text-3xl font-bold shadow-[0_0_30px_rgba(250,204,21,0.3)] z-10">
          {state?.profile.name ? state.profile.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase() : "U"}
        </div>
        <div className="flex flex-col z-10">
          <h1 className="text-3xl font-bold text-text mb-1 tracking-tight">{state?.profile.name || "New User"}</h1>
          <div className="flex items-center gap-3 text-sm mt-1">
            <span className="text-accent font-medium px-2.5 py-1 bg-accent/10 rounded-md border border-accent/20 shadow-sm">{state?.account?.email || "user@example.com"}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Continue Card */}
        <div className="col-span-1 md:col-span-2 bg-surface-2 border border-border rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-700" />
          <div>
            <h2 className="text-xl font-bold text-text mb-2">Continue Learning</h2>
            <p className="text-muted text-sm max-w-md">
              You are currently on Chapter {nextLesson.chapter}. Next up is <span className="text-accent font-medium">{nextLesson.title}</span>.
            </p>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex-1 mr-8">
              <div className="flex justify-between text-xs text-muted mb-1">
                <span>Chapter {nextLesson.chapter} Progress</span>
                <span>{progressPct}%</span>
              </div>
              <div className="h-1.5 w-full bg-surface-2 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-accent rounded-full" 
                  style={{ width: `${progressPct}%` }} 
                />
              </div>
            </div>
            <Link 
              href={`/learn/${nextLesson.id}`}
              className="px-6 py-2.5 bg-accent text-bg font-bold rounded-xl flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all shadow-[0_0_20px_-5px_#FFD43B]"
            >
              <Play className="w-4 h-4 fill-current" />
              Resume
            </Link>
          </div>
        </div>

        {/* Quick Action Tiles */}
        <Link href="/learn" className="bg-surface-2 border border-border rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-border hover:border-border transition-all group">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="font-semibold text-text">Learn</span>
        </Link>

        <Link href="/challenge" className="bg-surface-2 border border-border rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-border hover:border-border transition-all group">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300">
            <Trophy className="w-6 h-6" />
          </div>
          <span className="font-semibold text-text">Challenge</span>
        </Link>

        <Link href="/coding" className="bg-surface-2 border border-border rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-border hover:border-border transition-all group">
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 group-hover:scale-110 group-hover:bg-green-500/20 transition-all duration-300">
            <Code className="w-6 h-6" />
          </div>
          <span className="font-semibold text-text">Coding Sandbox</span>
        </Link>

        <Link href="/planky" className="bg-surface-2 border border-border rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-border hover:border-border transition-all group">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-300">
            <TerminalIcon className="w-6 h-6" />
          </div>
          <span className="font-semibold text-text">Plank AI</span>
        </Link>
      </div>

    </div>
  );
}
