import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LocationData, WeatherData } from '../types/weather';
import { API_CONFIG } from '../config/api';
import {
  getStoredFavorites,
  saveStoredFavorites,
  getStoredRecentSearches,
  saveStoredRecentSearches,
  getStoredLastLocation,
  saveStoredLastLocation,
} from '../utils/storage';
import { getWeatherOfflineFirst } from '../services/weatherRepository';
import { triggerHaptic } from '../utils/haptics';

interface WeatherContextType {
  location: LocationData;
  weatherData: WeatherData | null;
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  favorites: LocationData[];
  recentSearches: LocationData[];
  selectLocation: (loc: LocationData) => Promise<void>;
  refreshWeather: () => Promise<void>;
  toggleFavorite: (loc: LocationData) => void;
  isFavorite: (locId: string) => boolean;
  useCurrentLocation: () => Promise<void>;
  addRecentSearch: (loc: LocationData) => void;
  clearRecentSearches: () => void;
}

const WeatherContext = createContext<WeatherContextType | null>(null);

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<LocationData>(() => getStoredLastLocation());
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<LocationData[]>(() => getStoredFavorites());
  const [recentSearches, setRecentSearches] = useState<LocationData[]>(() => getStoredRecentSearches());

  // Load weather for selected location
  const loadWeather = useCallback(async (loc: LocationData, isRefresh = false) => {
    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const data = await getWeatherOfflineFirst(loc, (cached) => {
        // Render cached immediately if available
        setWeatherData(cached);
        setIsLoading(false);
      });
      setWeatherData(data);
    } catch (err) {
      console.error('Failed to load weather:', err);
      setError('Unable to fetch weather data. Showing cached results.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadWeather(location);
  }, [location, loadWeather]);

  const selectLocation = async (loc: LocationData) => {
    triggerHaptic('selection');
    setLocation(loc);
    saveStoredLastLocation(loc);
    addRecentSearch(loc);
  };

  const refreshWeather = async () => {
    triggerHaptic('medium');
    await loadWeather(location, true);
  };

  const toggleFavorite = (loc: LocationData) => {
    triggerHaptic('light');
    setFavorites((prev) => {
      const exists = prev.some((item) => item.id === loc.id);
      let updated: LocationData[];
      if (exists) {
        updated = prev.filter((item) => item.id !== loc.id);
      } else {
        updated = [loc, ...prev];
      }
      saveStoredFavorites(updated);
      return updated;
    });
  };

  const isFavorite = (locId: string): boolean => {
    return favorites.some((item) => item.id === locId);
  };

  const addRecentSearch = (loc: LocationData) => {
    setRecentSearches((prev) => {
      const filtered = prev.filter((item) => item.id !== loc.id);
      const updated = [loc, ...filtered].slice(0, 10);
      saveStoredRecentSearches(updated);
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    saveStoredRecentSearches([]);
  };

  const useCurrentLocation = async () => {
    triggerHaptic('medium');
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const gpsLocation: LocationData = {
          id: 'current-gps-location',
          name: 'Current Location',
          country: 'GPS Location',
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          isCurrentLocation: true,
        };
        setLocation(gpsLocation);
        saveStoredLastLocation(gpsLocation);
      },
      (err) => {
        console.warn('Geolocation error:', err);
        alert('Could not access current location. Using default location.');
        setLocation(API_CONFIG.DEFAULT_LOCATION);
        setIsLoading(false);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <WeatherContext.Provider
      value={{
        location,
        weatherData,
        isLoading,
        isRefreshing,
        error,
        favorites,
        recentSearches,
        selectLocation,
        refreshWeather,
        toggleFavorite,
        isFavorite,
        useCurrentLocation,
        addRecentSearch,
        clearRecentSearches,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};
