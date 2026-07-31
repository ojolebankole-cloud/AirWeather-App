import { API_CONFIG } from '../config/api';
import { LocationData, WeatherData, HourlyForecast, DailyForecast, CurrentWeather } from '../types/weather';
import { parseWmoCode, getMoonPhaseName } from '../utils/weatherCode';
import { getAqiDetails } from '../utils/formatters';

export const fetchOpenMeteoWeather = async (location: LocationData): Promise<WeatherData> => {
  const { latitude, longitude } = location;

  // Build API URLs
  const weatherParams = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'is_day',
      'weather_code',
      'surface_pressure',
      'wind_speed_10m',
      'wind_direction_10m',
      'dew_point_2m',
    ].join(','),
    hourly: [
      'temperature_2m',
      'relative_humidity_2m',
      'precipitation_probability',
      'weather_code',
      'wind_speed_10m',
      'uv_index',
      'is_day',
    ].join(','),
    daily: [
      'weather_code',
      'temperature_2m_max',
      'temperature_2m_min',
      'precipitation_probability_max',
      'wind_speed_10m_max',
      'uv_index_max',
      'sunrise',
      'sunset',
    ].join(','),
    timezone: 'auto',
    forecast_days: '8',
  });

  const aqiParams = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    current: ['european_aqi', 'us_aqi', 'pm2_5', 'pm10', 'nitrogen_dioxide', 'ozone', 'sulphur_dioxide', 'carbon_monoxide'].join(','),
  });

  // Fetch Weather & Air Quality in parallel
  const [weatherRes, aqiRes] = await Promise.all([
    fetch(`${API_CONFIG.OPEN_METEO.WEATHER_URL}?${weatherParams.toString()}`),
    fetch(`${API_CONFIG.OPEN_METEO.AIR_QUALITY_URL}?${aqiParams.toString()}`).catch(() => null),
  ]);

  if (!weatherRes.ok) {
    throw new Error(`Open-Meteo Weather request failed with status ${weatherRes.status}`);
  }

  const weatherJson = await weatherRes.json();
  const aqiJson = aqiRes && aqiRes.ok ? await aqiRes.json() : null;

  const currentRaw = weatherJson.current;
  const hourlyRaw = weatherJson.hourly;
  const dailyRaw = weatherJson.daily;

  // Process current weather
  const wmoInfo = parseWmoCode(currentRaw.weather_code, currentRaw.is_day === 1);
  const uvNow = hourlyRaw.uv_index ? Math.round(hourlyRaw.uv_index[0] || 3) : 3;

  let usAqi = 25;
  let pm2_5 = 8.5;
  let pm10 = 15.2;
  let o3 = 32.0;
  let no2 = 12.0;
  let so2 = 4.0;
  let co = 210.0;

  if (aqiJson && aqiJson.current) {
    usAqi = Math.round(aqiJson.current.us_aqi || aqiJson.current.european_aqi * 2 || 25);
    pm2_5 = Math.round((aqiJson.current.pm2_5 || 8.5) * 10) / 10;
    pm10 = Math.round((aqiJson.current.pm10 || 15.2) * 10) / 10;
    o3 = Math.round((aqiJson.current.ozone || 32.0) * 10) / 10;
    no2 = Math.round((aqiJson.current.nitrogen_dioxide || 12.0) * 10) / 10;
    so2 = Math.round((aqiJson.current.sulphur_dioxide || 4.0) * 10) / 10;
    co = Math.round((aqiJson.current.carbon_monoxide || 210.0) * 10) / 10;
  }

  const aqiDetails = getAqiDetails(usAqi);

  // Calculate approximate moon phase based on current date
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const c = Math.floor(365.25 * year) + Math.floor(year / 400) - Math.floor(year / 100);
  const e = Math.floor(30.6 * (month + 1));
  const jd = c + e + day - 694039.09; // julian day approximation
  const moonPhaseVal = (jd / 29.5305882) % 1;
  const moonPhase = moonPhaseVal < 0 ? moonPhaseVal + 1 : moonPhaseVal;

  const current: CurrentWeather = {
    temperature: currentRaw.temperature_2m,
    apparentTemperature: currentRaw.apparent_temperature,
    conditionCode: currentRaw.weather_code,
    conditionText: wmoInfo.text,
    conditionType: wmoInfo.type,
    isDay: currentRaw.is_day === 1,
    humidity: Math.round(currentRaw.relative_humidity_2m),
    windSpeed: Math.round(currentRaw.wind_speed_10m),
    windDirection: currentRaw.wind_direction_10m || 0,
    pressure: Math.round(currentRaw.surface_pressure),
    uvIndex: uvNow,
    visibility: 10, // Default 10km if not available
    dewPoint: Math.round(currentRaw.dew_point_2m),
    airQualityIndex: usAqi,
    aqiStatus: aqiDetails.status,
    pm2_5,
    pm10,
    o3,
    no2,
    so2,
    co,
    sunrise: dailyRaw.sunrise && dailyRaw.sunrise[0] ? dailyRaw.sunrise[0] : new Date().toISOString(),
    sunset: dailyRaw.sunset && dailyRaw.sunset[0] ? dailyRaw.sunset[0] : new Date().toISOString(),
    moonPhase: Math.round(moonPhase * 100) / 100,
    moonPhaseName: getMoonPhaseName(moonPhase),
    rainProbability: hourlyRaw.precipitation_probability ? hourlyRaw.precipitation_probability[0] || 0 : 0,
  };

  // Process 24-hour forecast
  const hourly: HourlyForecast[] = [];
  const timeArray = hourlyRaw.time || [];
  const limit = Math.min(timeArray.length, 24);

  for (let i = 0; i < limit; i++) {
    const isDayVal = hourlyRaw.is_day ? hourlyRaw.is_day[i] === 1 : true;
    const wCode = hourlyRaw.weather_code[i];
    const wInfo = parseWmoCode(wCode, isDayVal);

    hourly.push({
      time: timeArray[i],
      temperature: Math.round(hourlyRaw.temperature_2m[i]),
      conditionCode: wCode,
      conditionType: wInfo.type,
      rainProbability: hourlyRaw.precipitation_probability ? hourlyRaw.precipitation_probability[i] || 0 : 0,
      windSpeed: Math.round(hourlyRaw.wind_speed_10m[i]),
      humidity: Math.round(hourlyRaw.relative_humidity_2m[i]),
      isDay: isDayVal,
      uvIndex: hourlyRaw.uv_index ? Math.round(hourlyRaw.uv_index[i] || 0) : 0,
    });
  }

  // Process 7-day forecast
  const daily: DailyForecast[] = [];
  const dailyDates = dailyRaw.time || [];

  for (let i = 0; i < Math.min(dailyDates.length, 7); i++) {
    const wCode = dailyRaw.weather_code[i];
    const wInfo = parseWmoCode(wCode, true);

    daily.push({
      date: dailyDates[i],
      dayName: i === 0 ? 'Today' : new Date(dailyDates[i]).toLocaleDateString('en-US', { weekday: 'short' }),
      tempMax: Math.round(dailyRaw.temperature_2m_max[i]),
      tempMin: Math.round(dailyRaw.temperature_2m_min[i]),
      conditionCode: wCode,
      conditionText: wInfo.text,
      conditionType: wInfo.type,
      rainProbability: dailyRaw.precipitation_probability_max ? dailyRaw.precipitation_probability_max[i] || 0 : 0,
      windSpeedMax: Math.round(dailyRaw.wind_speed_10m_max[i]),
      uvIndexMax: Math.round(dailyRaw.uv_index_max ? dailyRaw.uv_index_max[i] || 0 : 3),
      sunrise: dailyRaw.sunrise ? dailyRaw.sunrise[i] : '',
      sunset: dailyRaw.sunset ? dailyRaw.sunset[i] : '',
      summary: `${wInfo.text} with highs of ${Math.round(dailyRaw.temperature_2m_max[i])}° and wind up to ${Math.round(dailyRaw.wind_speed_10m_max[i])} km/h.`,
    });
  }

  return {
    location,
    current,
    hourly,
    daily,
    lastUpdated: new Date().toISOString(),
    fromCache: false,
  };
};

export const searchCitiesGeocoding = async (query: string): Promise<LocationData[]> => {
  if (!query || query.trim().length < 2) return [];

  const url = `${API_CONFIG.OPEN_METEO.GEOCODING_URL}?name=${encodeURIComponent(query.trim())}&count=10&language=en&format=json`;
  const res = await fetch(url);
  if (!res.ok) return [];

  const json = await res.json();
  if (!json.results) return [];

  return json.results.map((item: any, idx: number) => ({
    id: `${item.name.toLowerCase().replace(/\s+/g, '-')}-${item.country_code || idx}`,
    name: item.name,
    country: item.country || '',
    admin1: item.admin1 || '',
    latitude: item.latitude,
    longitude: item.longitude,
  }));
};
