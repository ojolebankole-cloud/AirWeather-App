import React from 'react';
import { motion } from 'motion/react';
import {
  Sun,
  Moon,
  Cloud,
  CloudSun,
  CloudMoon,
  CloudRain,
  CloudLightning,
  CloudSnow,
  CloudFog,
  Wind,
  Snowflake,
} from 'lucide-react';
import { WeatherConditionType } from '../../types/weather';

interface AnimatedWeatherIconProps {
  condition: WeatherConditionType;
  isDay?: boolean;
  size?: number;
  glow?: boolean;
  className?: string;
}

export const AnimatedWeatherIcon: React.FC<AnimatedWeatherIconProps> = ({
  condition,
  isDay = true,
  size = 64,
  glow = true,
  className = '',
}) => {
  const getIconAndColors = () => {
    switch (condition) {
      case 'sunny':
        return {
          Component: Sun,
          color: '#fbbf24',
          glow: 'rgba(251, 191, 36, 0.6)',
          animate: { rotate: [0, 360] },
          transition: { duration: 25, repeat: Infinity, ease: 'linear' },
        };
      case 'clear_night':
        return {
          Component: Moon,
          color: '#a5b4fc',
          glow: 'rgba(165, 180, 252, 0.5)',
          animate: { y: [0, -4, 0] },
          transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        };
      case 'partly_cloudy':
        return {
          Component: isDay ? CloudSun : CloudMoon,
          color: isDay ? '#fde047' : '#93c5fd',
          glow: isDay ? 'rgba(253, 224, 71, 0.5)' : 'rgba(147, 197, 253, 0.5)',
          animate: { y: [0, -3, 0], x: [0, 2, 0] },
          transition: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
        };
      case 'cloudy':
        return {
          Component: Cloud,
          color: '#cbd5e1',
          glow: 'rgba(203, 213, 225, 0.4)',
          animate: { x: [-3, 3, -3] },
          transition: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
        };
      case 'rain':
        return {
          Component: CloudRain,
          color: '#38bdf8',
          glow: 'rgba(56, 189, 248, 0.5)',
          animate: { y: [0, 2, 0] },
          transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
        };
      case 'storm':
        return {
          Component: CloudLightning,
          color: '#c084fc',
          glow: 'rgba(192, 132, 252, 0.6)',
          animate: { scale: [1, 1.05, 1], rotate: [-2, 2, -2] },
          transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
        };
      case 'snow':
        return {
          Component: isDay ? CloudSnow : Snowflake,
          color: '#67e8f9',
          glow: 'rgba(103, 232, 249, 0.6)',
          animate: { rotate: [-10, 10, -10], y: [0, -3, 0] },
          transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        };
      case 'fog':
        return {
          Component: CloudFog,
          color: '#e4e4e7',
          glow: 'rgba(228, 228, 231, 0.4)',
          animate: { opacity: [0.8, 1, 0.8] },
          transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        };
      case 'windy':
        return {
          Component: Wind,
          color: '#2dd4bf',
          glow: 'rgba(45, 212, 191, 0.5)',
          animate: { x: [-4, 4, -4] },
          transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        };
      default:
        return {
          Component: Sun,
          color: '#fbbf24',
          glow: 'rgba(251, 191, 36, 0.5)',
          animate: { rotate: [0, 360] },
          transition: { duration: 20, repeat: Infinity, ease: 'linear' },
        };
    }
  };

  const { Component, color, glow: glowColor, animate, transition } = getIconAndColors();

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {glow && (
        <div
          className="absolute rounded-full blur-2xl transition-all duration-500"
          style={{
            width: size * 1.2,
            height: size * 1.2,
            backgroundColor: glowColor,
            opacity: 0.6,
          }}
        />
      )}
      <motion.div animate={animate} transition={transition} className="relative z-10">
        <Component size={size} style={{ color, filter: `drop-shadow(0 0 12px ${color}80)` }} />
      </motion.div>
    </div>
  );
};
