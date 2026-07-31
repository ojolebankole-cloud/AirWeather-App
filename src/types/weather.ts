export type TemperatureUnit = 'C' | 'F';
export type WindUnit = 'kmh' | 'ms' | 'mph' | 'knots';
export type PressureUnit = 'hPa' | 'inHg';

export type WeatherConditionType = 
  | 'sunny'
  | 'clear_night'
  | 'rain'
  | 'storm'
  | 'snow'
  | 'cloudy'
  | 'partly_cloudy'
  | 'fog'
  | 'windy';

export type ThemeMode = 'system' | 'light' | 'dark' | 'amoled';

export interface LocationData {
  id: string;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
  isCurrentLocation?: boolean;
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  conditionCode: number;
  conditionText: string;
  conditionType: WeatherConditionType;
  isDay: boolean;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  pressure: number;
  uvIndex: number;
  visibility: number;
  dewPoint: number;
  airQualityIndex: number; // 1-5 scale or US AQI 0-500
  aqiStatus: string;
  pm2_5?: number;
  pm10?: number;
  o3?: number;
  no2?: number;
  so2?: number;
  co?: number;
  sunrise: string;
  sunset: string;
  moonPhase: number; // 0 to 1
  moonPhaseName: string;
  rainProbability: number;
}

export interface HourlyForecast {
  time: string; // ISO string
  temperature: number;
  conditionCode: number;
  conditionType: WeatherConditionType;
  rainProbability: number;
  windSpeed: number;
  humidity: number;
  isDay: boolean;
  uvIndex: number;
}

export interface DailyForecast {
  date: string; // YYYY-MM-DD
  dayName: string;
  tempMax: number;
  tempMin: number;
  conditionCode: number;
  conditionText: string;
  conditionType: WeatherConditionType;
  rainProbability: number;
  windSpeedMax: number;
  uvIndexMax: number;
  sunrise: string;
  sunset: string;
  summary: string;
}

export interface WeatherData {
  location: LocationData;
  current: CurrentWeather;
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  lastUpdated: string; // ISO string
  fromCache?: boolean;
}

export interface AppSettings {
  temperatureUnit: TemperatureUnit;
  windUnit: WindUnit;
  pressureUnit: PressureUnit;
  blurStrength: number; // 0 to 20
  glassOpacity: number; // 0.1 to 0.9
  accentColor: string; // hex code
  themeMode: ThemeMode;
  animationsEnabled: boolean;
  notificationsEnabled: boolean;
  offlineCacheEnabled: boolean;
}

export interface WeatherAlert {
  id: string;
  event: string;
  headline: string;
  description: string;
  severity: 'minor' | 'moderate' | 'severe' | 'extreme';
  onset: string;
  expires: string;
}
