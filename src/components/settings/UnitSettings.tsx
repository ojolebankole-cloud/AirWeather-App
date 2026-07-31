import React from 'react';
import { GlassCard } from '../common/GlassCard';
import { Thermometer, Wind, Gauge } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { TemperatureUnit, WindUnit, PressureUnit } from '../../types/weather';
import { triggerHaptic } from '../../utils/haptics';

export const UnitSettings: React.FC = () => {
  const { settings, setTemperatureUnit, setWindUnit, setPressureUnit } = useSettings();

  const handleTemp = (u: TemperatureUnit) => {
    triggerHaptic('selection');
    setTemperatureUnit(u);
  };

  const handleWind = (u: WindUnit) => {
    triggerHaptic('selection');
    setWindUnit(u);
  };

  const handlePressure = (u: PressureUnit) => {
    triggerHaptic('selection');
    setPressureUnit(u);
  };

  return (
    <GlassCard className="p-4 space-y-4">
      <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
        <Thermometer className="h-4 w-4" />
        <span>Measurement Units</span>
      </div>

      {/* Temperature Unit */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <span className="text-sm font-bold text-white block">Temperature</span>
          <span className="text-xs text-white/60">Choose Celsius or Fahrenheit</span>
        </div>
        <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => handleTemp('C')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              settings.temperatureUnit === 'C'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            °C
          </button>
          <button
            onClick={() => handleTemp('F')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all ${
              settings.temperatureUnit === 'F'
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            °F
          </button>
        </div>
      </div>

      {/* Wind Unit */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <Wind className="h-4 w-4 text-sky-300" />
          <div>
            <span className="text-sm font-bold text-white block">Wind Speed</span>
            <span className="text-xs text-white/60">Metric, Imperial, or Marine</span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-white/10">
          {(['kmh', 'ms', 'mph', 'knots'] as WindUnit[]).map((u) => (
            <button
              key={u}
              onClick={() => handleWind(u)}
              className={`px-2 py-1 text-[11px] font-bold rounded-lg transition-all ${
                settings.windUnit === u
                  ? 'bg-sky-400 text-slate-950 shadow-md'
                  : 'text-white/70 hover:text-white'
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      {/* Pressure Unit */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gauge className="h-4 w-4 text-purple-300" />
          <div>
            <span className="text-sm font-bold text-white block">Air Pressure</span>
            <span className="text-xs text-white/60">Hectopascals or Inches of Mercury</span>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-white/10">
          <button
            onClick={() => handlePressure('hPa')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
              settings.pressureUnit === 'hPa'
                ? 'bg-purple-400 text-slate-950 shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            hPa
          </button>
          <button
            onClick={() => handlePressure('inHg')}
            className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
              settings.pressureUnit === 'inHg'
                ? 'bg-purple-400 text-slate-950 shadow-md'
                : 'text-white/70 hover:text-white'
            }`}
          >
            inHg
          </button>
        </div>
      </div>
    </GlassCard>
  );
};
