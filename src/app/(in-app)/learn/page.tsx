"use client";

import { useAppContext } from "../../ClientProvider";
import { lessons } from "@/lib/content/lessons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { Lock, CheckCircle, Circle } from "lucide-react";

export default function LearnListing() {
  const { state } = useAppContext();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<{text: string, type: "command" | "error"}[]>([]);
  const lang = state?.settings?.language || 'en';

  // Group lessons by chapter
  const chapters = [1, 2, 3];

  const furthestUnlockedIndex = lessons.reduce((max, l, i) => 
    (state?.progress.unlocked.includes(l.id) || state?.progress.lessonsCompleted.includes(l.id)) ? Math.max(max, i) : max
  , 0);

  return (
    <div className="p-6 md:p-8 font-mono text-[13px]">
      <div className="mb-4">
        <span className="text-text">Plankthon [Version 1.0.0]</span>
      </div>

      <div className="space-y-4">
        {chapters.map(chapter => {
          const chapterLessons = lessons.filter(l => l.chapter === chapter);
          if (chapterLessons.length === 0) return null;

          return (
            <div key={chapter}>
              <div className="text-text mb-2">Plankthon\Home\Learn\Chapter {chapter}</div>
              <div className="space-y-1">
                {chapterLessons.map(lesson => {
                  const lessonIndex = lessons.findIndex(l => l.id === lesson.id);
                  const isUnlocked = state?.isAdmin || lessonIndex <= furthestUnlockedIndex;
                  const isCompleted = state?.progress.lessonsCompleted.includes(lesson.id);

                  return (
                    <div key={lesson.id} className="flex items-center gap-3">
                      <span className="text-muted">-----</span>
                      {isUnlocked ? (
                        <span
                          className={clsx(
                            "flex items-center gap-2",
                            isCompleted ? "text-c-string" : "text-text"
                          )}
                        >
                          {lesson.title}
                          {isCompleted && <CheckCircle className="w-3.5 h-3.5 inline ml-1" />}
                        </span>
                      ) : (
                        <span className="text-muted/50 flex items-center gap-2 cursor-not-allowed">
                          {lesson.title}
                          <Lock className="w-3 h-3 inline ml-1" />
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 space-y-2">
        <div className="text-muted">select your lesson</div>
        
        {history.length > 0 && (
          <div className="flex flex-col space-y-1 font-mono text-[13px]">
            {history.map((line, i) => (
              <div key={i} className={line.type === "error" ? "text-c-danger" : "text-text"}>
                {line.text}
              </div>
            ))}
          </div>
        )}

        <form
          className="flex items-center gap-2 text-text"
          onSubmit={(e) => {
            e.preventDefault();
            const cmd = inputValue.trim();
            if (!cmd) return;
            
            const newHistory: {text: string, type: "command"|"error"}[] = [...history, { text: `Plankthon:\\Home\\Learn\\USER> ${cmd}`, type: "command" }];
            const match = lessons.find(l => l.id.toLowerCase() === cmd.toLowerCase() || l.title.toLowerCase() === cmd.toLowerCase());
            
            if (match) {
              const lessonIndex = lessons.findIndex(l => l.id === match.id);
              if (state?.isAdmin || lessonIndex <= furthestUnlockedIndex) {
                router.push(`/learn/${match.id}`);
                return;
              } else {
                newHistory.push({ text: `Error: Lesson '${match.title}' is locked.`, type: "error" });
              }
            } else {
              newHistory.push({ text: `Error: Lesson '${cmd}' not found.`, type: "error" });
            }
            
            setHistory(newHistory);
            setInputValue("");
          }}
        >
          <span>Plankthon:\Home\Learn\USER&gt;</span>
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="bg-transparent border-none outline-none text-text font-mono flex-1 caret-accent"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
}
