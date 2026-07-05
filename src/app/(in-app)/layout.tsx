"use client";

import { useAppContext } from "../ClientProvider";
import { FileTree, FileNode } from "@/components/ui/FileTree";
import { User as UserIcon, Monitor, LogOut, ChevronRight, Home, BookOpen, Trophy, Code, Terminal as TerminalIcon } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import clsx from "clsx";
import { lessons } from "@/lib/content/lessons";
import { RippleButton } from "@/components/ui/RippleButton";
import { t } from "@/lib/i18n";

export default function InAppLayout({ children }: { children: React.ReactNode }) {
  const { state, updateState } = useAppContext();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [isResizing, setIsResizing] = useState(false);
  const [confirmNode, setConfirmNode] = useState<FileNode | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      // Limit the width between 200px and 600px
      const newWidth = Math.min(Math.max(e.clientX, 200), 600);
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  useEffect(() => {
    if (state && !state.loggedIn) {
      router.push("/auth");
    }
  }, [state?.loggedIn, router]);

  const chapters = Array.from(new Set(lessons.map(l => l.chapter))).sort((a, b) => a - b);

  const learnChildren: FileNode[] = chapters.map(chapterNum => {
    return {
      name: `Chapter ${chapterNum}`,
      type: "folder",
      path: `/learn/chapter-${chapterNum}`,
      children: lessons.filter(l => l.chapter === chapterNum).map(l => {
        let status: "completed" | "locked" | "available" = "locked";
        if (state?.progress.lessonsCompleted.includes(l.id)) {
          status = "completed";
        } else if (state?.progress.unlocked.includes(l.id) || state?.isAdmin) {
          status = "available";
        }
        return { name: l.title + ".lesson", type: "file", path: `/learn/${l.id}`, status };
      })
    };
  });

  const challengeChildren: FileNode[] = chapters.map(chapterNum => {
    return {
      name: `Level ${chapterNum}`,
      type: "folder",
      path: `/challenge/level-${chapterNum}`,
      children: lessons.filter(l => l.chapter === chapterNum).map(l => {
        let status: "completed" | "locked" | "available" = "locked";
        if (state?.progress.challengesSolved?.includes(l.id)) {
          status = "completed";
        } else if (state?.progress.unlocked.includes(l.id) || state?.isAdmin) {
          status = "available";
        }
        return { name: l.title + ".Challenge", type: "file", path: `/challenge/${l.id}`, status };
      })
    };
  });

  const fileTreeData: FileNode[] = [
    {
      name: "Plankthon",
      type: "folder",
      path: "/root",
      children: [
        {
          name: t(state?.settings?.language, 'home'),
          type: "folder",
          path: "/home",
          children: [
            {
              name: t(state?.settings?.language, 'learn'),
              type: "folder",
              path: "/learn",
              children: learnChildren
            },
            {
              name: t(state?.settings?.language, 'challenge'),
              type: "folder",
              path: "/challenge",
              children: challengeChildren
            },
            { name: t(state?.settings?.language, 'coding'), type: "file", path: "/coding" },
            { name: t(state?.settings?.language, 'planky'), type: "file", path: "/planky" },
          ]
        }
      ]
    }
  ];

  const handleFileSelect = (node: FileNode) => {
    if (node.path === "/root") return;
    if (node.name.startsWith("Chapter ") || node.name.startsWith("Level ")) return;

    if (node.name.endsWith(".lesson") || node.name.endsWith(".Challenge")) {
      setConfirmNode(node);
    } else {
      router.push(node.path);
    }
  };

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
                {t(state?.settings?.language, 'adminMode')}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 relative">
            <span className="text-sm font-medium hidden sm:inline">{state?.profile.name}</span>
            <RippleButton
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="w-8 h-8 rounded-full bg-accent/20 text-accent font-semibold flex items-center justify-center hover:bg-accent/30 transition-colors"
            >
              <span className="text-sm">{initials}</span>
            </RippleButton>

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
                      <div className="font-semibold text-text">{state?.profile.name}</div>
                      <div className="text-muted text-xs truncate max-w-[160px]">{state?.account?.email || "user@example.com"}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 divide-x divide-border border-b border-border p-3 text-center">
                    <div>
                      <div className="text-accent font-semibold">{state?.progress.challengesSolved.length}</div>
                      <div className="text-[10px] text-muted">{t(state?.settings?.language, 'challenges')}</div>
                    </div>
                    <div>
                      <div className="text-text font-semibold">{state?.progress.lessonsCompleted.length}</div>
                      <div className="text-[10px] text-muted">{t(state?.settings?.language, 'lessons')}</div>
                    </div>
                    <div>
                      <div className="text-text font-semibold">{state?.progress.accuracy}%</div>
                      <div className="text-[10px] text-muted">{t(state?.settings?.language, 'accuracy')}</div>
                    </div>
                  </div>
                  <div className="flex flex-col p-2">
                    <Link href="/profile" className="px-3 py-2 text-accent bg-border rounded-md flex justify-between items-center group">
                      <span>{t(state?.settings?.language, 'viewProfile')}</span>
                      <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                    </Link>
                    <Link href="/profile/edit" className="px-3 py-2 text-muted hover:text-text rounded-md flex justify-between items-center group transition-colors">
                      <span>{t(state?.settings?.language, 'editProfile')}</span>
                      <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                    </Link>
                    <Link href="/settings" className="px-3 py-2 text-muted hover:text-text rounded-md flex justify-between items-center group transition-colors">
                      <span>{t(state?.settings?.language, 'settings')}</span>
                      <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                    </Link>
                    <div className="h-px bg-border my-1" />
                    <RippleButton hoverScale={1} onClick={handleLogout} className="px-3 py-2 text-c-danger hover:bg-c-danger/10 rounded-md flex justify-between items-center text-left transition-colors">
                      <span>{t(state?.settings?.language, 'logOut')}</span>
                      <ChevronRight className="w-4 h-4 opacity-50" />
                    </RippleButton>
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
          <aside 
            className="flex-shrink-0 bg-surface hidden md:flex flex-col relative select-none border-r border-border"
            style={{ width: sidebarWidth }}
          >
            <div className="p-4 flex-1 overflow-y-auto">
              <FileTree data={fileTreeData} onSelect={handleFileSelect} />
            </div>
            
            {/* Splitter Bar */}
            <div
              className={clsx(
                "absolute top-0 -right-1 bottom-0 w-2 cursor-col-resize z-50 transition-colors",
                isResizing ? "bg-accent/20" : "hover:bg-accent/20"
              )}
              onMouseDown={(e) => {
                e.preventDefault();
                setIsResizing(true);
              }}
            />
          </aside>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto relative">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation - hidden on desktop (sidebar covers it) and on fullscreen lesson/challenge pages */}
      {!isFullscreen && (
        <nav className="md:hidden flex-shrink-0 bg-surface border-t border-border grid grid-cols-5 pb-[env(safe-area-inset-bottom)] z-20">
          {[
            { href: "/home", icon: Home, label: t(state?.settings?.language, 'home') },
            { href: "/learn", icon: BookOpen, label: t(state?.settings?.language, 'learn') },
            { href: "/challenge", icon: Trophy, label: t(state?.settings?.language, 'challenge') },
            { href: "/coding", icon: Code, label: t(state?.settings?.language, 'coding') },
            { href: "/planky", icon: TerminalIcon, label: t(state?.settings?.language, 'planky') },
          ].map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className={clsx(
                  "flex flex-col items-center justify-center gap-0.5 py-2 transition-colors",
                  isActive ? "text-accent" : "text-muted active:text-text"
                )}
              >
                <Icon className={clsx("w-5 h-5", isActive && "drop-shadow-[0_0_6px_rgba(250,204,21,0.5)]")} strokeWidth={isActive ? 2.5 : 2} />
                <span className="text-[10px] font-semibold leading-none">{label}</span>
              </Link>
            );
          })}
        </nav>
      )}

      {/* Custom Run Confirm Modal */}
      {confirmNode && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-surface-2 backdrop-blur-sm p-4">
          <div className="bg-surface-2 border border-border p-6 rounded-2xl shadow-2xl max-w-sm w-full">
            <h3 className="text-xl font-bold text-text mb-2">{t(state?.settings?.language, 'runFile')}</h3>
            <p className="text-muted mb-8 text-[15px]">
              {state?.settings?.language === 'th' ? `ต้องการรันไฟล์ ` : `Do you want to run `}<span className="text-accent font-mono">{confirmNode.name}</span>?
            </p>
            <div className="flex gap-3 justify-end">
              <RippleButton
                onClick={() => setConfirmNode(null)}
                className="px-5 py-2 rounded-lg font-medium text-muted hover:text-text hover:bg-border transition-colors"
              >
                {t(state?.settings?.language, 'cancel')}
              </RippleButton>
              <RippleButton
                onClick={() => {
                  router.push(confirmNode.path);
                  setConfirmNode(null);
                }}
                className="px-5 py-2 rounded-lg font-bold bg-accent text-bg hover:opacity-90 transition-opacity shadow-[0_0_15px_rgba(255,212,59,0.2)]"
              >
                {t(state?.settings?.language, 'run')}
              </RippleButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
