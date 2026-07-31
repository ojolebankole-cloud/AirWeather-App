import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppSettings, TemperatureUnit, WindUnit, PressureUnit, ThemeMode } from '../types/weather';
import { getStoredSettings, saveStoredSettings, DEFAULT_SETTINGS } from '../utils/storage';

interface SettingsContextType {
  settings: AppSettings;
  updateSettings: (newSettings: Partial<AppSettings>) => void;
  setTemperatureUnit: (unit: TemperatureUnit) => void;
  setWindUnit: (unit: WindUnit) => void;
  setPressureUnit: (unit: PressureUnit) => void;
  setBlurStrength: (val: number) => void;
  setGlassOpacity: (val: number) => void;
  setAccentColor: (color: string) => void;
  setThemeMode: (mode: ThemeMode) => void;
  resetSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings>(() => getStoredSettings());

  useEffect(() => {
    saveStoredSettings(settings);
  }, [settings]);

  const updateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const setTemperatureUnit = (unit: TemperatureUnit) => updateSettings({ temperatureUnit: unit });
  const setWindUnit = (unit: WindUnit) => updateSettings({ windUnit: unit });
  const setPressureUnit = (unit: PressureUnit) => updateSettings({ pressureUnit: unit });
  const setBlurStrength = (blurStrength: number) => updateSettings({ blurStrength });
  const setGlassOpacity = (glassOpacity: number) => updateSettings({ glassOpacity });
  const setAccentColor = (accentColor: string) => updateSettings({ accentColor });
  const setThemeMode = (themeMode: ThemeMode) => updateSettings({ themeMode });
  const resetSettings = () => setSettings(DEFAULT_SETTINGS);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        setTemperatureUnit,
        setWindUnit,
        setPressureUnit,
        setBlurStrength,
        setGlassOpacity,
        setAccentColor,
        setThemeMode,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
