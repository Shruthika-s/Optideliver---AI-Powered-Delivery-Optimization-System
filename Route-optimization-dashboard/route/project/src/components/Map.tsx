import { MapContainer, TileLayer } from 'react-leaflet';
import type { Point } from '../types/Point';
import { MapMarker } from './MapMarker';
import { RouteLines } from './RouteLines';

interface MapProps {
  points: Point[];
}

export function Map({ points }: MapProps) {
  const center = points.length > 0 
    ? [points[0].lat, points[0].lng] 
    : [0, 0];

  return (
    <MapContainer
      center={center as [number, number]}
      zoom={13}
      className="w-full h-[600px] rounded-lg shadow-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RouteLines points={points} />
      {points.map((point, index) => (
        <MapMarker key={point.id} point={point} index={index} />
      ))}
    </MapContainer>
  );
}