import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { useWeather } from '../../context/WeatherContext';
import { useSettings } from '../../context/SettingsContext';
import { convertTemp } from '../../utils/formatters';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import { BarChart2 } from 'lucide-react';

export const WeeklyTrendChart: React.FC = () => {
  const { weatherData } = useWeather();
  const { settings } = useSettings();

  if (!weatherData || !weatherData.daily) return null;

  const data = weatherData.daily.map((item) => ({
    day: item.dayName,
    High: convertTemp(item.tempMax, settings.temperatureUnit),
    Low: convertTemp(item.tempMin, settings.temperatureUnit),
  }));

  return (
    <GlassCard className="p-4 space-y-4">
      <div className="flex items-center gap-2 text-xs font-bold text-white/80 uppercase tracking-wider">
        <BarChart2 className="h-4 w-4 text-sky-300" />
        <span>7-Day High/Low Comparison</span>
      </div>

      <div className="h-48 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis dataKey="day" stroke="rgba(255, 255, 255, 0.6)" fontSize={11} tickLine={false} />
            <YAxis stroke="rgba(255, 255, 255, 0.6)" fontSize={11} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '12px',
                color: '#fff',
                backdropFilter: 'blur(10px)',
              }}
              formatter={(val: any) => [`${val}°${settings.temperatureUnit}`]}
            />
            <Legend wrapperStyle={{ fontSize: '11px', color: '#fff' }} />
            <Line
              type="monotone"
              dataKey="High"
              stroke="#fbbf24"
              strokeWidth={3}
              dot={{ fill: '#fbbf24', r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="Low"
              stroke="#38bdf8"
              strokeWidth={3}
              dot={{ fill: '#38bdf8', r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
};
