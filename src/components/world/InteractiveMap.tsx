import React, { useEffect, useRef, useState } from 'react';
import { GlassCard } from '../common/GlassCard';
import { Map, MapPin, Navigation } from 'lucide-react';
import { LocationData } from '../../types/weather';
import { useWeather } from '../../context/WeatherContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface InteractiveMapProps {
  onSelectCoordinates: (loc: LocationData) => void;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectCoordinates }) => {
  const { location } = useWeather();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  const [selectedCoords, setSelectedCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (!mapRef.current || leafletMap.current) return;

    // Initialize Leaflet Map
    const map = L.map(mapRef.current, {
      center: [location.latitude, location.longitude],
      zoom: 5,
      zoomControl: false,
    });

    // Add Dark/Modern Tile Layer (CartoDB Dark Matter or OpenStreetMap)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
    }).addTo(map);

    // Default Marker
    const customIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `<div style="background-color: #fbbf24; width: 18px; height: 18px; border-radius: 50%; border: 3px solid #ffffff; box-shadow: 0 0 15px #f59e0b;"></div>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });

    const marker = L.marker([location.latitude, location.longitude], { icon: customIcon }).addTo(map);
    markerRef.current = marker;
    leafletMap.current = map;

    // Map Click Handler
    map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      setSelectedCoords({ lat, lng });

      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng], { icon: customIcon }).addTo(map);
      }
    });

    return () => {
      map.remove();
      leafletMap.current = null;
    };
  }, []);

  // Update map center when active location changes
  useEffect(() => {
    if (leafletMap.current && location) {
      leafletMap.current.setView([location.latitude, location.longitude], 6);
      if (markerRef.current) {
        markerRef.current.setLatLng([location.latitude, location.longitude]);
      }
    }
  }, [location]);

  const handleApplySelectedLocation = () => {
    if (!selectedCoords) return;
    const loc: LocationData = {
      id: `map-loc-${selectedCoords.lat.toFixed(2)}-${selectedCoords.lng.toFixed(2)}`,
      name: `Pin (${selectedCoords.lat.toFixed(2)}°, ${selectedCoords.lng.toFixed(2)}°)`,
      country: 'Selected Pin',
      latitude: selectedCoords.lat,
      longitude: selectedCoords.lng,
    };
    onSelectCoordinates(loc);
  };

  return (
    <GlassCard className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-sky-300 uppercase tracking-wider">
          <Map className="h-4 w-4" />
          <span>Interactive World Weather Radar & Map</span>
        </div>
        <span className="text-[11px] font-medium text-white/60">
          Tap anywhere to pick weather location
        </span>
      </div>

      <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-white/20 shadow-inner">
        <div ref={mapRef} className="h-full w-full z-0" />

        {/* Selected Coords Floating Pill */}
        {selectedCoords && (
          <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between rounded-xl border border-white/20 bg-slate-900/90 p-3 shadow-2xl backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-medium text-white">
              <MapPin className="h-4 w-4 text-amber-400" />
              <span>
                {selectedCoords.lat.toFixed(3)}°, {selectedCoords.lng.toFixed(3)}°
              </span>
            </div>
            <button
              onClick={handleApplySelectedLocation}
              className="flex items-center gap-1.5 rounded-lg bg-amber-400 px-3 py-1.5 text-xs font-bold text-slate-950 transition hover:bg-amber-300 active:scale-95"
            >
              <Navigation className="h-3.5 w-3.5" />
              <span>Load Weather</span>
            </button>
          </div>
        )}
      </div>
    </GlassCard>
  );
};
