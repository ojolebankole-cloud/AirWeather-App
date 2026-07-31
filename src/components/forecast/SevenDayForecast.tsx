import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GlassCard } from '../common/GlassCard';
import { AnimatedWeatherIcon } from '../common/AnimatedWeatherIcon';
import { useWeather } from '../../context/WeatherContext';
import { useSettings } from '../../context/SettingsContext';
import { formatTemp } from '../../utils/formatters';
import { Calendar, ChevronDown, Droplets, Wind, Sun, Sunrise, Sunset } from 'lucide-react';

export const SevenDayForecast: React.FC = () => {
  const { weatherData } = useWeather();
  const { settings } = useSettings();
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  if (!weatherData || !weatherData.daily) return null;

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <GlassCard className="p-4 space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-white/80 uppercase tracking-wider">
        <Calendar className="h-4 w-4 text-amber-300" />
        <span>7-Day Detailed Forecast</span>
      </div>

      <div className="space-y-2.5">
        {weatherData.daily.map((day, idx) => {
          const isExpanded = expandedIndex === idx;

          return (
            <div
              key={day.date}
              className="rounded-2xl border border-white/15 bg-white/10 transition-all duration-300 overflow-hidden"
            >
              <button
                onClick={() => toggleExpand(idx)}
                className="w-full flex items-center justify-between p-3.5 text-left focus:outline-none hover:bg-white/10"
              >
                <div className="flex items-center gap-3 w-1/3">
                  <AnimatedWeatherIcon
                    condition={day.conditionType}
                    isDay={true}
                    size={28}
                    glow={false}
                  />
                  <div>
                    <span className="text-sm font-bold text-white block">
                      {day.dayName}
                    </span>
                    <span className="text-[11px] font-medium text-white/60">
                      {day.conditionText}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {day.rainProbability > 15 && (
                    <div className="flex items-center gap-1 text-xs font-bold text-cyan-200 bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-400/30">
                      <Droplets className="h-3 w-3" />
                      <span>{day.rainProbability}%</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 font-bold text-sm">
                    <span className="text-white">
                      {formatTemp(day.tempMax, settings.temperatureUnit)}
                    </span>
                    <div className="h-1.5 w-12 rounded-full bg-white/20 overflow-hidden hidden sm:block">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-amber-400 rounded-full w-3/4 mx-auto" />
                    </div>
                    <span className="text-white/60">
                      {formatTemp(day.tempMin, settings.temperatureUnit)}
                    </span>
                  </div>

                  <ChevronDown
                    className={`h-4 w-4 text-white/70 transition-transform duration-300 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-white/10 bg-black/10 p-3.5 space-y-3"
                  >
                    <p className="text-xs text-white/90 leading-relaxed italic">
                      "{day.summary}"
                    </p>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-white/10 p-2 rounded-xl">
                        <div className="flex items-center justify-center gap-1 text-sky-200 mb-1">
                          <Wind className="h-3.5 w-3.5" />
                          <span className="font-semibold">Max Wind</span>
                        </div>
                        <span className="font-bold text-white">{day.windSpeedMax} km/h</span>
                      </div>

                      <div className="bg-white/10 p-2 rounded-xl">
                        <div className="flex items-center justify-center gap-1 text-amber-200 mb-1">
                          <Sun className="h-3.5 w-3.5" />
                          <span className="font-semibold">UV Index</span>
                        </div>
                        <span className="font-bold text-white">{day.uvIndexMax}</span>
                      </div>

                      <div className="bg-white/10 p-2 rounded-xl">
                        <div className="flex items-center justify-center gap-1 text-cyan-200 mb-1">
                          <Droplets className="h-3.5 w-3.5" />
                          <span className="font-semibold">Precipitation</span>
                        </div>
                        <span className="font-bold text-white">{day.rainProbability}%</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};
