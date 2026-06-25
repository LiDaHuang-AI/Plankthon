"use client";

import { useAppContext } from "../../../ClientProvider";
import { challenges, Question } from "@/lib/content/challenges";
import { useParams, useRouter } from "next/navigation";
import { X, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePyodide } from "@/lib/pyodide/client";
import { Terminal } from "@/components/ui/Terminal";
import { t } from "@/lib/i18n";
import clsx from "clsx";

export default function ChallengeView() {
  const { challengeId } = useParams();
  const { state, updateState } = useAppContext();
  const router = useRouter();
  const lang = state?.settings?.language;
  
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

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [results, setResults] = useState<{ id: string; correct: boolean }[]>([]);
  const [startTime] = useState<Date>(new Date());
  const [showSummary, setShowSummary] = useState(false);
  
  const { isReady, runCode } = usePyodide();

  useEffect(() => {
    // Reset inputs when question changes
    setCode(question?.type === "coding" && question.initialCode ? question.initialCode : "");
    setTypedAnswer("");
    setSelectedOption(null);
    setTestResult(null);
    setIsSubmitted(false);
    setTerminalLines([]);
  }, [currentQuestionIndex, question]);

  if (!challenge) return <div>Challenge not found</div>;

  const getExplanation = () => {
    if (!question) return "";
    
    // Use localized explanation if available
    const exp = lang === 'th' && question.explanation_th ? question.explanation_th : question.explanation;
    if (exp) return exp;

    const hint = lang === 'th' && question.hint_th ? question.hint_th : question.hint;

    if (testResult === true) {
      if (question.type === "multiple-choice") {
        return `${t(lang, 'correct')}!`;
      } else if (question.type === "typed-answer") {
        return `${t(lang, 'correct')}!`;
      } else {
        return `${t(lang, 'correct')}!`;
      }
    } else {
      if (question.type === "multiple-choice") {
        return `${t(lang, 'incorrect')}. ${hint}`;
      } else if (question.type === "typed-answer") {
        return `${t(lang, 'incorrect')}. ${hint}`;
      } else {
        return `${t(lang, 'incorrect')}. ${hint}`;
      }
    }
  };

  const handleRun = async () => {
    if (!isReady || !question || question.type !== "coding") return;
    setIsTyping(true);
    setTerminalLines([{ text: "python solution.py", type: "command" }]);
    try {
      let fullOutput = "";
      await runCode(code, (text) => { fullOutput += text; });
      setTerminalLines(prev => [...prev, { text: fullOutput }]);
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
      setShowSummary(true);
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
    }
  };

  const handleSubmit = async () => {
    if (!question || isSubmitted) return;
    
    let correct = false;

    if (question.type === "multiple-choice") {
      correct = selectedOption === question.correctIndex;
    } else if (question.type === "typed-answer") {
      correct = question.correctAnswers.some(ans => ans.toLowerCase() === typedAnswer.trim().toLowerCase());
    } else if (question.type === "coding") {
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

          let fullOutput = "";
          await runCode(wrappedCode, (text) => { fullOutput += text; });
          if (fullOutput === test.assertStdout) {
            setTerminalLines(prev => [...prev, { text: `test_${i} .......... [PASS]`, type: "success" }]);
          } else {
            allPassed = false;
            failedCases++;
            setTerminalLines(prev => [...prev, { text: `test_${i} .......... [FAIL]\nExpected: ${test.assertStdout}\nGot: ${fullOutput}`, type: "error" }]);
          }
        } catch (e: any) {
          allPassed = false;
          failedCases++;
          setTerminalLines(prev => [...prev, { text: `test_${i} .......... [FAIL] (Error)`, type: "error" }]);
        }
      }
      
      setTerminalLines(prev => [...prev, { text: `\n${question.tests.length - failedCases} passed, ${failedCases} failed` }]);
      correct = allPassed;
      setIsTyping(false);
    }
    
    setTestResult(correct);
    setIsSubmitted(true);
    setResults(prev => [...prev, { id: question.id, correct }]);
  };

  const renderCodingEditor = () => (
    <div className="flex flex-col gap-4 min-h-0 flex-1">
      <div className="bg-surface-2 border border-border rounded-2xl flex flex-col overflow-hidden flex-1 min-h-0">
        <div className="bg-border border-b border-border px-4 py-2 flex items-center justify-between font-mono text-xs text-muted">
          <span>solution.py</span>
        </div>
        <div className="flex-1 flex relative min-h-0">
          <div className="w-10 bg-border border-r border-border font-mono text-[13px] leading-[1.5] text-muted/50 select-none overflow-hidden relative">
            <div className="absolute top-0 left-0 right-0 pt-4 pr-2 flex flex-col items-end" style={{ transform: `translateY(-${scrollTop}px)` }}>
              {code.split('\n').map((_, i) => <div key={i}>{i + 1}</div>)}
            </div>
          </div>
          <textarea 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
            className="w-full h-full bg-transparent p-4 text-text font-mono text-[13px] outline-none resize-none leading-[1.5]"
            spellCheck={false}
            readOnly={isSubmitted}
          />
        </div>
        
        <div className="bg-surface border-t border-border p-4 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleRun}
              disabled={!isReady || isSubmitted}
              className="px-6 py-2 bg-transparent border border-border text-text rounded-xl hover:bg-border transition-colors font-semibold disabled:opacity-50"
            >
              {t(lang, 'run')}
            </button>
            {!isSubmitted && (
              <button 
                onClick={handleSubmit}
                disabled={!isReady}
                className="px-8 py-2 bg-accent text-bg font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {t(lang, 'submit')}
              </button>
            )}
          </div>
          
          {isSubmitted && (
            <div className="flex flex-col gap-4 animate-in fade-in">
              <div className="flex items-center gap-4">
                {testResult === true ? (
                  <span className="text-c-string font-bold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" /> {t(lang, 'allTestsPassed')}
                  </span>
                ) : (
                  <span className="text-c-danger font-bold flex items-center gap-2">
                    <X className="w-5 h-5" /> {t(lang, 'someTestsFailed')}
                  </span>
                )}
                <button
                  onClick={handleCompleteQuestion}
                  className="px-6 py-2 bg-accent text-bg font-bold rounded-xl hover:opacity-90 transition-colors ml-auto"
                >
                  {currentQuestionIndex < (challenge?.questions.length ?? 1) - 1 ? t(lang, 'nextQuestion') : t(lang, 'viewResults')}
                </button>
              </div>
              <div className="bg-screen border border-border rounded-xl p-4 text-[14px]">
                <span className="text-muted font-bold block mb-1">{t(lang, 'explanation')}:</span>
                <span className="text-text whitespace-pre-wrap">{getExplanation()}</span>
              </div>
            </div>
          )}
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
    <div className="mt-8 pt-6 border-t border-border flex flex-col gap-4">
      {!isSubmitted ? (
        <button 
          onClick={handleSubmit}
          className="px-8 py-2 bg-accent text-bg font-bold rounded-xl hover:opacity-90 transition-opacity self-start"
        >
          {t(lang, 'submitAnswer')}
        </button>
      ) : (
        <div className="flex flex-col gap-4 animate-in fade-in">
          <div className="flex items-center gap-4">
            {testResult === true ? (
              <span className="text-c-string font-bold flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> {t(lang, 'correct')}
              </span>
            ) : (
              <span className="text-c-danger font-bold flex items-center gap-2">
                <X className="w-5 h-5" /> {t(lang, 'incorrect')}
              </span>
            )}
            <button
              onClick={handleCompleteQuestion}
              className="px-6 py-2 bg-accent text-bg font-bold rounded-xl hover:opacity-90 transition-colors ml-auto"
            >
              {currentQuestionIndex < (challenge?.questions.length ?? 1) - 1 ? t(lang, 'nextQuestion') : t(lang, 'viewResults')}
            </button>
          </div>
          <div className="bg-surface border border-border rounded-xl p-4 text-[14px]">
            <span className="text-muted font-bold block mb-1">{t(lang, 'explanation')}:</span>
            <span className="text-text whitespace-pre-wrap">{getExplanation()}</span>
          </div>
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
              onClick={() => !isSubmitted && setSelectedOption(i)}
              disabled={isSubmitted}
              className={clsx(
                "w-full text-left px-6 py-4 rounded-xl border transition-all",
                selectedOption === i ? "border-accent bg-accent/10" : "border-border hover:border-accent/50 bg-surface",
                isSubmitted && selectedOption === i && "opacity-80",
                testResult === true && selectedOption === i && "border-c-string bg-c-string/10",
                testResult === false && selectedOption === i && "border-c-danger bg-c-danger/10",
                isSubmitted && "cursor-default"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={clsx(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                  selectedOption === i ? "border-accent" : "border-muted"
                )}>
                  {selectedOption === i && <div className="w-3 h-3 rounded-full bg-accent" />}
                </div>
                <span className="text-text font-sans text-[15px]">{opt}</span>
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
              "w-full bg-surface border-2 rounded-xl px-6 py-4 text-text font-mono text-[16px] outline-none transition-colors",
              testResult === true ? "border-c-string" : testResult === false ? "border-c-danger" : "border-border focus:border-accent",
              isSubmitted && "opacity-80"
            )}
            placeholder="Type your answer here..."
            spellCheck={false}
            autoComplete="off"
            disabled={isSubmitted}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !isSubmitted) handleSubmit();
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
          <div className="text-text mb-2 font-mono text-[14px]">
            Plankthon\\Home\\Challenge\\Level {challenge.chapter}\\ {challenge.title}
          </div>
          <h1 className="text-3xl font-bold text-text mb-2">
            Challenge {(challengeIndex + 1).toString().padStart(2, '0')} — {challenge.title}
          </h1>
          <div className="text-muted text-sm">
            {t(lang, 'question')} {Math.min(currentQuestionIndex + 1, challenge.questions.length)} {t(lang, 'of')} {challenge.questions.length}
          </div>
          <div className="w-64 h-1 mt-4 bg-surface-2 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent rounded-full transition-all duration-500" 
              style={{ width: `${Math.max(5, (currentQuestionIndex / challenge.questions.length) * 100)}%` }} 
            />
          </div>
        </div>
        <Link href="/challenge" className="text-muted hover:text-text transition-colors">
          <X className="w-8 h-8" />
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 px-6 pb-6 min-h-0">
        {question && (
          <>
            {/* PROBLEM Column */}
            <div className="bg-surface-2 border border-border rounded-2xl p-6 flex flex-col font-mono text-[13px] overflow-y-auto">
              <div className="text-accent font-bold mb-4">// {t(lang, 'question').toUpperCase()} {currentQuestionIndex + 1}</div>
              <h2 className="text-text font-sans font-bold text-xl mb-6">{lang === 'th' && question.prompt_th ? question.prompt_th : question.prompt}</h2>
              
              {question.type === "coding" && (
                <>
                  <div className="bg-screen border border-border rounded-xl p-4 mb-6">
                    <div className="text-[10px] text-muted uppercase tracking-wider mb-2">{t(lang, 'expectedOutput')}</div>
                    <div className="text-c-string whitespace-pre-wrap">{question.expectedOutput}</div>
                  </div>

                  <div className="text-accent font-bold mb-4">// {t(lang, 'rules')}</div>
                  <ul className="text-text space-y-2 mb-8">
                    {question.rules.map((r: string, i: number) => (
                      <li key={i}>- {r}</li>
                    ))}
                  </ul>
                </>
              )}

              <div className="mt-auto pt-6 text-muted border-t border-border">
                <span className="text-c-comment"># {t(lang, 'hint')}:</span> {lang === 'th' && question.hint_th ? question.hint_th : question.hint}
              </div>
            </div>

            {/* INTERACTIVE Column */}
            {question.type === "coding" && renderCodingEditor()}
            {question.type === "multiple-choice" && renderMultipleChoice(question as any)}
            {question.type === "typed-answer" && renderTypedAnswer(question as any)}
          </>
        )}
      </div>

      {/* Planky Hint Panel on Fail - Removed because we use explanations now */}

      {/* Summary Modal */}
      {showSummary && (
        <div className="fixed inset-0 z-[100] bg-surface-2 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-surface-2 border border-border rounded-3xl p-8 max-w-md w-full shadow-2xl flex flex-col items-center text-center animate-in zoom-in-95">
            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-bg" />
            </div>
            <h2 className="text-3xl font-bold text-text mb-2">{t(lang, 'challengeComplete')}</h2>
            <p className="text-muted mb-8">{challenge.title}</p>
            
            <div className="w-full grid grid-cols-2 gap-4 mb-8">
              <div className="bg-surface border border-border rounded-2xl p-4 flex flex-col items-center">
                <span className="text-3xl font-bold text-c-string mb-1">{results.filter(r => r.correct).length}</span>
                <span className="text-muted text-xs uppercase tracking-wider font-bold">{t(lang, 'correct')}</span>
              </div>
              <div className="bg-surface border border-border rounded-2xl p-4 flex flex-col items-center">
                <span className="text-3xl font-bold text-c-danger mb-1">{results.filter(r => !r.correct).length}</span>
                <span className="text-muted text-xs uppercase tracking-wider font-bold">{t(lang, 'incorrect')}</span>
              </div>
              <div className="col-span-2 bg-surface border border-border rounded-2xl p-4 flex flex-col items-center">
                <span className="text-2xl font-bold text-text mb-1">
                  {Math.floor((new Date().getTime() - startTime.getTime()) / 60000)}m {Math.floor(((new Date().getTime() - startTime.getTime()) % 60000) / 1000)}s
                </span>
                <span className="text-muted text-xs uppercase tracking-wider font-bold">{t(lang, 'timeTaken')}</span>
              </div>
            </div>
            
            <button
              onClick={() => router.push('/challenge')}
              className="w-full py-4 bg-accent text-bg font-bold text-lg rounded-xl hover:opacity-90 transition-opacity"
            >
              {t(lang, 'finish')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
