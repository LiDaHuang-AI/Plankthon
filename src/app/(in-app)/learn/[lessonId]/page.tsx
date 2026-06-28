"use client";

import { useAppContext } from "../../../ClientProvider";
import { lessons } from "@/lib/content/lessons";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { useState, useEffect } from "react";
import { usePyodide } from "@/lib/pyodide/client";
import { t } from "@/lib/i18n";
import clsx from "clsx";
import { RippleButton } from "@/components/ui/RippleButton";

export default function LessonView() {
  const { lessonId } = useParams();
  const { state, updateState } = useAppContext();
  const router = useRouter();
  const lang = state?.settings?.language;
  
  const lessonIndex = lessons.findIndex(l => l.id === lessonId);
  const lesson = lessons[lessonIndex];
  
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const page = lesson?.pages[currentPageIndex];

  const progressPct = Math.round((currentPageIndex / (lesson?.pages.length || 1)) * 100);

  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  
  const { isReady, runCode, submitInput } = usePyodide();

  // Reset state when page changes
  useEffect(() => {
    if (page) {
      setCode(page.exercise?.starter || page.exampleCode || "");
      setOutput("");
      // If there is no exercise, we don't strictly require success to move on, but we'll mark it true by default
      setIsSuccess(page.exercise ? null : true);
    }
  }, [currentPageIndex, page]);

  if (!lesson || !page) return <div>Lesson not found</div>;

  const handleRun = async () => {
    if (!isReady) return;
    try {
      let fullOutput = "";
      await runCode(code, undefined, (text) => {
        fullOutput += text;
      }, () => {
        submitInput("Planky");
      });
      setOutput(fullOutput);
      if (page.exercise && fullOutput === page.exercise.check) {
        setIsSuccess(true);
      } else if (!page.exercise) {
        setIsSuccess(true); // Always succeed if no exercise
      } else {
        setIsSuccess(false);
      }
    } catch (e: any) {
      setOutput(e.message);
      setIsSuccess(false);
    }
  };

  const handleNext = () => {
    if (currentPageIndex < lesson.pages.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
    } else {
      // Complete lesson
      updateState(prev => {
        const completed = new Set(prev.progress.lessonsCompleted);
        completed.add(lesson.id);
        
        const unlocked = new Set(prev.progress.unlocked);
        const nextLesson = lessons[lessonIndex + 1];
        if (nextLesson) unlocked.add(nextLesson.id);
        
        return {
          ...prev,
          progress: {
            ...prev.progress,
            lessonsCompleted: Array.from(completed),
            unlocked: Array.from(unlocked)
          }
        };
      });
      
      router.push('/learn');
    }
  };

  return (
    <div className="w-full min-h-screen bg-bg flex flex-col relative z-50">
      {/* Header */}
      <header className="p-6 flex justify-between items-start">
        <div>
          <div className="text-muted mb-2 font-mono text-[14px]">
            Plankthon\Home\Learn\Chapter {lesson.chapter}\ {lesson.title}
          </div>
          <h1 className="text-3xl font-bold text-text mb-2">
            {lang === 'th' && page.title_th ? page.title_th : page.title} <span className="text-muted text-xl">({currentPageIndex + 1}/{lesson.pages.length})</span>
          </h1>
          <div className="text-muted text-sm">
            Chapter {lesson.chapter}: {lesson.title}
          </div>
          <div className="w-64 h-1 mt-4 bg-surface-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent rounded-full transition-all duration-500" 
              style={{ width: `${Math.max(5, progressPct)}%` }} 
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 pb-24">
        {/* LEARN Column */}
        <div className="bg-surface-2 border border-border rounded-2xl p-6 flex flex-col">
          <div className="font-mono text-accent font-bold text-[13px] mb-4">// LEARN</div>
          <p className="text-text text-[15px] mb-6 whitespace-pre-wrap">{lang === 'th' && page.explanation_th ? page.explanation_th : page.explanation}</p>
          
          {page.exampleCode && <CodeBlock code={page.exampleCode} />}
          
          {page.expectedOutput && (
            <div className="mt-4 bg-screen border border-border rounded-xl p-4 font-mono text-[13px]">
              <div className="text-[10px] text-muted uppercase tracking-wider mb-2">{t(lang, 'output')}</div>
              <div className="text-c-string whitespace-pre-wrap">{page.expectedOutput}</div>
            </div>
          )}

          {page.hint && (
            <div className="mt-auto pt-6 text-muted font-mono text-[13px]">
              <span className="text-c-comment"># tip:</span> {page.hint}
            </div>
          )}
        </div>

        {/* TRY IT Column */}
        <div className="flex flex-col gap-4">
          <div className="bg-surface-2 border border-border rounded-2xl p-6 flex flex-col flex-1">
            <div className="font-mono text-accent font-bold text-[13px] mb-4">// TRY IT</div>
            
            {page.exercise ? (
              <>
                <p className="text-text text-[14px] mb-4">{lang === 'th' && page.exercise.prompt_th ? page.exercise.prompt_th : page.exercise.prompt}</p>
                
                <textarea 
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full h-32 bg-screen border border-border rounded-xl p-4 text-text font-mono text-[13px] outline-none focus:border-accent resize-none"
                  spellCheck={false}
                />
              </>
            ) : (
              <>
                <p className="text-text text-[14px] mb-4">Run the example code to see how it works!</p>
                <CodeBlock code={code} />
              </>
            )}
            
            <div className="flex items-center gap-4 mt-4">
              <RippleButton
                onClick={handleRun}
                disabled={!isReady}
                className="px-6 py-2 bg-accent text-bg font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isReady ? t(lang, 'run') : t(lang, 'loading')}
              </RippleButton>
              <div className="flex-1 bg-screen border border-border rounded-xl p-3 font-mono text-[13px] min-h-[46px] flex items-center">
                {output ? (
                  <span className={clsx("whitespace-pre-wrap", isSuccess === false ? "text-c-danger" : "text-c-string")}>
                    {output}
                  </span>
                ) : (
                  <span className="text-[10px] text-muted uppercase tracking-wider">{t(lang, 'output')}</span>
                )}
              </div>
            </div>
          </div>

          {/* Hint Panel */}
          <div className="bg-surface-2 border border-border rounded-2xl p-6 flex items-center gap-6">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 100 100" className="w-10 h-10 text-bg fill-current">
                <circle cx="50" cy="50" r="35" />
                <rect x="25" y="45" width="50" height="10" rx="5" fill="#FFD43B" />
              </svg>
            </div>
            <div>
              <div className="font-mono text-accent font-bold text-[11px] uppercase mb-1">Planky</div>
              <p className="text-text text-[14px]">
                {isSuccess === true ? (lang === 'th' ? "เยี่ยมมาก! กด 'ถัดไป' เพื่อไปต่อ" : "Nice work! Press 'Next' to continue.") : 
                 isSuccess === false ? (lang === 'th' ? "ยังไม่ถูกต้อง " + (page.hint_th || page.hint || "ลองอีกครั้ง") : "Not quite right. " + (page.hint || "Try again.")) : 
                 (lang === 'th' ? "รันโค้ดของคุณเพื่อดูผลลัพธ์ที่นี่" : "Run your code to see the output here.")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 h-20 bg-surface border-t border-border flex items-center justify-between px-6 z-50">
        <Link 
          href="/learn"
          className="px-6 py-2 bg-transparent border border-border text-text rounded-xl hover:bg-border transition-colors"
        >
          Back to Menu
        </Link>
        <RippleButton
          onClick={handleNext}
          disabled={isSuccess !== true}
          className="px-8 py-2 bg-accent text-bg font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {currentPageIndex < lesson.pages.length - 1 ? t(lang, 'next') : (lang === 'th' ? "เสร็จสิ้นบทเรียน ->" : "Complete Lesson ->")}
        </RippleButton>
      </footer>
    </div>
  );
}
