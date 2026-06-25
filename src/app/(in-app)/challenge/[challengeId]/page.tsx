"use client";

import { useAppContext } from "../../../ClientProvider";
import { challenges, Question } from "@/lib/content/challenges";
import { useParams, useRouter } from "next/navigation";
import { X, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePyodide } from "@/lib/pyodide/client";
import { Terminal } from "@/components/ui/Terminal";
import clsx from "clsx";

export default function ChallengeView() {
  const { challengeId } = useParams();
  const { state, updateState } = useAppContext();
  const router = useRouter();
  
  const challengeIndex = challenges.findIndex(c => c.id === challengeId);
  const challenge = challenges[challengeIndex];
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const question = challenge?.questions?.[currentQuestionIndex] as Question | undefined;
  
  const [code, setCode] = useState("");
  const [scrollTop, setScrollTop] = useState(0);
  const [terminalLines, setTerminalLines] = useState<{text: string, type?: "default" | "error" | "success" | "command"}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [testResult, setTestResult] = useState<boolean | null>(null);

  const [typedAnswer, setTypedAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  const { isReady, runCode } = usePyodide();

  useEffect(() => {
    // Reset inputs when question changes
    setCode(question?.type === "coding" && question.initialCode ? question.initialCode : "");
    setTypedAnswer("");
    setSelectedOption(null);
    setTestResult(null);
    setTerminalLines([]);
  }, [currentQuestionIndex, question]);

  if (!challenge) return <div>Challenge not found</div>;

  const handleRun = async () => {
    if (!isReady || !question || question.type !== "coding") return;
    setIsTyping(true);
    setTerminalLines([{ text: "python solution.py", type: "command" }]);
    try {
      const res = await runCode(code);
      setTerminalLines(prev => [...prev, { text: res }]);
    } catch (e: any) {
      setTerminalLines(prev => [...prev, { text: e.message, type: "error" }]);
    }
    setIsTyping(false);
    setTestResult(null); 
  };

  const handleCompleteQuestion = () => {
    if (currentQuestionIndex < challenge.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Challenge complete!
      updateState(prev => {
        const solved = new Set(prev.progress.challengesSolved);
        solved.add(challenge.id);
        
        const unlocked = new Set(prev.progress.unlocked);
        const next = challenges[challengeIndex + 1];
        if (next) unlocked.add(next.id);
        
        return {
          ...prev,
          progress: {
            ...prev.progress,
            challengesSolved: Array.from(solved),
            unlocked: Array.from(unlocked)
          }
        };
      });
      router.push('/challenge');
    }
  };

  const handleSubmit = async () => {
    if (!question) return;
    if (question.type === "multiple-choice") {
      if (selectedOption === question.correctIndex) {
        setTestResult(true);
      } else {
        setTestResult(false);
      }
      return;
    }

    if (question.type === "typed-answer") {
      if (question.correctAnswers.some(ans => ans.toLowerCase() === typedAnswer.trim().toLowerCase())) {
        setTestResult(true);
      } else {
        setTestResult(false);
      }
      return;
    }

    if (question.type === "coding") {
      if (!isReady) return;
      setIsTyping(true);
      setTerminalLines([{ text: "python -m pytest", type: "command" }]);
      
      let allPassed = true;
      let failedCases = 0;
      
      for (let i = 0; i < question.tests.length; i++) {
        const test = question.tests[i];
        try {
          const wrappedCode = test.input ? 
            `\nimport sys, builtins\nclass MockInput:\n    def __init__(self, val):\n        self.val = val\n    def __call__(self, prompt=""):\n        return self.val\nbuiltins.input = MockInput(${JSON.stringify(test.input.trim())})\n${code}\n` : code;

          const res = await runCode(wrappedCode);
          if (res === test.assertStdout) {
            setTerminalLines(prev => [...prev, { text: `test_${i} .......... [PASS]`, type: "success" }]);
          } else {
            allPassed = false;
            failedCases++;
            setTerminalLines(prev => [...prev, { text: `test_${i} .......... [FAIL]\nExpected: ${test.assertStdout}\nGot: ${res}`, type: "error" }]);
          }
        } catch (e: any) {
          allPassed = false;
          failedCases++;
          setTerminalLines(prev => [...prev, { text: `test_${i} .......... [FAIL] (Error)`, type: "error" }]);
        }
      }
      
      setTerminalLines(prev => [...prev, { text: `\n${question.tests.length - failedCases} passed, ${failedCases} failed` }]);
      setTestResult(allPassed);
      setIsTyping(false);
    }
  };

  const renderCodingEditor = () => (
    <div className="flex flex-col gap-4 min-h-0 flex-1">
      <div className="bg-surface-2 border border-border rounded-2xl flex flex-col overflow-hidden flex-1 min-h-0">
        <div className="bg-white/5 border-b border-border px-4 py-2 flex items-center justify-between font-mono text-xs text-muted">
          <span>solution.py</span>
        </div>
        <div className="flex-1 flex relative min-h-0">
          <div className="w-10 bg-white/5 border-r border-border font-mono text-[13px] leading-[1.5] text-muted/50 select-none overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 pt-4 pr-2 flex flex-col items-end" style={{ transform: `translateY(-${scrollTop}px)` }}>
              {code.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
            </div>
          </div>
          <textarea 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
            className="w-full h-full bg-transparent p-4 text-white font-mono text-[13px] outline-none resize-none leading-[1.5]"
            spellCheck={false}
          />
        </div>
        
        <div className="bg-surface border-t border-border p-4 flex items-center gap-4">
          <button 
            onClick={handleRun}
            disabled={!isReady}
            className="px-6 py-2 bg-transparent border border-white/20 text-white rounded-xl hover:bg-white/5 transition-colors font-semibold disabled:opacity-50"
          >
            Run
          </button>
          <button 
            onClick={handleSubmit}
            disabled={!isReady}
            className="px-8 py-2 bg-accent text-bg font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Submit
          </button>
          
          {testResult === true && (
            <div className="flex items-center ml-4 gap-4">
              <span className="text-c-string font-bold">all tests passed</span>
              <button
                onClick={handleCompleteQuestion}
                className="px-4 py-1.5 bg-c-string/20 text-c-string font-bold rounded-lg hover:bg-c-string/30 transition-colors"
              >
                Next {"->"}
              </button>
            </div>
          )}
          {testResult === false && <span className="text-c-danger ml-4 font-bold">some tests failed</span>}
        </div>
      </div>

      {/* Terminal */}
      <div className="h-48">
        <Terminal 
          lines={terminalLines}
          prompt=""
          isTyping={isTyping}
        />
      </div>
    </div>
  );

  const renderSimpleQuestionControls = () => (
    <div className="mt-8 pt-6 border-t border-border flex items-center justify-between">
      <button 
        onClick={handleSubmit}
        className="px-8 py-2 bg-accent text-bg font-bold rounded-xl hover:opacity-90 transition-opacity"
      >
        Submit Answer
      </button>

      {testResult === true && (
        <div className="flex items-center gap-4 animate-in fade-in">
          <span className="text-c-string font-bold flex items-center gap-2">
            <CheckCircle className="w-5 h-5" /> Correct
          </span>
          <button
            onClick={handleCompleteQuestion}
            className="px-4 py-1.5 bg-c-string/20 text-c-string font-bold rounded-lg hover:bg-c-string/30 transition-colors"
          >
            Next {"->"}
          </button>
        </div>
      )}
    </div>
  );

  const renderMultipleChoice = (q: typeof question & { type: "multiple-choice" }) => (
    <div className="flex flex-col gap-4 flex-1">
      <div className="bg-surface-2 border border-border rounded-2xl p-6 flex flex-col flex-1">
        <div className="space-y-3 mt-4">
          {q.options.map((opt: string, i: number) => (
            <button
              key={i}
              onClick={() => setSelectedOption(i)}
              className={clsx(
                "w-full text-left px-6 py-4 rounded-xl border transition-all",
                selectedOption === i ? "border-accent bg-accent/10" : "border-border hover:border-accent/50 bg-surface",
                testResult === true && selectedOption === i && "border-c-string bg-c-string/10",
                testResult === false && selectedOption === i && "border-c-danger bg-c-danger/10"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={clsx(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                  selectedOption === i ? "border-accent" : "border-muted"
                )}>
                  {selectedOption === i && <div className="w-3 h-3 rounded-full bg-accent" />}
                </div>
                <span className="text-white font-sans text-[15px]">{opt}</span>
              </div>
            </button>
          ))}
        </div>
        {renderSimpleQuestionControls()}
      </div>
    </div>
  );

  const renderTypedAnswer = (q: typeof question & { type: "typed-answer" }) => (
    <div className="flex flex-col gap-4 flex-1">
      <div className="bg-surface-2 border border-border rounded-2xl p-6 flex flex-col flex-1">
        <div className="mt-8">
          <input
            type="text"
            value={typedAnswer}
            onChange={(e) => setTypedAnswer(e.target.value)}
            className={clsx(
              "w-full bg-surface border-2 rounded-xl px-6 py-4 text-white font-mono text-[16px] outline-none transition-colors",
              testResult === true ? "border-c-string" : testResult === false ? "border-c-danger" : "border-border focus:border-accent"
            )}
            placeholder="Type your answer here..."
            spellCheck={false}
            autoComplete="off"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSubmit();
            }}
          />
        </div>
        {renderSimpleQuestionControls()}
      </div>
    </div>
  );

  return (
    <div className="w-full h-screen bg-bg flex flex-col relative z-50 overflow-hidden">
      {/* Header */}
      <header className="p-6 flex justify-between items-start flex-shrink-0">
        <div>
          <div className="text-white mb-2 font-mono text-[14px]">
            Plankthon\\Home\\Challenge\\Level {challenge.chapter}\\ {challenge.title}
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Challenge {(challengeIndex + 1).toString().padStart(2, '0')} — {challenge.title}
          </h1>
          <div className="text-muted text-sm">
            Question {Math.min(currentQuestionIndex + 1, challenge.questions.length)} of {challenge.questions.length}
          </div>
          <div className="w-64 h-1 mt-4 bg-black/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent rounded-full transition-all duration-500" 
              style={{ width: `${Math.max(5, (currentQuestionIndex / challenge.questions.length) * 100)}%` }} 
            />
          </div>
        </div>
        <Link href="/challenge" className="text-muted hover:text-white transition-colors">
          <X className="w-8 h-8" />
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 pb-6 min-h-0">
        {question && (
          <>
            {/* PROBLEM Column */}
            <div className="bg-surface-2 border border-border rounded-2xl p-6 flex flex-col font-mono text-[13px] overflow-y-auto">
              <div className="text-accent font-bold mb-4">// QUESTION {currentQuestionIndex + 1}</div>
              <h2 className="text-white font-sans font-bold text-xl mb-6">{question.prompt}</h2>
              
              {question.type === "coding" && (
                <>
                  <div className="bg-screen border border-border rounded-xl p-4 mb-6">
                    <div className="text-[10px] text-muted uppercase tracking-wider mb-2">expected output</div>
                    <div className="text-c-string whitespace-pre-wrap">{question.expectedOutput}</div>
                  </div>

                  <div className="text-accent font-bold mb-4">// rules</div>
                  <ul className="text-white space-y-2 mb-8">
                    {question.rules.map((r: string, i: number) => (
                      <li key={i}>- {r}</li>
                    ))}
                  </ul>
                </>
              )}

              <div className="mt-auto pt-6 text-muted border-t border-white/5">
                <span className="text-c-comment"># hint:</span> {question.hint}
              </div>
            </div>

            {/* INTERACTIVE Column */}
            {question.type === "coding" && renderCodingEditor()}
            {question.type === "multiple-choice" && renderMultipleChoice(question as any)}
            {question.type === "typed-answer" && renderTypedAnswer(question as any)}
          </>
        )}
      </div>

      {/* Planky Hint Panel on Fail */}
      {testResult === false && question && (
        <div className="absolute bottom-6 right-6 z-50 bg-surface-2 border border-border rounded-2xl p-4 flex items-center gap-4 animate-in slide-in-from-bottom-2 shadow-2xl max-w-sm">
          <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-8 h-8 text-bg fill-current">
              <circle cx="50" cy="50" r="35" />
              <rect x="25" y="45" width="50" height="10" rx="5" fill="#FFD43B" />
            </svg>
          </div>
          <div>
            <div className="font-mono text-accent font-bold text-[11px] uppercase mb-1">Planky</div>
            <p className="text-white text-[13px]">
              Not quite! {question?.hint}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
