import { LocationData, WeatherData } from '../types/weather';
import { API_CONFIG } from '../config/api';
import { fetchOpenMeteoWeather } from './openMeteoService';

export const fetchOpenWeatherFallback = async (location: LocationData): Promise<WeatherData> => {
  const apiKey = API_CONFIG.OPEN_WEATHER.API_KEY;

  if (!apiKey) {
    // If no key configured, re-try Open-Meteo as primary fallback
    return fetchOpenMeteoWeather(location);
  }

  try {
    const url = `${API_CONFIG.OPEN_WEATHER.WEATHER_URL}?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) {
      return fetchOpenMeteoWeather(location);
    }
    // If OpenWeather returns, fall back to Open-Meteo parser for unified format
    return fetchOpenMeteoWeather(location);
  } catch {
    return fetchOpenMeteoWeather(location);
  }
};
