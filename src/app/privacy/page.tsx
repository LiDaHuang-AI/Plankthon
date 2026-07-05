import type { Metadata } from "next";
import { DocPage, DocH2, DocP, DocUL } from "@/components/landing/DocPage";

export const metadata: Metadata = {
  title: "Privacy Policy — Plankthon",
  description: "How Plankthon collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <DocPage
      title="Privacy Policy"
      updated="July 1, 2026"
      intro="This Privacy Policy explains what information Plankthon collects when you use our website and learning platform, how we use it, who we share it with, and the choices you have. We have tried to write it in plain language. By using Plankthon, you agree to the practices described here."
    >
      <DocH2>1. Who we are</DocH2>
      <DocP>
        Plankthon (&quot;Plankthon,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides an
        interactive platform for learning the Python programming language in a web browser. This policy applies to
        the Plankthon website and application (together, the &quot;Service&quot;). It does not apply to any
        third-party websites or services that may be linked from the Service.
      </DocP>

      <DocH2>2. Information we collect</DocH2>
      <DocP>
        We aim to collect only what we need to operate the Service and help you learn. The categories of
        information we may collect are described below.
      </DocP>
      <DocUL>
        <li>
          <strong className="text-white">Account information.</strong> When you create an account, you provide an
          email address and a password, and you may optionally provide a display name. Your password is never
          stored in readable form.
        </li>
        <li>
          <strong className="text-white">Learning and progress data.</strong> As you complete lessons and
          challenges, the Service records information such as which lessons you have finished, your streaks, and
          activity history so that it can show your progress and keep you on track. Much of this information is
          stored locally in your own browser.
        </li>
        <li>
          <strong className="text-white">Code you write.</strong> Code you enter into the interactive editor runs
          inside your browser. When you ask the AI mentor for help, the relevant code and messages you send are
          transmitted so a response can be generated (see &quot;AI assistant&quot; below).
        </li>
        <li>
          <strong className="text-white">Technical information.</strong> Like most websites, we and our hosting
          providers may automatically receive standard technical data such as your browser type, device type,
          approximate region, and the pages you visit, which helps us keep the Service secure and reliable.
        </li>
      </DocUL>
      <DocP>
        We do not intentionally collect sensitive personal information, and we ask that you do not enter such
        information into lessons, code, or messages.
      </DocP>

      <DocH2>3. How we use your information</DocH2>
      <DocP>We use the information we collect to:</DocP>
      <DocUL>
        <li>provide, maintain, and improve the Service and your learning experience;</li>
        <li>create and secure your account and remember your progress;</li>
        <li>respond to your requests to the AI mentor and generate relevant guidance;</li>
        <li>monitor for abuse, diagnose problems, and keep the Service safe and stable;</li>
        <li>communicate with you about important changes, security matters, or support requests.</li>
      </DocUL>
      <DocP>
        We do not sell your personal information, and we do not use the content of your code or messages to build
        advertising profiles.
      </DocP>

      <DocH2>4. Local storage in your browser</DocH2>
      <DocP>
        A significant part of Plankthon is designed to work directly in your browser. Your settings and much of
        your learning progress are saved locally using your browser&apos;s storage, which means that data stays on
        your device. If you clear your browser storage or use a different device or browser, that locally stored
        information may not be available.
      </DocP>

      <DocH2>5. AI assistant</DocH2>
      <DocP>
        Plankthon includes an AI mentor, Planky, that can answer questions and offer coding guidance. When you use
        this feature, the messages and code you choose to send are processed by a third-party AI provider on our
        behalf so that a response can be generated. We send only what is needed to produce a helpful reply. Please
        avoid including personal or confidential information in messages to the AI mentor.
      </DocP>

      <DocH2>6. Cookies and similar technologies</DocH2>
      <DocP>
        We use cookies and similar technologies only as needed to operate the Service, such as keeping you signed
        in and remembering your preferences. We do not use them to track you across unrelated websites. Most
        browsers let you control or disable cookies, though some features of the Service may not function properly
        without them.
      </DocP>

      <DocH2>7. Service providers</DocH2>
      <DocP>
        We rely on a small number of trusted third parties to run the Service, such as hosting and infrastructure
        providers and the AI provider that powers the mentor feature. These providers may process information only
        to perform services for us and are expected to protect it. We are not responsible for the independent
        privacy practices of any third party that operates outside of the Service.
      </DocP>

      <DocH2>8. Data retention</DocH2>
      <DocP>
        We keep account and progress information for as long as your account is active or as needed to provide the
        Service. Information stored locally in your browser remains until you clear it. When information is no
        longer needed, we take reasonable steps to delete it or render it anonymous.
      </DocP>

      <DocH2>9. Security</DocH2>
      <DocP>
        We take reasonable technical and organizational measures to protect your information against loss, misuse,
        and unauthorized access. However, no method of transmission or storage is completely secure, and we cannot
        guarantee absolute security. You are responsible for keeping your account credentials confidential.
      </DocP>

      <DocH2>10. Children&apos;s privacy</DocH2>
      <DocP>
        The Service is intended for a general audience and is not directed at young children. If you believe a
        child has provided us with personal information without appropriate consent, please contact us so we can
        take suitable action, including deleting that information where required.
      </DocP>

      <DocH2>11. Your rights and choices</DocH2>
      <DocP>
        Depending on where you live, you may have rights to access, correct, delete, or restrict the use of your
        personal information, or to object to certain processing. You can update or remove much of your data
        directly within the Service, including by clearing your browser storage. To make a request that cannot be
        completed within the Service, contact us using the details below.
      </DocP>

      <DocH2>12. International users</DocH2>
      <DocP>
        Plankthon may be operated from, and information may be processed in, countries other than the one in which
        you live. Data protection laws in those countries may differ from those in your jurisdiction. By using the
        Service, you understand that your information may be transferred and processed in this way.
      </DocP>

      <DocH2>13. Changes to this policy</DocH2>
      <DocP>
        We may update this Privacy Policy from time to time. When we make material changes, we will update the
        &quot;Last updated&quot; date at the top of this page and, where appropriate, provide additional notice.
        Your continued use of the Service after an update means you accept the revised policy.
      </DocP>

      <DocH2>14. Contact us</DocH2>
      <DocP>
        If you have questions about this Privacy Policy or how we handle your information, you can reach us at
        contact@plankthon.app.
      </DocP>
    </DocPage>
  );
}
