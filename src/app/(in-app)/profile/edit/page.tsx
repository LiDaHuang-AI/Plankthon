"use client";

import { useAppContext } from "@/app/ClientProvider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { User, AtSign, ChevronLeft, Save } from "lucide-react";
import { RippleButton } from "@/components/ui/RippleButton";

export default function EditProfile() {
  const { state, updateState } = useAppContext();
  const router = useRouter();
  
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");

  useEffect(() => {
    if (state?.profile) {
      setName(state.profile.name);
      setHandle(state.profile.handle);
    }
  }, [state?.profile]);

  if (!state) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Ensure handle starts with @
    const formattedHandle = handle.startsWith("@") ? handle : `@${handle}`;

    updateState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        name: name.trim() || "New User",
        handle: formattedHandle.trim() || "@newuser",
      }
    }));
    
    router.push("/profile");
  };

  return (
    <div className="flex-1 overflow-y-auto bg-bg text-text p-6 md:p-10 font-mono text-[14px]">
      <div className="max-w-xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4 border-b border-border pb-6">
          <Link href="/profile" className="p-2 -ml-2 rounded-lg hover:bg-surface text-muted hover:text-text transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-text tracking-tight">Edit Profile</h1>
        </div>

        <div className="bg-surface-2 border border-border rounded-2xl p-6 md:p-8 shadow-sm">
          <form onSubmit={handleSave} className="space-y-6">
            
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-semibold text-text">
                Display Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2.5 text-text focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  placeholder="e.g. Grace Hopper"
                />
              </div>
              <p className="text-xs text-muted">This is your public display name.</p>
            </div>

            {/* Handle Field */}
            <div className="space-y-2">
              <label htmlFor="handle" className="block text-sm font-semibold text-text">
                Username Handle
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted">
                  <AtSign className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="handle"
                  value={handle.replace("@", "")}
                  onChange={(e) => setHandle(e.target.value)}
                  className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2.5 text-text focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                  placeholder="e.g. gracehopper"
                />
              </div>
              <p className="text-xs text-muted">Unique identifier used in leaderboards or sharing.</p>
            </div>

            {/* Email (Read-only for now unless integrated with auth) */}
            <div className="space-y-2 opacity-70">
              <label className="block text-sm font-semibold text-text">
                Email Address
              </label>
              <input
                type="text"
                disabled
                value={state.account?.email || "No email registered (Local Mode)"}
                className="w-full bg-surface/50 border border-border rounded-lg px-4 py-2.5 text-muted cursor-not-allowed"
              />
              <p className="text-xs text-muted">Email address cannot be changed from this screen.</p>
            </div>

            {/* Actions */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-border">
              <Link
                href="/profile"
                className="px-5 py-2.5 rounded-lg font-semibold text-text bg-surface hover:bg-border transition-colors border border-border"
              >
                Cancel
              </Link>
              <RippleButton
                type="submit"
                className="px-5 py-2.5 rounded-lg font-semibold text-bg bg-accent hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-accent/20"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </RippleButton>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
