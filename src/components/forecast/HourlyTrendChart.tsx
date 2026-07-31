import React, { useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { useWeather } from '../../context/WeatherContext';
import { useSettings } from '../../context/SettingsContext';
import { convertTemp, formatTime } from '../../utils/formatters';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

type ChartMetric = 'temp' | 'rain' | 'wind';

export const HourlyTrendChart: React.FC = () => {
  const { weatherData } = useWeather();
  const { settings } = useSettings();
  const [metric, setMetric] = useState<ChartMetric>('temp');

  if (!weatherData || !weatherData.hourly) return null;

  const chartData = weatherData.hourly.map((item) => ({
    time: formatTime(item.time, false).replace(':00', ''),
    temp: convertTemp(item.temperature, settings.temperatureUnit),
    rain: item.rainProbability,
    wind: item.windSpeed,
  }));

  const getMetricConfig = () => {
    switch (metric) {
      case 'rain':
        return {
          key: 'rain',
          label: 'Rain Probability (%)',
          color: '#38bdf8',
          unit: '%',
        };
      case 'wind':
        return {
          key: 'wind',
          label: 'Wind Speed (km/h)',
          color: '#2dd4bf',
          unit: 'km/h',
        };
      case 'temp':
      default:
        return {
          key: 'temp',
          label: `Temperature (°${settings.temperatureUnit})`,
          color: '#fbbf24',
          unit: `°${settings.temperatureUnit}`,
        };
    }
  };

  const config = getMetricConfig();

  return (
    <GlassCard className="p-4 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs font-bold text-white/80 uppercase tracking-wider">
          <TrendingUp className="h-4 w-4 text-emerald-300" />
          <span>24-Hour Trend Graph</span>
        </div>

        {/* Metric Selector Buttons */}
        <div className="flex items-center gap-1 bg-black/20 p-1 rounded-xl border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setMetric('temp')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
              metric === 'temp'
                ? 'bg-amber-400 text-slate-900 shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Temp
          </button>
          <button
            onClick={() => setMetric('rain')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
              metric === 'rain'
                ? 'bg-sky-400 text-slate-900 shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Rain
          </button>
          <button
            onClick={() => setMetric('wind')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
              metric === 'wind'
                ? 'bg-teal-400 text-slate-900 shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            Wind
          </button>
        </div>
      </div>

      <div className="h-52 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={config.color} stopOpacity={0.6} />
                <stop offset="95%" stopColor={config.color} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis dataKey="time" stroke="rgba(255, 255, 255, 0.6)" fontSize={11} tickLine={false} />
            <YAxis stroke="rgba(255, 255, 255, 0.6)" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: '#fff',
                backdropFilter: 'blur(10px)',
              }}
              formatter={(val: any) => [`${val} ${config.unit}`, config.label]}
            />
            <Area
              type="monotone"
              dataKey={config.key}
              stroke={config.color}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#chartGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};
