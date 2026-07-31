import { WeatherConditionType } from '../types/weather';

export interface WeatherCodeInfo {
  text: string;
  type: WeatherConditionType;
  iconName: string;
}

export const parseWmoCode = (code: number, isDay: boolean = true): WeatherCodeInfo => {
  switch (code) {
    case 0:
      return {
        text: isDay ? 'Clear Sky' : 'Clear Night',
        type: isDay ? 'sunny' : 'clear_night',
        iconName: isDay ? 'Sun' : 'Moon',
      };
    case 1:
      return {
        text: 'Mainly Clear',
        type: isDay ? 'sunny' : 'clear_night',
        iconName: isDay ? 'SunDim' : 'Moon',
      };
    case 2:
      return {
        text: 'Partly Cloudy',
        type: 'partly_cloudy',
        iconName: isDay ? 'CloudSun' : 'CloudMoon',
      };
    case 3:
      return {
        text: 'Overcast',
        type: 'cloudy',
        iconName: 'Cloud',
      };
    case 45:
    case 48:
      return {
        text: 'Foggy',
        type: 'fog',
        iconName: 'CloudFog',
      };
    case 51:
    case 53:
    case 55:
      return {
        text: 'Light Drizzle',
        type: 'rain',
        iconName: 'CloudDrizzle',
      };
    case 56:
    case 57:
      return {
        text: 'Freezing Drizzle',
        type: 'rain',
        iconName: 'CloudHail',
      };
    case 61:
      return {
        text: 'Slight Rain',
        type: 'rain',
        iconName: 'CloudRain',
      };
    case 63:
      return {
        text: 'Moderate Rain',
        type: 'rain',
        iconName: 'CloudRain',
      };
    case 65:
      return {
        text: 'Heavy Rain',
        type: 'rain',
        iconName: 'CloudRainWind',
      };
    case 66:
    case 67:
      return {
        text: 'Freezing Rain',
        type: 'rain',
        iconName: 'CloudHail',
      };
    case 71:
    case 73:
      return {
        text: 'Moderate Snow',
        type: 'snow',
        iconName: 'CloudSnow',
      };
    case 75:
    case 77:
      return {
        text: 'Heavy Snowfall',
        type: 'snow',
        iconName: 'Snowflake',
      };
    case 80:
    case 81:
      return {
        text: 'Rain Showers',
        type: 'rain',
        iconName: 'CloudRain',
      };
    case 82:
      return {
        text: 'Violent Rain Showers',
        type: 'rain',
        iconName: 'CloudRainWind',
      };
    case 85:
    case 86:
      return {
        text: 'Snow Showers',
        type: 'snow',
        iconName: 'CloudSnow',
      };
    case 95:
      return {
        text: 'Thunderstorm',
        type: 'storm',
        iconName: 'CloudLightning',
      };
    case 96:
    case 99:
      return {
        text: 'Heavy Thunderstorm & Hail',
        type: 'storm',
        iconName: 'CloudLightning',
      };
    default:
      return {
        text: 'Fair',
        type: 'partly_cloudy',
        iconName: 'CloudSun',
      };
  }
};

export const getMoonPhaseName = (phase: number): string => {
  if (phase < 0.03 || phase > 0.97) return 'New Moon';
  if (phase < 0.22) return 'Waxing Crescent';
  if (phase < 0.28) return 'First Quarter';
  if (phase < 0.47) return 'Waxing Gibbous';
  if (phase < 0.53) return 'Full Moon';
  if (phase < 0.72) return 'Waning Gibbous';
  if (phase < 0.78) return 'Last Quarter';
  return 'Waning Crescent';
};
