export const API_CONFIG = {
  OPEN_METEO: {
    WEATHER_URL: 'https://api.open-meteo.com/v1/forecast',
    GEOCODING_URL: 'https://geocoding-api.open-meteo.com/v1/search',
    AIR_QUALITY_URL: 'https://air-quality-api.open-meteo.com/v1/air-quality',
  },
  OPEN_WEATHER: {
    WEATHER_URL: 'https://api.openweathermap.org/data/2.5/weather',
    FORECAST_URL: 'https://api.openweathermap.org/data/2.5/forecast',
    // Fallback key if provided in env
    API_KEY: process.env.VITE_OPENWEATHER_API_KEY || '',
  },
  DEFAULT_LOCATION: {
    id: 'london-uk',
    name: 'London',
    country: 'United Kingdom',
    latitude: 51.5074,
    longitude: -0.1278,
  },
  CACHE_TTL_MS: 15 * 60 * 1000, // 15 minutes cache
};
