import React from 'react';
import { FavoritesList } from '../components/world/FavoritesList';
import { InteractiveMap } from '../components/world/InteractiveMap';
import { Search, MapPin } from 'lucide-react';
import { LocationData } from '../types/weather';
import { useWeather } from '../context/WeatherContext';

interface WorldWeatherScreenProps {
  onOpenSearch: () => void;
}

export const WorldWeatherScreen: React.FC<WorldWeatherScreenProps> = ({ onOpenSearch }) => {
  const { selectLocation } = useWeather();

  const handleSelect = (loc: LocationData) => {
    selectLocation(loc);
  };

  return (
    <div className="space-y-5 pb-24 pt-4 px-4 max-w-2xl mx-auto">
      <div className="text-center mb-2">
        <h2 className="text-2xl font-extrabold text-white tracking-tight">World Weather Map</h2>
        <p className="text-xs text-white/70">Explore global cities & tap interactive map radar</p>
      </div>

      {/* Search Bar Trigger */}
      <button
        onClick={onOpenSearch}
        className="w-full flex items-center justify-between p-3.5 rounded-2xl border border-white/20 bg-white/10 text-white/70 backdrop-blur-md hover:bg-white/20 transition shadow-lg group"
      >
        <div className="flex items-center gap-2.5">
          <Search className="h-4 w-4 text-amber-300 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">Search any city in the world...</span>
        </div>
        <span className="flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-400/20 px-2.5 py-1 rounded-xl">
          <MapPin className="h-3 w-3" />
          <span>Explore</span>
        </span>
      </button>

      <FavoritesList onSelectCity={handleSelect} />
      <InteractiveMap onSelectCoordinates={handleSelect} />
    </div>
  );
};
