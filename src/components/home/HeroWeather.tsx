import React from 'react';
import { motion } from 'motion/react';
import { MapPin, RefreshCw, Star, Navigation } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { useSettings } from '../../context/SettingsContext';
import { AnimatedWeatherIcon } from '../common/AnimatedWeatherIcon';
import { formatTemp } from '../../utils/formatters';

interface HeroWeatherProps {
  onOpenSearch: () => void;
}

export const HeroWeather: React.FC<HeroWeatherProps> = ({ onOpenSearch }) => {
  const { weatherData, isRefreshing, refreshWeather, toggleFavorite, isFavorite, useCurrentLocation } = useWeather();
  const { settings } = useSettings();

  if (!weatherData) return null;

  const { location, current, daily } = weatherData;
  const todayForecast = daily[0] || { tempMax: current.temperature, tempMin: current.temperature };
  const fav = isFavorite(location.id);

  return (
    <div className="relative flex flex-col items-center justify-center pt-4 pb-6 text-center">
      {/* Top Bar Actions */}
      <div className="flex w-full items-center justify-between px-2 mb-2">
        <button
          onClick={useCurrentLocation}
          className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-md transition hover:bg-white/20 active:scale-95"
          title="Use GPS Location"
        >
          <Navigation className="h-3.5 w-3.5 text-sky-300" />
          <span>GPS</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleFavorite(location)}
            className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition active:scale-95 ${
              fav ? 'text-amber-400 bg-amber-400/20 border-amber-400/40' : 'hover:bg-white/20'
            }`}
            title={fav ? 'Remove from Favorites' : 'Add to Favorites'}
          >
            <Star className={`h-4 w-4 ${fav ? 'fill-amber-400' : ''}`} />
          </button>

          <button
            onClick={refreshWeather}
            disabled={isRefreshing}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/20 active:scale-95"
            title="Refresh Weather"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Location Header */}
      <button
        onClick={onOpenSearch}
        className="group flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 border border-white/20 backdrop-blur-md transition hover:bg-white/20 active:scale-95 mt-2"
      >
        <MapPin className="h-4 w-4 text-amber-300 group-hover:scale-110 transition-transform" />
        <span className="text-xl font-bold text-white tracking-wide">
          {location.name}
        </span>
        {location.country && (
          <span className="text-sm font-medium text-white/70">
            , {location.country}
          </span>
        )}
      </button>

      {/* Animated Icon */}
      <div className="my-6">
        <AnimatedWeatherIcon
          condition={current.conditionType}
          isDay={current.isDay}
          size={110}
        />
      </div>

      {/* Main Temperature */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <span className="text-7xl md:text-8xl font-black tracking-tight text-white drop-shadow-xl font-mono">
          {formatTemp(current.temperature, settings.temperatureUnit)}
        </span>
      </motion.div>

      {/* Condition Text */}
      <h2 className="mt-2 text-xl font-semibold text-white/90 tracking-wide">
        {current.conditionText}
      </h2>

      {/* Highs / Lows & Feels Like */}
      <div className="mt-3 flex items-center gap-3 text-xs font-semibold text-white/80">
        <span className="rounded-full bg-white/15 px-3 py-1 border border-white/20 backdrop-blur-sm">
          H: {formatTemp(todayForecast.tempMax, settings.temperatureUnit)} • L:{' '}
          {formatTemp(todayForecast.tempMin, settings.temperatureUnit)}
        </span>
        <span className="rounded-full bg-white/15 px-3 py-1 border border-white/20 backdrop-blur-sm">
          Feels like {formatTemp(current.apparentTemperature, settings.temperatureUnit)}
        </span>
      </div>
    </div>
  );
};
