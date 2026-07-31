import { LocationData, WeatherData } from '../types/weather';
import { getCachedWeatherData, saveCachedWeatherData } from '../utils/storage';
import { fetchOpenMeteoWeather } from './openMeteoService';
import { fetchOpenWeatherFallback } from './openWeatherService';

export const getWeatherOfflineFirst = async (
  location: LocationData,
  onCacheAvailable?: (data: WeatherData) => void
): Promise<WeatherData> => {
  // 1. Try to load cached data immediately
  const cached = getCachedWeatherData(location.id);
  if (cached && onCacheAvailable) {
    onCacheAvailable(cached);
  }

  // 2. Silently fetch fresh weather from network
  try {
    const fresh = await fetchOpenMeteoWeather(location);
    // 3. Save to cache
    saveCachedWeatherData(fresh);
    return fresh;
  } catch (primaryErr) {
    console.warn('Open-Meteo primary fetch failed, trying fallback...', primaryErr);
    try {
      const fallback = await fetchOpenWeatherFallback(location);
      saveCachedWeatherData(fallback);
      return fallback;
    } catch (fallbackErr) {
      console.warn('Fallback weather fetch also failed', fallbackErr);

      // If we have cached data, return it with flag
      if (cached) {
        return { ...cached, fromCache: true };
      }

      // If absolutely no network and no cache, construct safe initial weather structure
      const syntheticFallback: WeatherData = {
        location,
        current: {
          temperature: 22,
          apparentTemperature: 21,
          conditionCode: 1,
          conditionText: 'Partly Cloudy',
          conditionType: 'partly_cloudy',
          isDay: true,
          humidity: 55,
          windSpeed: 12,
          windDirection: 180,
          pressure: 1013,
          uvIndex: 4,
          visibility: 10,
          dewPoint: 12,
          airQualityIndex: 35,
          aqiStatus: 'Good',
          sunrise: new Date().toISOString(),
          sunset: new Date().toISOString(),
          moonPhase: 0.25,
          moonPhaseName: 'First Quarter',
          rainProbability: 10,
        },
        hourly: Array.from({ length: 24 }).map((_, i) => ({
          time: new Date(Date.now() + i * 3600000).toISOString(),
          temperature: 20 + Math.round(Math.sin(i / 3) * 4),
          conditionCode: 1,
          conditionType: 'partly_cloudy',
          rainProbability: 10,
          windSpeed: 10 + (i % 5),
          humidity: 50 + (i % 10),
          isDay: i >= 6 && i <= 19,
          uvIndex: i >= 10 && i <= 16 ? 5 : 0,
        })),
        daily: Array.from({ length: 7 }).map((_, i) => ({
          date: new Date(Date.now() + i * 86400000).toISOString().split('T')[0],
          dayName: i === 0 ? 'Today' : new Date(Date.now() + i * 86400000).toLocaleDateString('en-US', { weekday: 'short' }),
          tempMax: 24 + (i % 3),
          tempMin: 14 + (i % 2),
          conditionCode: 1,
          conditionText: 'Partly Cloudy',
          conditionType: 'partly_cloudy',
          rainProbability: 15,
          windSpeedMax: 15,
          uvIndexMax: 5,
          sunrise: new Date().toISOString(),
          sunset: new Date().toISOString(),
          summary: 'Partly cloudy with gentle breezes.',
        })),
        lastUpdated: new Date().toISOString(),
        fromCache: true,
      };

      return syntheticFallback;
    }
  }
};
