import React from 'react';
import { UnitSettings } from '../components/settings/UnitSettings';
import { AppearanceSettings } from '../components/settings/AppearanceSettings';
import { PreferencesSettings } from '../components/settings/PreferencesSettings';
import { AboutModal } from '../components/settings/AboutModal';

export const SettingsScreen: React.FC = () => {
  return (
    <div className="space-y-5 pb-24 pt-4 px-4 max-w-2xl mx-auto">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-extrabold text-white tracking-tight">App Settings</h2>
        <p className="text-xs text-white/70">Tailor units, liquid glass, themes, and preferences</p>
      </div>

      <UnitSettings />
      <AppearanceSettings />
      <PreferencesSettings />
      <AboutModal />
    </div>
  );
};
