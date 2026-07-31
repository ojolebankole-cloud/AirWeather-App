import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, MapPin, History, Trash2, Loader2 } from 'lucide-react';
import { LocationData } from '../../types/weather';
import { searchCitiesGeocoding } from '../../services/openMeteoService';
import { useWeather } from '../../context/WeatherContext';

interface CitySearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCity: (loc: LocationData) => void;
}

export const CitySearchModal: React.FC<CitySearchModalProps> = ({
  isOpen,
  onClose,
  onSelectCity,
}) => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<LocationData[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const { recentSearches, clearRecentSearches } = useWeather();

  useEffect(() => {
    if (!query || query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await searchCitiesGeocoding(query);
        setResults(res);
      } catch (err) {
        console.warn('City search failed', err);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/20 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Search className="h-5 w-5 text-amber-400" />
              <span>Search Location</span>
            </h3>
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative mt-4">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-white/50" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search city, region, or country..."
              autoFocus
              className="w-full rounded-2xl border border-white/20 bg-white/10 py-3 pl-10 pr-10 text-sm font-medium text-white placeholder-white/40 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
            {isSearching ? (
              <Loader2 className="absolute right-3.5 top-3.5 h-4 w-4 animate-spin text-white/60" />
            ) : query ? (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3.5 top-3.5 text-white/60 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>

          {/* Search Results */}
          <div className="mt-4 max-h-80 overflow-y-auto space-y-2 pr-1 no-scrollbar">
            {results.length > 0 ? (
              results.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => {
                    onSelectCity(loc);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 text-left hover:bg-white/15 transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <div>
                      <span className="text-sm font-bold text-white block group-hover:text-amber-300 transition-colors">
                        {loc.name}
                      </span>
                      <span className="text-xs text-white/60">
                        {loc.admin1 ? `${loc.admin1}, ` : ''}
                        {loc.country}
                      </span>
                    </div>
                  </div>
                </button>
              ))
            ) : query.length >= 2 && !isSearching ? (
              <div className="p-8 text-center text-sm text-white/60">
                No cities found matching "{query}".
              </div>
            ) : (
              /* Recent Searches */
              recentSearches.length > 0 && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs font-semibold text-white/60 px-1">
                    <span className="flex items-center gap-1">
                      <History className="h-3.5 w-3.5" />
                      <span>Recent Searches</span>
                    </span>
                    <button
                      onClick={clearRecentSearches}
                      className="flex items-center gap-1 text-red-300 hover:text-red-200"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Clear</span>
                    </button>
                  </div>
                  {recentSearches.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => {
                        onSelectCity(loc);
                        onClose();
                      }}
                      className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 text-left hover:bg-white/15 transition"
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-sky-300" />
                        <span className="text-sm font-medium text-white">
                          {loc.name}, {loc.country}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
