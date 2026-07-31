import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { Star, MapPin, Trash2, ArrowRight } from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { LocationData } from '../../types/weather';

interface FavoritesListProps {
  onSelectCity: (loc: LocationData) => void;
}

export const FavoritesList: React.FC<FavoritesListProps> = ({ onSelectCity }) => {
  const { favorites, toggleFavorite, location: activeLoc } = useWeather();

  if (!favorites || favorites.length === 0) {
    return (
      <GlassCard className="p-6 text-center space-y-2">
        <Star className="h-8 w-8 text-amber-400 mx-auto opacity-50" />
        <h4 className="text-sm font-bold text-white">No Favorite Cities Saved</h4>
        <p className="text-xs text-white/60">
          Tap the star icon on any city to pin it to your favorites for instant access.
        </p>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
          <Star className="h-4 w-4 fill-amber-300" />
          <span>Favorite Locations</span>
        </div>
        <span className="text-xs font-semibold text-white/60">
          {favorites.length} saved
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {favorites.map((loc) => {
          const isActive = loc.id === activeLoc.id;

          return (
            <div
              key={loc.id}
              onClick={() => onSelectCity(loc)}
              className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                isActive
                  ? 'bg-amber-500/20 border-amber-400/40 shadow-lg'
                  : 'bg-white/10 border-white/15 hover:bg-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-white/10 text-amber-300'
                  }`}
                >
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="text-sm font-bold text-white block">
                    {loc.name}
                  </span>
                  <span className="text-xs text-white/60">{loc.country}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(loc);
                  }}
                  className="p-1.5 text-white/40 hover:text-red-300 transition"
                  title="Remove"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <ArrowRight className="h-4 w-4 text-white/60" />
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};
