"use client";

import { useAppContext } from "../../ClientProvider";
import { challenges } from "@/lib/content/challenges";
import { useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";
import { Lock, CheckCircle } from "lucide-react";

export default function ChallengeListing() {
  const { state } = useAppContext();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState<{text: string, type: "command" | "error"}[]>([]);

  const levels = [1, 2, 3];

  const furthestUnlockedIndex = challenges.reduce((max, c, i) => 
    (state?.progress.unlocked.includes(c.id) || state?.progress.challengesSolved.includes(c.id)) ? Math.max(max, i) : max
  , 0);

  return (
    <div className="p-6 md:p-8 font-mono text-[13px]">
      <div className="mb-4">
        <span className="text-white">Plankthon [Version 1.0.0]</span>
      </div>

      <div className="space-y-4">
        {levels.map(level => {
          const levelChallenges = challenges.filter(c => c.chapter === level);
          if (levelChallenges.length === 0) return null;

          return (
            <div key={level}>
              <div className="text-white mb-2">Plankthon\Home\Challenge\Level {level}</div>
              <div className="space-y-1">
                {levelChallenges.map(challenge => {
                  const challengeIndex = challenges.findIndex(c => c.id === challenge.id);
                  const isUnlocked = state?.isAdmin || challengeIndex <= furthestUnlockedIndex;
                  const isSolved = state?.progress.challengesSolved.includes(challenge.id);

                  return (
                    <div key={challenge.id} className="flex items-center gap-3">
                      <span className="text-muted">-----</span>
                      {isUnlocked ? (
                        <span
                          className={clsx(
                            "flex items-center gap-2",
                            isSolved ? "text-c-string" : "text-text"
                          )}
                        >
                          {challenge.title}
                          {isSolved && <CheckCircle className="w-3.5 h-3.5 inline ml-1" />}
                        </span>
                      ) : (
                        <span className="text-muted/50 flex items-center gap-2 cursor-not-allowed">
                          {challenge.title}
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
        <div className="text-muted">select your challenge</div>
        
        {history.length > 0 && (
          <div className="flex flex-col space-y-1 font-mono text-[13px]">
            {history.map((line, i) => (
              <div key={i} className={line.type === "error" ? "text-c-danger" : "text-white"}>
                {line.text}
              </div>
            ))}
          </div>
        )}

        <form
          className="flex items-center gap-2 text-white"
          onSubmit={(e) => {
            e.preventDefault();
            const cmd = inputValue.trim();
            if (!cmd) return;
            
            const newHistory: {text: string, type: "command"|"error"}[] = [...history, { text: `Plankthon:\\Home\\Challenge\\USER> ${cmd}`, type: "command" }];
            const match = challenges.find(c => c.id.toLowerCase() === cmd.toLowerCase() || c.title.toLowerCase() === cmd.toLowerCase());
            
            if (match) {
              const challengeIndex = challenges.findIndex(c => c.id === match.id);
              if (state?.isAdmin || challengeIndex <= furthestUnlockedIndex) {
                router.push(`/challenge/${match.id}`);
                return;
              } else {
                newHistory.push({ text: `Error: Challenge '${match.title}' is locked.`, type: "error" });
              }
            } else {
              newHistory.push({ text: `Error: Challenge '${cmd}' not found.`, type: "error" });
            }
            
            setHistory(newHistory);
            setInputValue("");
          }}
        >
          <span>Plankthon:\Home\Challenge\USER&gt;</span>
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="bg-transparent border-none outline-none text-white font-mono flex-1 caret-accent"
            autoFocus
            spellCheck={false}
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
}
