import { chapter1 } from "./challenges/chapter1";
import { chapter2 } from "./challenges/chapter2";
import { chapter3 } from "./challenges/chapter3";

export type BaseQuestion = {
  id: string;
  prompt: string;
  prompt_th?: string;
  hint: string;
  hint_th?: string;
  explanation?: string;
  explanation_th?: string;
};

export type MultipleChoiceQuestion = BaseQuestion & {
  type: "multiple-choice";
  options: string[];
  correctIndex: number;
};

export type TypedAnswerQuestion = BaseQuestion & {
  type: "typed-answer";
  correctAnswers: string[];
};

export type CodingQuestion = BaseQuestion & {
  type: "coding";
  expectedOutput: string;
  initialCode?: string;
  rules: string[];
  tests: {
    input?: string;
    assertStdout: string;
  }[];
};

export type Question = MultipleChoiceQuestion | TypedAnswerQuestion | CodingQuestion;

export type Challenge = {
  id: string;
  chapter: number;
  title: string;
  questions: Question[];
};

export const challenges: Challenge[] = [
  ...chapter1,
  ...chapter2,
  ...chapter3
];
