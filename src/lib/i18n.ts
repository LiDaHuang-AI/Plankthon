export const translations = {
  en: {
    run: "Run",
    submit: "Submit",
    submitAnswer: "Submit Answer",
    next: "Next ->",
    nextQuestion: "Next Question ->",
    viewResults: "View Results",
    correct: "Correct",
    incorrect: "Incorrect",
    explanation: "Explanation",
    allTestsPassed: "All tests passed",
    someTestsFailed: "Some tests failed",
    challengeComplete: "Challenge Complete!",
    timeTaken: "Time Taken",
    finish: "Finish",
    loading: "Loading...",
    output: "Output",
    expectedOutput: "expected output",
    rules: "rules",
    hint: "hint",
    question: "QUESTION",
    of: "of"
  },
  th: {
    run: "Run",
    submit: "Submit",
    submitAnswer: "Submit Answer",
    next: "Next ->",
    nextQuestion: "Next Question ->",
    viewResults: "View Results",
    correct: "Correct",
    incorrect: "Incorrect",
    explanation: "Explanation",
    allTestsPassed: "All tests passed",
    someTestsFailed: "Some tests failed",
    challengeComplete: "Challenge Complete!",
    timeTaken: "Time Taken",
    finish: "Finish",
    loading: "Loading...",
    output: "Output",
    expectedOutput: "expected output",
    rules: "rules",
    hint: "hint",
    question: "QUESTION",
    of: "of"
  }
} as const;

export type Language = 'en' | 'th';

export function t(lang: string | undefined | null, key: keyof typeof translations['en']): string {
  const l = (lang === 'th' ? 'th' : 'en') as Language;
  return translations[l][key] || translations['en'][key];
}
