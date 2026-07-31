import React from 'react';
import { GlassCard } from './GlassCard';

export const SkeletonLoader: React.FC = () => {
  return (
    <div className="space-y-6 animate-pulse px-4 py-6">
      {/* Hero Skeleton */}
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="h-6 w-36 rounded-full bg-white/20" />
        <div className="h-24 w-40 rounded-3xl bg-white/20" />
        <div className="h-5 w-28 rounded-full bg-white/15" />
        <div className="h-4 w-48 rounded-full bg-white/10" />
      </div>

      {/* Hourly Skeleton */}
      <GlassCard className="p-4 space-y-3">
        <div className="h-4 w-32 rounded bg-white/20" />
        <div className="flex gap-3 overflow-x-hidden pt-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center space-y-2 h-24 w-16 min-w-[64px] rounded-2xl bg-white/10 p-2" />
          ))}
        </div>
      </GlassCard>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <GlassCard key={i} className="h-28 p-4 space-y-2">
            <div className="h-4 w-20 rounded bg-white/20" />
            <div className="h-8 w-16 rounded bg-white/25 mt-2" />
          </GlassCard>
        ))}
      </div>
    </div>
  );
};
