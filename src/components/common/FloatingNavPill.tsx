import React from 'react';
import { motion } from 'motion/react';
import { Home, Calendar, Globe, Settings } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { triggerHaptic } from '../../utils/haptics';

export type TabType = 'home' | 'forecast' | 'world' | 'settings';

interface FloatingNavPillProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const FloatingNavPill: React.FC<FloatingNavPillProps> = ({ activeTab, onTabChange }) => {
  const { settings } = useSettings();

  const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'forecast', label: 'Forecast', icon: Calendar },
    { id: 'world', label: 'World', icon: Globe },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleTabClick = (tabId: TabType) => {
    if (tabId !== activeTab) {
      triggerHaptic('selection');
      onTabChange(tabId);
    }
  };

  const isAmoled = settings.themeMode === 'amoled';

  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 px-4">
      <div
        style={{
          backdropFilter: `blur(${settings.blurStrength + 4}px)`,
          WebkitBackdropFilter: `blur(${settings.blurStrength + 4}px)`,
          backgroundColor: isAmoled
            ? 'rgba(0, 0, 0, 0.88)'
            : 'rgba(15, 23, 42, 0.65)',
        }}
        className="flex items-center gap-1 rounded-full border border-white/20 p-2 shadow-2xl shadow-black/40"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className="relative flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-semibold transition-all duration-300 focus:outline-none"
              style={{
                color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.6)',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    backgroundColor: settings.accentColor || '#fbbf24',
                    opacity: 0.9,
                    boxShadow: `0 0 20px ${settings.accentColor || '#fbbf24'}80`,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5 font-medium tracking-wide">
                <Icon
                  className="h-4 w-4 transition-transform duration-300"
                  style={{ color: isActive ? '#0f172a' : 'inherit' }}
                />
                <span
                  style={{ color: isActive ? '#0f172a' : 'inherit' }}
                  className={`${isActive ? 'font-bold' : 'font-normal'}`}
                >
                  {tab.label}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
