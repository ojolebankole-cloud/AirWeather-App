import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { useSettings } from '../../context/SettingsContext';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  glowColor?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  glow = false,
  glowColor = '#fbbf24',
  onClick,
  hoverEffect = true,
  ...props
}) => {
  const { settings } = useSettings();

  const isAmoled = settings.themeMode === 'amoled';

  const cardStyle: React.CSSProperties = {
    backdropFilter: `blur(${settings.blurStrength}px)`,
    WebkitBackdropFilter: `blur(${settings.blurStrength}px)`,
    backgroundColor: isAmoled
      ? 'rgba(0, 0, 0, 0.85)'
      : `rgba(255, 255, 255, ${settings.glassOpacity})`,
    boxShadow: glow
      ? `0 10px 30px -10px ${glowColor}40, inset 0 1px 1px rgba(255, 255, 255, 0.3)`
      : '0 8px 32px 0 rgba(0, 0, 0, 0.18), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
  };

  return (
    <motion.div
      whileTap={onClick && settings.animationsEnabled ? { scale: 0.98 } : undefined}
      whileHover={
        hoverEffect && settings.animationsEnabled
          ? { y: -2, transition: { duration: 0.2 } }
          : undefined
      }
      onClick={onClick}
      style={cardStyle}
      className={`relative overflow-hidden rounded-2xl border border-white/20 p-4 transition-all duration-300 ${
        onClick ? 'cursor-pointer select-none' : ''
      } ${className}`}
      {...props}
    >
      {/* Subtle top light highlight line */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      {children}
    </motion.div>
  );
};
