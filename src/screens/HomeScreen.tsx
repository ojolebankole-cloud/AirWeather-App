import React from 'react';
import { HeroWeather } from '../components/home/HeroWeather';
import { HourlyCarousel } from '../components/home/HourlyCarousel';
import { MetricsGrid } from '../components/home/MetricsGrid';
import { AirQualityCard } from '../components/home/AirQualityCard';
import { SunMoonCard } from '../components/home/SunMoonCard';
import { SkeletonLoader } from '../components/common/SkeletonLoader';
import { useWeather } from '../context/WeatherContext';

interface HomeScreenProps {
  onOpenSearch: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onOpenSearch }) => {
  const { isLoading, weatherData } = useWeather();

  if (isLoading && !weatherData) {
    return <SkeletonLoader />;
  }

  return (
    <div className="space-y-5 pb-24 px-4 max-w-2xl mx-auto">
      <HeroWeather onOpenSearch={onOpenSearch} />
      <HourlyCarousel />
      <MetricsGrid />
      <AirQualityCard />
      <SunMoonCard />
    </div>
  );
};
