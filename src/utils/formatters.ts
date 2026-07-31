import dayjs from 'dayjs';
import { TemperatureUnit, WindUnit, PressureUnit } from '../types/weather';

export const convertTemp = (celsius: number, unit: TemperatureUnit): number => {
  if (unit === 'F') {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
};

export const formatTemp = (celsius: number, unit: TemperatureUnit): string => {
  const val = convertTemp(celsius, unit);
  return `${val}°`;
};

export const convertWind = (kmh: number, unit: WindUnit): { value: number; label: string } => {
  switch (unit) {
    case 'ms':
      return { value: Math.round((kmh / 3.6) * 10) / 10, label: 'm/s' };
    case 'mph':
      return { value: Math.round(kmh * 0.621371), label: 'mph' };
    case 'knots':
      return { value: Math.round(kmh * 0.539957), label: 'kt' };
    case 'kmh':
    default:
      return { value: Math.round(kmh), label: 'km/h' };
  }
};

export const formatWind = (kmh: number, unit: WindUnit): string => {
  const { value, label } = convertWind(kmh, unit);
  return `${value} ${label}`;
};

export const convertPressure = (hPa: number, unit: PressureUnit): { value: number; label: string } => {
  if (unit === 'inHg') {
    return { value: Math.round(hPa * 0.02953 * 100) / 100, label: 'inHg' };
  }
  return { value: Math.round(hPa), label: 'hPa' };
};

export const formatPressure = (hPa: number, unit: PressureUnit): string => {
  const { value, label } = convertPressure(hPa, unit);
  return `${value} ${label}`;
};

export const formatTime = (timeStr: string | Date, format24: boolean = false): string => {
  const d = dayjs(timeStr);
  return format24 ? d.format('HH:mm') : d.format('h:mm A');
};

export const formatDate = (dateStr: string | Date): string => {
  return dayjs(dateStr).format('ddd, MMM D');
};

export const formatDayName = (dateStr: string | Date): string => {
  const d = dayjs(dateStr);
  const today = dayjs();
  if (d.isSame(today, 'day')) return 'Today';
  return d.format('dddd');
};

export const getUvDescription = (uv: number): { text: string; color: string } => {
  if (uv <= 2) return { text: 'Low', color: '#10b981' };
  if (uv <= 5) return { text: 'Moderate', color: '#f59e0b' };
  if (uv <= 7) return { text: 'High', color: '#f97316' };
  if (uv <= 10) return { text: 'Very High', color: '#ef4444' };
  return { text: 'Extreme', color: '#a855f7' };
};

export const getAqiDetails = (aqi: number): { status: string; color: string; advice: string } => {
  // European / US AQI scale
  if (aqi <= 20) return { status: 'Good', color: '#10b981', advice: 'Air quality is satisfactory and poses little or no risk.' };
  if (aqi <= 40) return { status: 'Fair', color: '#84cc16', advice: 'Air quality is acceptable for most individuals.' };
  if (aqi <= 60) return { status: 'Moderate', color: '#f59e0b', advice: 'Sensitive groups may experience mild symptoms.' };
  if (aqi <= 80) return { status: 'Poor', color: '#f97316', advice: 'Unhealthy for sensitive groups. Reduce outdoor exertion.' };
  if (aqi <= 100) return { status: 'Very Poor', color: '#ef4444', advice: 'Health warnings of emergency conditions. Stay indoors.' };
  return { status: 'Hazardous', color: '#a855f7', advice: 'Everyone may experience more serious health effects.' };
};

export const getWindDirectionName = (deg: number): string => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(deg / 45) % 8];
};
