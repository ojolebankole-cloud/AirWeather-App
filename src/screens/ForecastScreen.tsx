import React from 'react';
import { SevenDayForecast } from '../components/forecast/SevenDayForecast';
import { HourlyTrendChart } from '../components/forecast/HourlyTrendChart';
import { WeeklyTrendChart } from '../components/forecast/WeeklyTrendChart';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { useWeather } from '../context/WeatherContext';

export const ForecastScreen: React.FC = () => {
  const { isLoading, weatherData } = useWeather();

  if (isLoading && !weatherData) {
    return <SkeletonLoader />;
  }

  return (
    <div className="space-y-5 pb-24 pt-4 px-4 max-w-2xl mx-auto">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-extrabold text-white tracking-tight">Weather Forecast</h2>
        <p className="text-xs text-white/70">7-day trends, hourly charts & precipitation predictions</p>
      </div>

      <SevenDayForecast />
      <HourlyTrendChart />
      <WeeklyTrendChart />
    </div>
  );
};
