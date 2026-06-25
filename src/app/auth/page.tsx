"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Tabs } from "@/components/ui/Tabs";
import { useAppContext } from "../ClientProvider";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function AuthPage() {
  const router = useRouter();
  const { updateState } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    updateState((prev) => ({
      ...prev,
      loggedIn: true,
      account: { email, passwordHash: "mock" }
    }));
    router.push("/home");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const handle = "@" + email.split("@")[0].toLowerCase();
    updateState((prev) => ({
      ...prev,
      loggedIn: true,
      account: { email, passwordHash: "mock" },
      profile: { name: name || "New User", handle, avatar: "" }
    }));
    router.push("/home");
  };

  const loginContent = (
    <form onSubmit={handleLogin} className="flex flex-col gap-4">
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-white mb-1">Welcome back</h2>
        <p className="text-[13px] text-muted">Enter your credentials to access your account.</p>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-400">Email</label>
        <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="m@example.com" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-white/30 focus:bg-white/10 transition-all" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-400">Password</label>
        <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-white/30 focus:bg-white/10 transition-all" />
      </div>
      <button type="submit" className="w-full py-3 rounded-xl bg-white text-black font-semibold text-sm mt-2 hover:opacity-90 active:scale-[0.98] transition-all">
        Log in
      </button>
      <a href="#" className="text-center text-[13px] text-muted hover:text-white mt-2 transition-colors">Forgot your password?</a>
    </form>
  );

  const registerContent = (
    <form onSubmit={handleRegister} className="flex flex-col gap-4">
      <div className="mb-2">
        <h2 className="text-xl font-semibold text-white mb-1">Create an account</h2>
        <p className="text-[13px] text-muted">Enter your information to get started.</p>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-400">Name</label>
        <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-white/30 focus:bg-white/10 transition-all" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-400">Email</label>
        <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="m@example.com" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-white/30 focus:bg-white/10 transition-all" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-medium text-gray-400">Password</label>
        <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-white/30 focus:bg-white/10 transition-all" />
      </div>
      <button type="submit" className="w-full py-3 rounded-xl bg-white text-black font-semibold text-sm mt-2 hover:opacity-90 active:scale-[0.98] transition-all">
        Create account
      </button>
    </form>
  );

  return (
    <div className="w-full h-full flex items-center justify-center bg-[radial-gradient(circle_at_50%_0%,#1a1a24,#000000)] px-6">
      <div className="flex max-w-4xl w-full gap-16 items-center">
        {/* Brand Hero */}
        <div className="flex-1 hidden md:flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <div className="w-24 h-24 bg-[#facc15] rounded-full flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-16 h-16">
                <path d="M 35 35 L 50 50 L 35 65" fill="transparent" stroke="#171717" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="55" y1="65" x2="70" y2="65" stroke="#171717" strokeWidth="8" strokeLinecap="round" />
              </svg>
            </div>
            <h1 className="text-5xl font-bold text-white tracking-tight">
              Plank<span className="text-accent">thon</span>
            </h1>
            <p className="text-lg text-muted">Level up your Python, one line at a time.</p>
          </div>
          
          <div className="mt-4">
            <CodeBlock 
              code="Plankthon [Version 1.0.0]&#10;&#10;>>> print(&quot;Hello, Planky!&quot;)&#10;Hello, Planky!&#10;&#10;_" 
              className="w-full whitespace-pre"
            />
          </div>
        </div>

        {/* Auth Form */}
        <div className="w-full max-w-[380px] bg-[#141414]/70 border border-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.05)]">
          <Tabs
            tabs={[
              { id: "login", label: "Log in", content: loginContent },
              { id: "register", label: "Create an account", content: registerContent }
            ]}
          />
        </div>
      </div>
    </div>
  );
}
