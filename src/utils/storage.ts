import { AppSettings, WeatherData, LocationData } from '../types/weather';
import { API_CONFIG } from '../config/api';

const SETTINGS_KEY = 'airweather_settings_v2';
const CACHE_PREFIX = 'airweather_cache_v2_';
const FAVORITES_KEY = 'airweather_favorites_v2';
const RECENT_KEY = 'airweather_recent_v2';
const LAST_LOCATION_KEY = 'airweather_last_loc_v2';

export const DEFAULT_SETTINGS: AppSettings = {
  temperatureUnit: 'C',
  windUnit: 'kmh',
  pressureUnit: 'hPa',
  blurStrength: 12,
  glassOpacity: 0.35,
  accentColor: '#fbbf24',
  themeMode: 'system',
  animationsEnabled: true,
  notificationsEnabled: true,
  offlineCacheEnabled: true,
};

export const getStoredSettings = (): AppSettings => {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
};

export const saveStoredSettings = (settings: AppSettings): void => {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (err) {
    console.warn('Failed to save settings to localStorage', err);
  }
};

export const getCachedWeatherData = (locId: string): WeatherData | null => {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + locId);
    if (!raw) return null;
    const parsed: WeatherData = JSON.parse(raw);
    parsed.fromCache = true;
    return parsed;
  } catch {
    return null;
  }
};

export const saveCachedWeatherData = (data: WeatherData): void => {
  try {
    const key = CACHE_PREFIX + data.location.id;
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.warn('Failed to cache weather data', err);
  }
};

export const getStoredFavorites = (): LocationData[] => {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) {
      return [
        API_CONFIG.DEFAULT_LOCATION,
        { id: 'tokyo-jp', name: 'Tokyo', country: 'Japan', latitude: 35.6762, longitude: 139.6503 },
        { id: 'new-york-us', name: 'New York', country: 'United States', latitude: 40.7128, longitude: -74.006 },
        { id: 'paris-fr', name: 'Paris', country: 'France', latitude: 48.8566, longitude: 2.3522 },
        { id: 'lagos-ng', name: 'Lagos', country: 'Nigeria', latitude: 6.5244, longitude: 3.3792 },
      ];
    }
    return JSON.parse(raw);
  } catch {
    return [API_CONFIG.DEFAULT_LOCATION];
  }
};

export const saveStoredFavorites = (favs: LocationData[]): void => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favs));
  } catch (err) {
    console.warn('Failed to save favorites', err);
  }
};

export const getStoredRecentSearches = (): LocationData[] => {
  try {
    const raw = localStorage.getItem(RECENT_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveStoredRecentSearches = (recents: LocationData[]): void => {
  try {
    localStorage.setItem(RECENT_KEY, JSON.stringify(recents.slice(0, 10)));
  } catch (err) {
    console.warn('Failed to save recent searches', err);
  }
};

export const getStoredLastLocation = (): LocationData => {
  try {
    const raw = localStorage.getItem(LAST_LOCATION_KEY);
    return raw ? JSON.parse(raw) : API_CONFIG.DEFAULT_LOCATION;
  } catch {
    return API_CONFIG.DEFAULT_LOCATION;
  }
};

export const saveStoredLastLocation = (loc: LocationData): void => {
  try {
    localStorage.setItem(LAST_LOCATION_KEY, JSON.stringify(loc));
  } catch (err) {
    console.warn('Failed to save last location', err);
  }
};
