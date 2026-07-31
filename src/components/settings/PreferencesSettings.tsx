import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { ShieldAlert, Bell, Database, RotateCcw, Zap } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { triggerHaptic } from '../../utils/haptics';

export const PreferencesSettings: React.FC = () => {
  const { settings, updateSettings, resetSettings } = useSettings();

  const toggle = (key: 'animationsEnabled' | 'notificationsEnabled' | 'offlineCacheEnabled') => {
    triggerHaptic('light');
    updateSettings({ [key]: !settings[key] });
  };

  return (
    <GlassCard className="p-4 space-y-4">
      <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
        <ShieldAlert className="h-4 w-4" />
        <span>Performance & System Preferences</span>
      </div>

      {/* Animations Toggle */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <Zap className="h-4 w-4 text-amber-300" />
          <div>
            <span className="text-sm font-bold text-white block">60fps Animations</span>
            <span className="text-xs text-white/60">Fluid UI & card motion effects</span>
          </div>
        </div>
        <button
          onClick={() => toggle('animationsEnabled')}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.animationsEnabled ? 'bg-amber-400' : 'bg-white/20'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-slate-900 transition-transform ${
              settings.animationsEnabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Notifications Toggle */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <Bell className="h-4 w-4 text-sky-300" />
          <div>
            <span className="text-sm font-bold text-white block">Severe Weather Alerts</span>
            <span className="text-xs text-white/60">Push notifications for extreme events</span>
          </div>
        </div>
        <button
          onClick={() => toggle('notificationsEnabled')}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.notificationsEnabled ? 'bg-sky-400' : 'bg-white/20'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-slate-900 transition-transform ${
              settings.notificationsEnabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Offline Cache Toggle */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <Database className="h-4 w-4 text-emerald-300" />
          <div>
            <span className="text-sm font-bold text-white block">Offline Caching</span>
            <span className="text-xs text-white/60">Store forecasts for instant offline launch</span>
          </div>
        </div>
        <button
          onClick={() => toggle('offlineCacheEnabled')}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            settings.offlineCacheEnabled ? 'bg-emerald-400' : 'bg-white/20'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-slate-900 transition-transform ${
              settings.offlineCacheEnabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Reset Defaults */}
      <div className="pt-1 flex justify-end">
        <button
          onClick={() => {
            triggerHaptic('warning');
            resetSettings();
          }}
          className="flex items-center gap-1.5 rounded-xl border border-red-400/30 bg-red-500/10 px-3.5 py-2 text-xs font-bold text-red-300 transition hover:bg-red-500/20 active:scale-95"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset All Settings</span>
        </button>
      </div>
    </GlassCard>
  );
};
