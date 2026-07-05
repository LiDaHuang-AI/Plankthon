import type { Metadata } from "next";
import { DocPage, DocH2, DocP, DocUL } from "@/components/landing/DocPage";

export const metadata: Metadata = {
  title: "Terms of Service — Plankthon",
  description: "The terms and conditions for using Plankthon.",
};

export default function TermsPage() {
  return (
    <DocPage
      title="Terms of Service"
      updated="July 1, 2026"
      intro="These Terms of Service (the &quot;Terms&quot;) govern your access to and use of the Plankthon website and learning platform (the &quot;Service&quot;). Please read them carefully. By creating an account or using the Service, you agree to be bound by these Terms. If you do not agree, you should not use the Service."
    >
      <DocH2>1. Acceptance of these Terms</DocH2>
      <DocP>
        By accessing or using the Service, you confirm that you have read, understood, and agree to be bound by
        these Terms and by our Privacy Policy, which is incorporated here by reference. These Terms form a binding
        agreement between you and Plankthon (&quot;Plankthon,&quot; &quot;we,&quot; &quot;us,&quot; or
        &quot;our&quot;).
      </DocP>

      <DocH2>2. Description of the Service</DocH2>
      <DocP>
        Plankthon provides interactive lessons, coding challenges, an in-browser Python execution environment, and
        an AI mentor intended to help you learn the Python programming language. The Service is provided for
        educational purposes. We may add, change, or remove features at any time as the Service evolves.
      </DocP>

      <DocH2>3. Eligibility</DocH2>
      <DocP>
        You may use the Service only if you are able to form a legally binding agreement with us and are not
        barred from doing so under any applicable laws. If you are using the Service on behalf of a minor, you
        represent that you are their parent or guardian and accept these Terms on their behalf.
      </DocP>

      <DocH2>4. Your account</DocH2>
      <DocP>
        Some features require an account. You agree to provide accurate information when registering and to keep it
        up to date. You are responsible for maintaining the confidentiality of your login credentials and for all
        activity that occurs under your account. Notify us promptly if you believe your account has been accessed
        without authorization. We are not liable for any loss arising from unauthorized use of your account.
      </DocP>

      <DocH2>5. Acceptable use</DocH2>
      <DocP>You agree not to use the Service to:</DocP>
      <DocUL>
        <li>break any applicable law or regulation, or infringe the rights of others;</li>
        <li>attempt to gain unauthorized access to the Service, other accounts, or our systems;</li>
        <li>
          interfere with, disrupt, or place an unreasonable load on the Service, including by running code intended
          to harm, overload, exploit, or circumvent the platform or its execution environment;
        </li>
        <li>upload or transmit malicious code, or attempt to reverse engineer the Service except as permitted by law;</li>
        <li>
          use the Service to generate, store, or distribute unlawful, harmful, harassing, or otherwise
          objectionable content;
        </li>
        <li>scrape, copy, or resell the Service or its content without our permission.</li>
      </DocUL>
      <DocP>
        We may investigate and take appropriate action, including suspending or terminating access, if we believe
        you have violated these Terms.
      </DocP>

      <DocH2>6. Code and content you create</DocH2>
      <DocP>
        You retain ownership of the original code and other content you create using the Service (&quot;Your
        Content&quot;). You are solely responsible for Your Content and for ensuring you have the rights to use it.
        By submitting Your Content to features that process it, such as the AI mentor, you grant us a limited,
        non-exclusive license to use, store, and process it only as necessary to operate and improve the Service.
      </DocP>

      <DocH2>7. Our intellectual property</DocH2>
      <DocP>
        The Service, including its lessons, challenges, text, design, logos, and software, is owned by Plankthon or
        its licensors and is protected by intellectual property laws. Subject to these Terms, we grant you a
        limited, personal, non-transferable, non-exclusive license to access and use the Service for your own
        educational purposes. You may not copy, modify, distribute, or create derivative works from the Service or
        its content except as expressly permitted.
      </DocP>

      <DocH2>8. Third-party services</DocH2>
      <DocP>
        The Service relies on third-party providers, including hosting infrastructure and an AI provider that
        powers the mentor feature. Your use of those features may be subject to the third party&apos;s own terms.
        We are not responsible for the availability, accuracy, or conduct of any third-party service.
      </DocP>

      <DocH2>9. AI-generated guidance</DocH2>
      <DocP>
        The AI mentor produces responses automatically and may sometimes be inaccurate, incomplete, or unsuitable
        for your particular situation. Its output is provided for learning and informational purposes only and
        should not be relied upon as professional advice. Always review and understand any code before you use it
        elsewhere.
      </DocP>

      <DocH2>10. Disclaimers</DocH2>
      <DocP>
        The Service is provided on an &quot;as is&quot; and &quot;as available&quot; basis, without warranties of
        any kind, whether express or implied, including but not limited to warranties of merchantability, fitness
        for a particular purpose, and non-infringement. We do not warrant that the Service will be uninterrupted,
        error-free, or secure, or that any content or guidance will be accurate or complete.
      </DocP>

      <DocH2>11. Limitation of liability</DocH2>
      <DocP>
        To the fullest extent permitted by law, Plankthon and its contributors will not be liable for any
        indirect, incidental, special, consequential, or punitive damages, or for any loss of data, use, or
        goodwill, arising out of or related to your use of, or inability to use, the Service. To the extent any
        liability cannot be excluded, it is limited to the amount you paid us, if any, to use the Service in the
        twelve months before the claim arose.
      </DocP>

      <DocH2>12. Termination</DocH2>
      <DocP>
        You may stop using the Service at any time. We may suspend or terminate your access, with or without
        notice, if we reasonably believe you have violated these Terms or if we discontinue the Service. Upon
        termination, the rights granted to you under these Terms will end, while provisions that by their nature
        should survive, such as intellectual property, disclaimers, and limitation of liability, will remain in
        effect.
      </DocP>

      <DocH2>13. Changes to these Terms</DocH2>
      <DocP>
        We may update these Terms from time to time. When we make material changes, we will update the &quot;Last
        updated&quot; date above and, where appropriate, provide additional notice. Your continued use of the
        Service after changes take effect means you accept the revised Terms.
      </DocP>

      <DocH2>14. Governing law</DocH2>
      <DocP>
        These Terms are governed by the applicable laws of the jurisdiction in which Plankthon operates, without
        regard to conflict-of-law principles. Any disputes will be subject to the exclusive jurisdiction of the
        competent courts of that jurisdiction, unless otherwise required by mandatory local law.
      </DocP>

      <DocH2>15. Contact us</DocH2>
      <DocP>
        If you have any questions about these Terms, please contact us at contact@plankthon.app.
      </DocP>
    </DocPage>
  );
}
