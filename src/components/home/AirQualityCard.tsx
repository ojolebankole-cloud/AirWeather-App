import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { Wind, ShieldCheck, AlertCircle } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { getAqiDetails } from '../../utils/formatters';

export const AirQualityCard: React.FC = () => {
  const { weatherData } = useWeather();

  if (!weatherData) return null;

  const { current } = weatherData;
  const aqi = current.airQualityIndex;
  const details = getAqiDetails(aqi);

  // AQI progress percentage (0 to 300)
  const aqiProgress = Math.min(100, Math.max(5, (aqi / 200) * 100));

  return (
    <GlassCard className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider">
          <Wind className="h-4 w-4" />
          <span>Air Quality Index (AQI)</span>
        </div>
        <span
          className="rounded-full px-2.5 py-0.5 text-xs font-bold text-white shadow-sm"
          style={{ backgroundColor: details.color }}
        >
          {details.status}
        </span>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-white">{aqi}</span>
        <span className="text-xs font-semibold text-white/70">US AQI Index</span>
      </div>

      {/* Bar gradient */}
      <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/20">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${aqiProgress}%`,
            backgroundColor: details.color,
            boxShadow: `0 0 10px ${details.color}`,
          }}
        />
      </div>

      <div className="flex items-start gap-2 pt-1 text-xs text-white/90">
        {aqi <= 50 ? (
          <ShieldCheck className="h-4 w-4 text-emerald-300 shrink-0 mt-0.5" />
        ) : (
          <AlertCircle className="h-4 w-4 text-amber-300 shrink-0 mt-0.5" />
        )}
        <span>{details.advice}</span>
      </div>

      {/* Pollutant breakdown */}
      <div className="grid grid-cols-4 gap-2 pt-2 border-t border-white/10 text-center">
        <div className="bg-white/10 p-2 rounded-xl border border-white/10">
          <span className="text-[10px] font-semibold text-white/60 block">PM2.5</span>
          <span className="text-xs font-bold text-white">{current.pm2_5 || 8.5}</span>
        </div>
        <div className="bg-white/10 p-2 rounded-xl border border-white/10">
          <span className="text-[10px] font-semibold text-white/60 block">PM10</span>
          <span className="text-xs font-bold text-white">{current.pm10 || 15.2}</span>
        </div>
        <div className="bg-white/10 p-2 rounded-xl border border-white/10">
          <span className="text-[10px] font-semibold text-white/60 block">O3</span>
          <span className="text-xs font-bold text-white">{current.o3 || 32.0}</span>
        </div>
        <div className="bg-white/10 p-2 rounded-xl border border-white/10">
          <span className="text-[10px] font-semibold text-white/60 block">NO2</span>
          <span className="text-xs font-bold text-white">{current.no2 || 12.0}</span>
        </div>
      </div>
    </GlassCard>
  );
};
