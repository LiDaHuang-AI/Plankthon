"use client";

import { useAppContext } from "../ClientProvider";
import { FileTree, FileNode } from "@/components/ui/FileTree";
import { User as UserIcon, Monitor, LogOut, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";

export default function InAppLayout({ children }: { children: React.ReactNode }) {
  const { state, updateState } = useAppContext();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (state && !state.loggedIn) {
      router.push("/auth");
    }
  }, [state?.loggedIn, router]);

  const fileTreeData: FileNode[] = [
    {
      name: "Plankthon",
      type: "folder",
      path: "/root",
      children: [
        {
          name: "Home",
          type: "folder",
          path: "/home-root",
          children: [
            { name: "Challenge", type: "file", path: "/challenge" },
            { name: "Learn", type: "file", path: "/learn" },
            { name: "Coding", type: "file", path: "/coding" },
            { name: "Planky", type: "file", path: "/planky" },
          ]
        }
      ]
    }
  ];

  const handleLogout = () => {
    updateState(prev => ({ ...prev, loggedIn: false, account: null }));
    router.push("/auth");
  };

  const isFullscreen = pathname.match(/\/(learn|challenge)\/[^/]+$/);

  // Generate initials for avatar
  const initials = state?.profile.name 
    ? state.profile.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase()
    : "U";

  return (
    <div className="w-full h-full flex flex-col bg-bg text-text">
      {/* Top Bar - hidden on fullscreen */}
      {!isFullscreen && (
        <header className="h-14 flex items-center justify-between px-4 bg-surface border-b border-border z-20">
          <div className="flex items-center gap-4">
            <Link href="/home" className="w-10 h-10 bg-[#facc15] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
              <svg viewBox="0 0 100 100" className="w-6 h-6">
                <path d="M 35 35 L 50 50 L 35 65" fill="transparent" stroke="#171717" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="55" y1="65" x2="70" y2="65" stroke="#171717" strokeWidth="10" strokeLinecap="round" />
              </svg>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="font-bold text-lg tracking-wider">-Plankthon-</div>
            {state?.isAdmin && (
              <div className="text-c-danger font-bold text-xs border border-c-danger px-2 py-0.5 rounded uppercase animate-pulse">
                Admin Mode
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 relative">
            <span className="text-sm font-medium">{state?.profile.name}</span>
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-8 h-8 rounded-full bg-accent/20 text-accent font-semibold flex items-center justify-center hover:bg-accent/30 transition-colors"
            >
              <span className="text-sm">{initials}</span>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)} />
                <div className="absolute top-12 right-0 w-64 bg-surface-2 border border-border rounded-xl shadow-xl z-50 overflow-hidden text-[14px]">
                  <div className="p-4 border-b border-border flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-accent text-bg flex items-center justify-center text-xl font-bold">
                      {initials}
                    </div>
                    <div>
                      <div className="font-semibold text-white">{state?.profile.name}</div>
                      <div className="text-muted text-xs truncate max-w-[160px]">{state?.account?.email || "user@example.com"}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 divide-x divide-border border-b border-border p-3 text-center">
                    <div>
                      <div className="text-accent font-semibold">{state?.progress.challengesSolved.length}</div>
                      <div className="text-[10px] text-muted">challenges</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{state?.progress.lessonsCompleted.length}</div>
                      <div className="text-[10px] text-muted">lessons</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold">{state?.progress.accuracy}%</div>
                      <div className="text-[10px] text-muted">accuracy</div>
                    </div>
                  </div>
                  <div className="flex flex-col p-2">
                    <Link href="#" className="px-3 py-2 text-accent bg-white/5 rounded-md flex justify-between items-center group">
                      <span>View profile</span>
                      <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                    </Link>
                    <Link href="#" className="px-3 py-2 text-muted hover:text-white rounded-md flex justify-between items-center group transition-colors">
                      <span>Edit profile</span>
                      <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                    </Link>
                    <Link href="/settings" className="px-3 py-2 text-muted hover:text-white rounded-md flex justify-between items-center group transition-colors">
                      <span>Settings</span>
                      <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                    </Link>
                    <div className="h-px bg-border my-1" />
                    <button onClick={handleLogout} className="px-3 py-2 text-c-danger hover:bg-c-danger/10 rounded-md flex justify-between items-center text-left transition-colors">
                      <span>Log out</span>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - hidden on fullscreen */}
        {!isFullscreen && (
          <aside className="w-64 flex-shrink-0 bg-surface border-r border-border hidden md:flex flex-col">
            <div className="p-4 flex-1 overflow-y-auto">
              <FileTree data={fileTreeData} />
            </div>
          </aside>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto relative">
          {children}
        </main>
      </div>
    </div>
  );
}
