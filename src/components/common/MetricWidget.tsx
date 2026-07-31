import React from 'react';
import { GlassCard } from './GlassCard';

interface MetricWidgetProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  subValue?: string;
  badgeText?: string;
  badgeColor?: string;
  progress?: number; // 0 to 100
  accentColor?: string;
  onClick?: () => void;
}

export const MetricWidget: React.FC<MetricWidgetProps> = ({
  icon: Icon,
  label,
  value,
  subValue,
  badgeText,
  badgeColor = '#10b981',
  progress,
  accentColor = '#fbbf24',
  onClick,
}) => {
  return (
    <GlassCard onClick={onClick} className="flex flex-col justify-between p-4 min-h-[120px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white shadow-inner"
            style={{ color: accentColor }}
          >
            <Icon className="h-4 w-4" />
          </div>
          <span className="text-xs font-semibold tracking-wider text-white/70 uppercase">
            {label}
          </span>
        </div>
        {badgeText && (
          <span
            className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white shadow-sm"
            style={{ backgroundColor: badgeColor }}
          >
            {badgeText}
          </span>
        )}
      </div>

      <div className="mt-3">
        <div className="text-2xl font-bold tracking-tight text-white">{value}</div>
        {subValue && (
          <p className="mt-1 text-xs font-medium text-white/80 line-clamp-1">{subValue}</p>
        )}
      </div>

      {progress !== undefined && (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(100, Math.max(0, progress))}%`,
              backgroundColor: accentColor,
              boxShadow: `0 0 10px ${accentColor}`,
            }}
          />
        </div>
      )}
    </GlassCard>
  );
};
