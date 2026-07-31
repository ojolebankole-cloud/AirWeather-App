import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { useOffline } from '../../context/OfflineContext';
import { useWeather } from '../../context/WeatherContext';

export const OfflineBanner: React.FC = () => {
  const { isOnline } = useOffline();
  const { weatherData, refreshWeather, isRefreshing } = useWeather();

  const isFromCache = weatherData?.fromCache || false;

  // Auto-refresh when coming back online
  useEffect(() => {
    if (isOnline && isFromCache) {
      refreshWeather();
    }
  }, [isOnline, isFromCache, refreshWeather]);

  if (isOnline && !isFromCache) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="sticky top-0 z-40 w-full px-4 pt-3 pb-1"
      >
        <div className="flex items-center justify-between gap-2 rounded-2xl border border-amber-400/30 bg-amber-500/20 px-4 py-2.5 text-xs font-semibold text-amber-200 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-2">
            <WifiOff className="h-4 w-4 text-amber-300 animate-pulse" />
            <span>Offline Mode • Showing Last Saved Forecast</span>
          </div>
          <button
            onClick={refreshWeather}
            disabled={isRefreshing}
            className="flex items-center gap-1 rounded-lg bg-amber-400/20 px-2.5 py-1 text-[11px] font-bold text-amber-100 transition-colors hover:bg-amber-400/30 active:scale-95"
          >
            <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Updating...' : 'Retry'}</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
