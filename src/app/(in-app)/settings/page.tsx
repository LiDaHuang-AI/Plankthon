"use client";

import { useAppContext } from "../../ClientProvider";
import { Toggle } from "@/components/ui/Toggle";
import { ThemeTogglerButton } from "@/components/ui/theme-toggler";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { state, updateState } = useAppContext();
  const router = useRouter();

  if (!state) return null;

  const handleLogout = () => {
    updateState(prev => ({ ...prev, loggedIn: false, account: null }));
    router.push("/auth");
  };

  const updateSetting = (key: keyof typeof state.settings, value: any) => {
    updateState(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [key]: value
      }
    }));
  };

  return (
    <div className="p-8 max-w-3xl font-mono text-[14px]">
      <div className="mb-8 text-text">
        Plankthon:\Home\Settings&gt; <span className="text-accent">config --list</span>
      </div>

      <div className="space-y-6">
        
        {/* Account */}
        <div className="bg-surface-2 border border-border rounded-xl overflow-hidden shadow-lg">
          <div className="bg-surface px-6 py-3 border-b border-border flex items-center gap-2 font-mono">
            <span className="text-c-comment"># account</span>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-text font-medium">Username</div>
                <div className="text-muted text-[13px] mt-1">Your display name across Plankthon.</div>
              </div>
              <div className="text-c-string font-mono bg-surface-2 border border-border px-4 py-2 rounded-lg">
                "{state.profile.name}"
              </div>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-surface-2 border border-border rounded-xl overflow-hidden shadow-lg">
          <div className="bg-surface px-6 py-3 border-b border-border flex items-center gap-2 font-mono">
            <span className="text-c-comment"># appearance</span>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-text font-medium">Theme</div>
                <div className="text-muted text-[13px] mt-1">Select your preferred color scheme.</div>
              </div>
              <ThemeTogglerButton />
            </div>

          </div>
        </div>

        {/* Preferences */}
        <div className="bg-surface-2 border border-border rounded-xl overflow-hidden shadow-lg">
          <div className="bg-surface px-6 py-3 border-b border-border flex items-center gap-2 font-mono">
            <span className="text-c-comment"># preferences</span>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-text font-medium">Sound Effects</div>
                <div className="text-muted text-[13px] mt-1">Play sounds on success or failure.</div>
              </div>
              <Toggle 
                options={[{ value: "on", label: "On" }, { value: "off", label: "Off" }]}
                value={state.settings.sound ? "on" : "off"}
                onChange={(val) => updateSetting("sound", val === "on")}
              />
            </div>
            <div className="h-px bg-border w-full"></div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-text font-medium">Notifications</div>
                <div className="text-muted text-[13px] mt-1">Receive alerts for achievements.</div>
              </div>
              <Toggle 
                options={[{ value: "on", label: "On" }, { value: "off", label: "Off" }]}
                value={state.settings.notifications ? "on" : "off"}
                onChange={(val) => updateSetting("notifications", val === "on")}
              />
            </div>
            <div className="h-px bg-border w-full"></div>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-text font-medium">Language</div>
                <div className="text-muted text-[13px] mt-1">Choose your curriculum language.</div>
              </div>
              <Toggle 
                options={[{ value: "en", label: "English" }, { value: "th", label: "Thai" }]}
                value={state.settings.language}
                onChange={(val) => updateSetting("language", val)}
              />
            </div>
          </div>
        </div>

        {/* Session */}
        <div className="bg-surface-2 border border-border rounded-xl overflow-hidden shadow-lg">
          <div className="bg-surface px-6 py-3 border-b border-border flex items-center gap-2 font-mono">
            <span className="text-c-comment"># session</span>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-text font-medium">Log Out</div>
                <div className="text-muted text-[13px] mt-1">Sign out of your current session.</div>
              </div>
              <button 
                onClick={handleLogout}
                className="px-6 py-2 bg-c-danger/10 text-c-danger hover:bg-c-danger/20 font-bold rounded-lg transition-colors border border-c-danger/20"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>

      </div>


    </div>
  );
}
