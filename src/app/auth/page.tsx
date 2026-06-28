"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, ArrowRight, X, Frown } from "lucide-react";
import { Tabs } from "@/components/ui/Tabs";
import { AnimatePresence, motion } from "framer-motion";
import { useAppContext } from "../ClientProvider";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { RippleButton } from "@/components/ui/RippleButton";

export default function AuthPage() {
  const router = useRouter();
  const { updateState } = useAppContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <form onSubmit={handleLogin} className="flex flex-col gap-5 mt-2">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold text-text mb-2 tracking-tight">Welcome back</h2>
        <p className="text-[14px] text-muted">Enter your credentials to access your account.</p>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-medium text-text ml-1">Email</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted group-focus-within:text-accent transition-colors">
            <Mail size={18} strokeWidth={2.5} />
          </div>
          <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="m@example.com" className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-border border border-border text-text text-sm outline-none focus:border-accent/50 focus:bg-border transition-all placeholder:text-muted shadow-inner" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-medium text-text ml-1">Password</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted group-focus-within:text-accent transition-colors">
            <Lock size={18} strokeWidth={2.5} />
          </div>
          <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-border border border-border text-text text-sm outline-none focus:border-accent/50 focus:bg-border transition-all placeholder:text-muted shadow-inner" />
        </div>
      </div>
      <button type="submit" className="group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-accent text-black font-bold text-[15px] mt-4 hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(250,204,21,0.2)] hover:shadow-[0_0_25px_rgba(250,204,21,0.4)]">
        Log in <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
      <a href="#" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }} className="text-center text-[13px] text-muted hover:text-text mt-1 transition-colors">Forgot your password?</a>
    </form>
  );

  const registerContent = (
    <form onSubmit={handleRegister} className="flex flex-col gap-5 mt-2">
      <div className="mb-4 text-center">
        <h2 className="text-2xl font-bold text-text mb-2 tracking-tight">Create an account</h2>
        <p className="text-[14px] text-muted">Enter your information to get started.</p>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-medium text-text ml-1">Name</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted group-focus-within:text-accent transition-colors">
            <User size={18} strokeWidth={2.5} />
          </div>
          <input required type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-border border border-border text-text text-sm outline-none focus:border-accent/50 focus:bg-border transition-all placeholder:text-muted shadow-inner" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-medium text-text ml-1">Email</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted group-focus-within:text-accent transition-colors">
            <Mail size={18} strokeWidth={2.5} />
          </div>
          <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="m@example.com" className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-border border border-border text-text text-sm outline-none focus:border-accent/50 focus:bg-border transition-all placeholder:text-muted shadow-inner" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-[13px] font-medium text-text ml-1">Password</label>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-muted group-focus-within:text-accent transition-colors">
            <Lock size={18} strokeWidth={2.5} />
          </div>
          <input required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-border border border-border text-text text-sm outline-none focus:border-accent/50 focus:bg-border transition-all placeholder:text-muted shadow-inner" />
        </div>
      </div>
      <button type="submit" className="group flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-accent text-black font-bold text-[15px] mt-4 hover:brightness-110 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(250,204,21,0.2)] hover:shadow-[0_0_25px_rgba(250,204,21,0.4)]">
        Create account <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
            <h1 className="text-5xl font-bold text-text tracking-tight">
              Plank<span className="text-accent">thon</span>
            </h1>
            <p className="text-lg text-muted">Level up your Python, one line at a time.</p>
          </div>
          
          <div className="mt-4">
            <CodeBlock 
              code="Plankthon [Version 1.0.0]&#10;&#10;>>> print(&quot;Hello, Planky!&quot;)" 
              className="w-full whitespace-pre"
            />
          </div>
        </div>

        {/* Auth Form */}
        <div className="w-full max-w-[460px] bg-surface/70 border border-border backdrop-blur-xl rounded-3xl p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.05)]">
          <Tabs
            tabs={[
              { id: "login", label: "Log in", content: loginContent },
              { id: "register", label: "Create an account", content: registerContent }
            ]}
          />
        </div>
      </div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-screen/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-sm bg-surface border border-border rounded-2xl p-6 shadow-2xl z-10 flex flex-col items-center text-center"
            >
              <RippleButton
                onClick={() => setIsModalOpen(false)}
                aria-label="Close"
                className="absolute top-4 right-4 text-muted hover:text-text transition-colors"
              >
                <X size={20} />
              </RippleButton>
              <div className="w-14 h-14 rounded-full bg-border flex items-center justify-center mb-4 border border-border">
                <Frown className="text-accent" size={28} />
              </div>
              <h3 className="text-xl font-bold text-text mb-2">Uh oh...</h3>
              <p className="text-muted mb-6 text-sm">Sorry bro, we can't help you.</p>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full py-3 rounded-xl bg-border hover:bg-border text-text font-medium text-sm transition-colors active:scale-[0.98]"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
