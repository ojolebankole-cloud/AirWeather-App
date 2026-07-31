import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { Palette, Sparkles, Sliders, Moon } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { ACCENT_COLORS } from '../../constants/theme';
import { ThemeMode } from '../../types/weather';
import { triggerHaptic } from '../../utils/haptics';

export const AppearanceSettings: React.FC = () => {
  const {
    settings,
    setBlurStrength,
    setGlassOpacity,
    setAccentColor,
    setThemeMode,
  } = useSettings();

  const handleTheme = (mode: ThemeMode) => {
    triggerHaptic('selection');
    setThemeMode(mode);
  };

  return (
    <GlassCard className="p-4 space-y-4">
      <div className="flex items-center gap-2 text-xs font-bold text-sky-300 uppercase tracking-wider">
        <Palette className="h-4 w-4" />
        <span>Glass UI & Theme Customization</span>
      </div>

      {/* Theme Mode Toggles */}
      <div className="pb-3 border-b border-white/10 space-y-2">
        <span className="text-sm font-bold text-white block">Display Theme</span>
        <div className="grid grid-cols-4 gap-1.5 bg-black/30 p-1.5 rounded-2xl border border-white/10 text-center">
          {(['system', 'light', 'dark', 'amoled'] as ThemeMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => handleTheme(mode)}
              className={`py-1.5 text-xs font-bold capitalize rounded-xl transition-all ${
                settings.themeMode === mode
                  ? 'bg-amber-400 text-slate-950 shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {mode === 'amoled' ? 'AMOLED' : mode}
            </button>
          ))}
        </div>
      </div>

      {/* Accent Color Selector */}
      <div className="pb-3 border-b border-white/10 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-white">Accent Glow Color</span>
          <span className="text-xs text-white/60">6 Presets</span>
        </div>
        <div className="flex items-center justify-between gap-2 pt-1">
          {ACCENT_COLORS.map((c) => {
            const isSelected = settings.accentColor === c.hex;

            return (
              <button
                key={c.hex}
                onClick={() => {
                  triggerHaptic('light');
                  setAccentColor(c.hex);
                }}
                className={`relative h-10 w-10 rounded-full transition-transform active:scale-95 flex items-center justify-center ${
                  isSelected ? 'scale-110 ring-2 ring-white ring-offset-2 ring-offset-slate-900' : 'hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex, boxShadow: `0 0 15px ${c.hex}80` }}
                title={c.name}
              >
                {isSelected && <Sparkles className="h-4 w-4 text-slate-950" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Blur Strength Slider */}
      <div className="pb-3 border-b border-white/10 space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-white">
          <span className="flex items-center gap-1.5">
            <Sliders className="h-3.5 w-3.5 text-amber-300" />
            <span>Frosted Blur Strength</span>
          </span>
          <span>{settings.blurStrength}px</span>
        </div>
        <input
          type="range"
          min="0"
          max="24"
          value={settings.blurStrength}
          onChange={(e) => setBlurStrength(Number(e.target.value))}
          className="w-full accent-amber-400 cursor-pointer"
        />
      </div>

      {/* Glass Opacity Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-white">
          <span className="flex items-center gap-1.5">
            <Moon className="h-3.5 w-3.5 text-cyan-300" />
            <span>Liquid Glass Opacity</span>
          </span>
          <span>{Math.round(settings.glassOpacity * 100)}%</span>
        </div>
        <input
          type="range"
          min="0.1"
          max="0.8"
          step="0.05"
          value={settings.glassOpacity}
          onChange={(e) => setGlassOpacity(Number(e.target.value))}
          className="w-full accent-cyan-400 cursor-pointer"
        />
      </div>
    </GlassCard>
  );
};
