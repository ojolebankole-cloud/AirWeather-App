import React from 'react';
import {
  Thermometer,
  Droplets,
  Wind,
  Gauge,
  Sun,
  Eye,
  CloudRain,
  Compass,
} from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { useSettings } from '../../context/SettingsContext';
import { MetricWidget } from '../common/MetricWidget';
import {
  formatTemp,
  formatWind,
  formatPressure,
  getUvDescription,
  getWindDirectionName,
} from '../../utils/formatters';

export const MetricsGrid: React.FC = () => {
  const { weatherData } = useWeather();
  const { settings } = useSettings();

  if (!weatherData) return null;

  const { current } = weatherData;
  const uvInfo = getUvDescription(current.uvIndex);
  const windDirName = getWindDirectionName(current.windDirection);

  return (
    <div className="grid grid-cols-2 gap-3.5">
      {/* Feels Like */}
      <MetricWidget
        icon={Thermometer}
        label="Feels Like"
        value={formatTemp(current.apparentTemperature, settings.temperatureUnit)}
        subValue={
          current.apparentTemperature > current.temperature
            ? 'Humidity makes it feel warmer'
            : current.apparentTemperature < current.temperature
            ? 'Wind makes it feel cooler'
            : 'Similar to actual temp'
        }
        accentColor="#f59e0b"
      />

      {/* Humidity */}
      <MetricWidget
        icon={Droplets}
        label="Humidity"
        value={`${current.humidity}%`}
        subValue={`Dew point: ${formatTemp(current.dewPoint, settings.temperatureUnit)}`}
        progress={current.humidity}
        accentColor="#38bdf8"
      />

      {/* Wind */}
      <MetricWidget
        icon={Wind}
        label="Wind"
        value={formatWind(current.windSpeed, settings.windUnit)}
        subValue={`Direction: ${current.windDirection}° (${windDirName})`}
        accentColor="#2dd4bf"
      />

      {/* UV Index */}
      <MetricWidget
        icon={Sun}
        label="UV Index"
        value={current.uvIndex}
        badgeText={uvInfo.text}
        badgeColor={uvInfo.color}
        progress={(current.uvIndex / 11) * 100}
        accentColor={uvInfo.color}
      />

      {/* Pressure */}
      <MetricWidget
        icon={Gauge}
        label="Pressure"
        value={formatPressure(current.pressure, settings.pressureUnit)}
        subValue={current.pressure > 1013 ? 'High pressure system' : 'Low pressure system'}
        accentColor="#a78bfa"
      />

      {/* Visibility */}
      <MetricWidget
        icon={Eye}
        label="Visibility"
        value={`${current.visibility} km`}
        subValue={current.visibility >= 10 ? 'Clear visibility' : 'Reduced visibility'}
        accentColor="#34d399"
      />

      {/* Dew Point */}
      <MetricWidget
        icon={Compass}
        label="Dew Point"
        value={formatTemp(current.dewPoint, settings.temperatureUnit)}
        subValue={current.dewPoint > 20 ? 'Muggy and humid' : 'Comfortable air'}
        accentColor="#38bdf8"
      />

      {/* Rain Probability */}
      <MetricWidget
        icon={CloudRain}
        label="Rain Chance"
        value={`${current.rainProbability}%`}
        progress={current.rainProbability}
        subValue={current.rainProbability > 50 ? 'Rain expected today' : 'Low precipitation risk'}
        accentColor="#60a5fa"
      />
    </div>
  );
};
