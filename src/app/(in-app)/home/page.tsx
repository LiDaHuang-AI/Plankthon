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
      
      {/* Greeting Terminal */}
      <div className="h-32">
        <Terminal 
          lines={[
            { text: `welcome back, ${state?.profile.name?.toLowerCase()}`, type: "success" }
          ]}
          prompt="Plankthon:\Home\USER>"
          isTyping={true}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Continue Card */}
        <div className="col-span-1 md:col-span-2 bg-surface-2 border border-border rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-700" />
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Continue Learning</h2>
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
              <div className="h-1.5 w-full bg-black/50 rounded-full overflow-hidden">
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
        <Link href="/learn" className="bg-surface-2 border border-border rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-white/5 hover:border-white/10 transition-all group">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-300">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="font-semibold text-white">Learn</span>
        </Link>

        <Link href="/challenge" className="bg-surface-2 border border-border rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-white/5 hover:border-white/10 transition-all group">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all duration-300">
            <Trophy className="w-6 h-6" />
          </div>
          <span className="font-semibold text-white">Challenge</span>
        </Link>

        <Link href="/coding" className="bg-surface-2 border border-border rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-white/5 hover:border-white/10 transition-all group">
          <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 group-hover:scale-110 group-hover:bg-green-500/20 transition-all duration-300">
            <Code className="w-6 h-6" />
          </div>
          <span className="font-semibold text-white">Coding Sandbox</span>
        </Link>

        <Link href="/planky" className="bg-surface-2 border border-border rounded-2xl p-6 flex flex-col items-center justify-center gap-3 hover:bg-white/5 hover:border-white/10 transition-all group">
          <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent/20 transition-all duration-300">
            <TerminalIcon className="w-6 h-6" />
          </div>
          <span className="font-semibold text-white">Plank AI</span>
        </Link>
      </div>

    </div>
  );
}
