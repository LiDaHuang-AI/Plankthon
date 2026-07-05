"use client";

import { useAppContext } from "../../ClientProvider";
import { Toggle } from "@/components/ui/Toggle";
import { ThemeTogglerButton } from "@/components/ui/theme-toggler";
import { useRouter } from "next/navigation";
import { RippleButton } from "@/components/ui/RippleButton";
import { t } from "@/lib/i18n";

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
            <span className="text-c-comment"># {t(state?.settings?.language, 'account').toLowerCase()}</span>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-text font-medium">{t(state?.settings?.language, 'name')}</div>
                <div className="text-muted text-[13px] mt-1">{t(state?.settings?.language, 'usernameSettingsDesc')}</div>
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
            <span className="text-c-comment"># {t(state?.settings?.language, 'appearance').toLowerCase()}</span>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-text font-medium">{t(state?.settings?.language, 'theme')}</div>
                <div className="text-muted text-[13px] mt-1">{t(state?.settings?.language, 'themeDesc')}</div>
              </div>
              <ThemeTogglerButton />
            </div>

          </div>
        </div>

        {/* Preferences */}
        <div className="bg-surface-2 border border-border rounded-xl overflow-hidden shadow-lg">
          <div className="bg-surface px-6 py-3 border-b border-border flex items-center gap-2 font-mono">
            <span className="text-c-comment"># {t(state?.settings?.language, 'preferences').toLowerCase()}</span>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-text font-medium">{t(state?.settings?.language, 'soundEffects')}</div>
                <div className="text-muted text-[13px] mt-1">{t(state?.settings?.language, 'soundEffectsDesc')}</div>
              </div>
              <Toggle 
                options={[{ value: "on", label: t(state?.settings?.language, 'on') }, { value: "off", label: t(state?.settings?.language, 'off') }]}
                value={state.settings.sound ? "on" : "off"}
                onChange={(val) => updateSetting("sound", val === "on")}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="text-text font-medium">{t(state?.settings?.language, 'language')}</div>
                <div className="text-muted text-[13px] mt-1">{t(state?.settings?.language, 'languageDesc')}</div>
              </div>
              <Toggle 
                options={[{ value: "en", label: t(state?.settings?.language, 'english') }, { value: "th", label: t(state?.settings?.language, 'thai') }]}
                value={state.settings.language}
                onChange={(val) => updateSetting("language", val)}
              />
            </div>
          </div>
        </div>

        {/* Session */}
        <div className="bg-surface-2 border border-border rounded-xl overflow-hidden shadow-lg">
          <div className="bg-surface px-6 py-3 border-b border-border flex items-center gap-2 font-mono">
            <span className="text-c-comment"># {t(state?.settings?.language, 'session').toLowerCase()}</span>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-text font-medium">{t(state?.settings?.language, 'logOut')}</div>
                <div className="text-muted text-[13px] mt-1">{t(state?.settings?.language, 'logOutDesc')}</div>
              </div>
              <RippleButton
                onClick={handleLogout}
                className="px-6 py-2 bg-c-danger/10 text-c-danger hover:bg-c-danger/20 font-bold rounded-lg transition-colors border border-c-danger/20"
              >
                {t(state?.settings?.language, 'logOut')}
              </RippleButton>
            </div>
          </div>
        </div>

      </div>


    </div>
  );
}
