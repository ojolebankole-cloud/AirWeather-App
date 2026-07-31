import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { Sunrise, Sunset, Moon } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { formatTime } from '../../utils/formatters';

export const SunMoonCard: React.FC = () => {
  const { weatherData } = useWeather();

  if (!weatherData) return null;

  const { current } = weatherData;
  const sunriseTime = formatTime(current.sunrise);
  const sunsetTime = formatTime(current.sunset);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
      {/* Sun Card */}
      <GlassCard className="p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
            <Sunrise className="h-4 w-4" />
            <span>Sun Schedule</span>
          </div>
          <Sunset className="h-4 w-4 text-orange-300" />
        </div>

        <div className="mt-4 flex items-center justify-around">
          <div className="text-center">
            <span className="text-[10px] font-semibold text-white/60 uppercase">Sunrise</span>
            <div className="text-lg font-bold text-white mt-0.5">{sunriseTime}</div>
          </div>

          {/* Curved Arc Visualizer */}
          <div className="relative w-24 h-12 border-b border-amber-300/40">
            <div className="absolute inset-0 rounded-t-full border-t-2 border-dashed border-amber-300/60" />
            <div
              className="absolute h-3 w-3 rounded-full bg-amber-400 shadow-[0_0_12px_#f59e0b]"
              style={{
                top: '15%',
                left: '45%',
              }}
            />
          </div>

          <div className="text-center">
            <span className="text-[10px] font-semibold text-white/60 uppercase">Sunset</span>
            <div className="text-lg font-bold text-white mt-0.5">{sunsetTime}</div>
          </div>
        </div>
      </GlassCard>

      {/* Moon Card */}
      <GlassCard className="p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-300 uppercase tracking-wider">
            <Moon className="h-4 w-4" />
            <span>Moon Phase</span>
          </div>
          <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold text-indigo-200">
            {Math.round(current.moonPhase * 100)}% Illumination
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-white">{current.moonPhaseName}</div>
            <p className="text-xs text-white/70 mt-1">Next full moon in ~12 days</p>
          </div>

          <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 border border-indigo-400/30 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
            <Moon className="h-7 w-7 text-indigo-200" />
          </div>
        </div>
      </GlassCard>
    </div>
  );
};
