import { chapter1 } from "./lessons/chapter1";
import { chapter2 } from "./lessons/chapter2";
import { chapter3 } from "./lessons/chapter3";

export type LessonPage = {
  title: string;
  explanation: string;
  exampleCode?: string;
  expectedOutput?: string;
  exercise?: {
    prompt: string;
    starter: string;
    check: string;
  };
  hint?: string;
};

export type Lesson = {
  id: string;
  chapter: number;
  title: string;
  pages: LessonPage[];
};

export const lessons: Lesson[] = [
  ...chapter1,
  ...chapter2,
  ...chapter3
];
