"use client";

import { useAppContext } from "../../ClientProvider";
import { Toggle } from "@/components/ui/Toggle";
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
      <div className="mb-8 text-white">
        Plankthon:\Home\Settings&gt; <span className="text-accent">config --list</span>
      </div>

      <div className="bg-surface-2 border border-border rounded-2xl p-8 space-y-10 shadow-lg">
        
        {/* Account */}
        <div>
          <div className="text-c-comment mb-3"># account</div>
          <div className="flex items-center pl-4">
            <div className="w-48 text-c-key">user</div>
            <div className="text-c-string">"{state.profile.name}"</div>
          </div>
        </div>

        {/* Appearance */}
        <div>
          <div className="text-c-comment mb-3"># appearance</div>
          <div className="flex flex-col gap-3 pl-4">
            <div className="flex items-center">
              <div className="w-48 text-c-key">theme</div>
              <Toggle 
                options={[{ value: "dark", label: "dark" }, { value: "light", label: "light" }]}
                value={state.settings.theme}
                onChange={(val) => updateSetting("theme", val)}
              />
            </div>
            <div className="flex items-center">
              <div className="w-48 text-c-key">editor.font_size</div>
              <Toggle 
                options={[{ value: 12, label: "12px" }, { value: 14, label: "14px" }, { value: 16, label: "16px" }]}
                value={state.settings.fontSize}
                onChange={(val) => updateSetting("fontSize", val)}
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div>
          <div className="text-c-comment mb-3"># preferences</div>
          <div className="flex flex-col gap-3 pl-4">
            <div className="flex items-center">
              <div className="w-48 text-c-key">sound_fx</div>
              <Toggle 
                options={[{ value: "on", label: "on" }, { value: "off", label: "off" }]}
                value={state.settings.sound ? "on" : "off"}
                onChange={(val) => updateSetting("sound", val === "on")}
              />
            </div>
            <div className="flex items-center">
              <div className="w-48 text-c-key">notifications</div>
              <Toggle 
                options={[{ value: "on", label: "on" }, { value: "off", label: "off" }]}
                value={state.settings.notifications ? "on" : "off"}
                onChange={(val) => updateSetting("notifications", val === "on")}
              />
            </div>
            <div className="flex items-center">
              <div className="w-48 text-c-key">language</div>
              <Toggle 
                options={[{ value: "en", label: "en" }, { value: "th", label: "th" }]}
                value={state.settings.language}
                onChange={(val) => updateSetting("language", val)}
              />
            </div>
          </div>
        </div>

        {/* Session */}
        <div>
          <div className="text-c-comment mb-3"># session</div>
          <div className="flex items-center pl-4">
            <div className="w-48 text-c-key">logout</div>
            <button 
              onClick={handleLogout}
              className="text-c-danger hover:underline decoration-c-danger/30"
            >
              [ log out ]
            </button>
          </div>
        </div>

      </div>

      <div className="mt-8 flex items-center gap-2 text-white">
        <span>Plankthon:\Home\Settings&gt;</span>
        <span className="w-2 h-4 bg-accent animate-pulse inline-block" />
      </div>
    </div>
  );
}
