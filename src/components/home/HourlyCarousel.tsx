import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { AnimatedWeatherIcon } from '../common/AnimatedWeatherIcon';
import { useWeather } from '../../context/WeatherContext';
import { useSettings } from '../../context/SettingsContext';
import { formatTemp, formatTime } from '../../utils/formatters';
import { Droplets, Clock } from 'lucide-react';

export const HourlyCarousel: React.FC = () => {
  const { weatherData } = useWeather();
  const { settings } = useSettings();

  if (!weatherData || !weatherData.hourly || weatherData.hourly.length === 0) return null;

  return (
    <GlassCard className="p-4 space-y-3">
      <div className="flex items-center gap-2 text-xs font-bold text-white/80 uppercase tracking-wider">
        <Clock className="h-4 w-4 text-sky-300" />
        <span>24-Hour Timeline</span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-none no-scrollbar">
        {weatherData.hourly.map((item, idx) => {
          const isNow = idx === 0;

          return (
            <div
              key={idx}
              className={`flex flex-col items-center justify-between min-w-[76px] p-3 rounded-2xl border transition-all duration-300 ${
                isNow
                  ? 'bg-white/30 border-white/40 shadow-lg scale-105'
                  : 'bg-white/10 border-white/15 hover:bg-white/20'
              }`}
            >
              <span className="text-xs font-semibold text-white/90">
                {isNow ? 'Now' : formatTime(item.time, false).replace(':00', '')}
              </span>

              <div className="my-2">
                <AnimatedWeatherIcon
                  condition={item.conditionType}
                  isDay={item.isDay}
                  size={32}
                  glow={false}
                />
              </div>

              {item.rainProbability > 10 ? (
                <div className="flex items-center gap-0.5 text-[10px] font-bold text-cyan-200">
                  <Droplets className="h-2.5 w-2.5" />
                  <span>{item.rainProbability}%</span>
                </div>
              ) : (
                <div className="h-3" />
              )}

              <span className="text-sm font-bold text-white mt-1">
                {formatTemp(item.temperature, settings.temperatureUnit)}
              </span>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};
