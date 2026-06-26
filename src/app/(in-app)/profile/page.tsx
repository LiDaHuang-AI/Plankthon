"use client";

import { useAppContext } from "@/app/ClientProvider";
import Link from "next/link";
import { User, Mail, Hash, Target, BookOpen, CheckCircle, Edit3, ChevronLeft } from "lucide-react";

export default function ViewProfile() {
  const { state } = useAppContext();
  
  if (!state) return null;

  const initials = state.profile.name
    ? state.profile.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()
    : "U";

  return (
    <div className="flex-1 overflow-y-auto bg-bg text-text p-6 md:p-10 font-mono text-[14px]">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-border pb-6">
          <Link href="/" className="p-2 -ml-2 rounded-lg hover:bg-surface text-muted hover:text-text transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-text tracking-tight">Profile Overview</h1>
        </div>

        {/* Profile Card */}
        <div className="bg-surface-2 border border-border rounded-2xl overflow-hidden shadow-sm">
          <div className="h-32 bg-gradient-to-r from-accent/20 via-surface to-accent/10 border-b border-border relative">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,var(--tw-colors-accent)_1px,transparent_0)] [background-size:20px_20px]" />
          </div>
          
          <div className="px-8 pb-10 relative flex flex-col items-center text-center">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-full bg-accent text-bg flex items-center justify-center text-4xl font-bold border-4 border-surface-2 absolute -top-14 shadow-xl ring-4 ring-accent/20">
              {initials}
            </div>

            <div className="mt-20 mb-6 flex flex-col items-center w-full">
              <h2 className="text-3xl font-bold text-text mb-2">{state.profile.name}</h2>
              <div className="flex items-center gap-4 text-muted">
                <div className="flex items-center gap-1.5 text-accent bg-accent/10 px-3 py-1 rounded-full text-sm font-medium">
                  <Hash className="w-3.5 h-3.5" />
                  <span>{state.profile.handle.replace('@', '')}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-surface border border-border px-3 py-1 rounded-full text-sm">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{state.account?.email || "No email (Local)"}</span>
                </div>
              </div>
            </div>
            
            <Link 
              href="/profile/edit"
              className="flex items-center gap-2 bg-surface hover:bg-border border border-border text-text px-6 py-2.5 rounded-xl transition-colors font-semibold group"
            >
              <Edit3 className="w-4 h-4 group-hover:text-accent transition-colors" />
              <span>Edit Profile</span>
            </Link>
          </div>
        </div>

        {/* Statistics */}
        <div>
          <h3 className="text-lg font-bold text-text mb-6 flex items-center justify-center gap-2 text-center w-full">
            <Target className="w-5 h-5 text-accent" />
            <span>Learning Stats</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Challenges */}
            <div className="bg-surface border border-border rounded-xl p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-text">{state.progress.challengesSolved.length}</div>
              <div className="text-muted text-xs uppercase tracking-wider mt-1">Challenges Solved</div>
            </div>

            {/* Lessons */}
            <div className="bg-surface border border-border rounded-xl p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-text">{state.progress.lessonsCompleted.length}</div>
              <div className="text-muted text-xs uppercase tracking-wider mt-1">Lessons Completed</div>
            </div>

            {/* Accuracy */}
            <div className="bg-surface border border-border rounded-xl p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="text-3xl font-bold text-text">{state.progress.accuracy}%</div>
              <div className="text-muted text-xs uppercase tracking-wider mt-1">Average Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
