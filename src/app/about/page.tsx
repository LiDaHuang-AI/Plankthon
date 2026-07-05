import type { Metadata } from "next";
import { DocPage, DocH2, DocP, DocUL } from "@/components/landing/DocPage";

export const metadata: Metadata = {
  title: "About — Plankthon",
  description: "What Plankthon is, why we built it, and how it helps you learn Python.",
};

export default function AboutPage() {
  return (
    <DocPage
      title="About Plankthon"
      intro="Plankthon is an interactive platform for learning Python directly in your browser. It combines short, structured lessons with hands-on coding challenges and a friendly AI mentor named Planky, so you can move from reading about a concept to actually writing working code in seconds."
    >
      <DocH2>Our mission</DocH2>
      <DocP>
        Learning to program is one of the most valuable skills a person can build today, yet the path to
        getting started is often needlessly discouraging. Beginners are asked to install toolchains, configure
        editors, and wade through hours of passive video before they ever run a single line of code. Plankthon
        exists to remove that friction. Our goal is simple: make the first steps into Python approachable,
        immediate, and genuinely enjoyable, without lowering the bar on what you actually learn.
      </DocP>
      <DocP>
        We believe people learn to code by writing code. Every part of Plankthon is designed around that
        principle. Instead of long lectures, you get focused lessons that each teach one idea and immediately
        ask you to apply it. Instead of a sandbox disconnected from real tooling, you write and run real Python.
      </DocP>

      <DocH2>How Plankthon works</DocH2>
      <DocP>
        The platform is organized into a progressive curriculum. Each chapter introduces new concepts in small,
        digestible steps, and every lesson pairs a short explanation with an interactive exercise that runs your
        code and checks the result. As you advance, you unlock coding challenges that ask you to solve complete
        problems on your own.
      </DocP>
      <DocUL>
        <li>
          <strong className="text-white">Real Python in the browser.</strong> Your code executes using a full
          Python runtime compiled to WebAssembly, so there is nothing to install and nothing to configure. What
          you write is real Python, not a simplified imitation.
        </li>
        <li>
          <strong className="text-white">Guided, structured lessons.</strong> Concepts build on one another in a
          deliberate order, with immediate feedback so misunderstandings are caught early rather than compounding.
        </li>
        <li>
          <strong className="text-white">Hands-on challenges.</strong> Once you have learned the fundamentals,
          you apply them by writing and debugging complete solutions in a built-in coding environment.
        </li>
        <li>
          <strong className="text-white">Planky, your AI mentor.</strong> When you get stuck, Planky offers
          hints, explanations, and guidance tailored to what you are working on, so you can keep making progress
          without simply being handed the answer.
        </li>
        <li>
          <strong className="text-white">Progress that motivates.</strong> Daily streaks and an activity heatmap
          help you build a consistent learning habit and see how far you have come.
        </li>
      </DocUL>

      <DocH2>Who it is for</DocH2>
      <DocP>
        Plankthon is built for anyone taking their first serious steps with Python: complete beginners who have
        never written code, students looking to reinforce what they are studying, and self-taught learners who
        want a structured path instead of a scattered collection of tutorials. No prior programming experience is
        required, and everything runs on a standard modern web browser.
      </DocP>

      <DocH2>Our approach to quality</DocH2>
      <DocP>
        We care about teaching concepts correctly and clearly. Lessons are written to be accurate and honest
        about how Python actually behaves, and the interactive exercises are designed to reward genuine
        understanding rather than guessing. We would rather teach a smaller set of ideas well than rush learners
        through material they will not retain.
      </DocP>

      <DocH2>The name</DocH2>
      <DocP>
        Plankthon is the platform, and Planky is the mentor that guides you through it. The name is a small nod
        to plankton, the tiny organisms that form the base of an entire ecosystem, which felt fitting for a
        product focused on the fundamentals that everything else in programming is built upon.
      </DocP>

      <DocH2>Contact</DocH2>
      <DocP>
        We are always happy to hear from learners. If you have feedback, questions, or ideas for how Plankthon
        could be better, you can reach the team at contact@plankthon.app.
      </DocP>
    </DocPage>
  );
}
