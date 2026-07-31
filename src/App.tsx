import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SettingsProvider, useSettings } from './context/SettingsContext';
import { WeatherProvider, useWeather } from './context/WeatherContext';
import { OfflineProvider } from './context/OfflineContext';
import { FloatingNavPill, TabType } from './components/common/FloatingNavPill';
import { OfflineBanner } from './components/common/OfflineBanner';
import { CitySearchModal } from './components/world/CitySearchModal';
import { HomeScreen } from './screens/HomeScreen';
import { ForecastScreen } from './screens/ForecastScreen';
import { WorldWeatherScreen } from './screens/WorldWeatherScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { WEATHER_THEMES } from './constants/theme';
import { LocationData } from './types/weather';

const MainAppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const { weatherData, selectLocation } = useWeather();
  const { settings } = useSettings();

  // Determine dynamic weather background gradient
  const getThemeGradient = () => {
    if (settings.themeMode === 'amoled') {
      return 'bg-black text-white';
    }

    if (!weatherData) {
      return 'bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 text-white';
    }

    const { conditionType, isDay } = weatherData.current;
    const themeConfig = WEATHER_THEMES[conditionType] || WEATHER_THEMES.sunny;
    const config = isDay ? themeConfig.day : themeConfig.night;

    if (settings.themeMode === 'light' && isDay) {
      return `bg-gradient-to-br ${config.bgGradient} text-white`;
    }

    return `bg-gradient-to-br ${config.bgGradient} text-white`;
  };

  const handleSelectCityFromSearch = async (loc: LocationData) => {
    await selectLocation(loc);
  };

  return (
    <div
      className={`min-h-screen w-full relative overflow-x-hidden font-sans transition-colors duration-700 ${getThemeGradient()}`}
    >
      {/* Background Ambient Glow Effects */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl transition-colors duration-700"
          style={{ backgroundColor: settings.accentColor }}
        />
        <div className="absolute top-1/2 -left-32 w-[350px] h-[350px] rounded-full bg-sky-500/20 opacity-25 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-[350px] h-[350px] rounded-full bg-purple-500/20 opacity-25 blur-3xl" />
      </div>

      {/* App Shell Header */}
      <div className="relative z-10">
        <OfflineBanner />

        {/* Tab Content Container */}
        <main className="min-h-screen pt-2 pb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              {activeTab === 'home' && (
                <HomeScreen onOpenSearch={() => setIsSearchOpen(true)} />
              )}
              {activeTab === 'forecast' && <ForecastScreen />}
              {activeTab === 'world' && (
                <WorldWeatherScreen onOpenSearch={() => setIsSearchOpen(true)} />
              )}
              {activeTab === 'settings' && <SettingsScreen />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Floating Navigation Pill */}
        <FloatingNavPill activeTab={activeTab} onTabChange={setActiveTab} />

        {/* City Search Modal */}
        <CitySearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelectCity={handleSelectCityFromSearch}
        />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <OfflineProvider>
      <SettingsProvider>
        <WeatherProvider>
          <MainAppContent />
        </WeatherProvider>
      </SettingsProvider>
    </OfflineProvider>
  );
}
