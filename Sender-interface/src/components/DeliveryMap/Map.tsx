import React from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, Polyline } from 'react-leaflet';
import { Icon, LatLngExpression } from 'leaflet';
import { Delivery } from '../../types';
import { calculateOptimalRoute } from './utils';
import 'leaflet/dist/leaflet.css';

interface MapProps {
  deliveries: Delivery[];
}

// Fix for default marker icons in React-Leaflet
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

export function DeliveryMap({ deliveries }: MapProps) {
  const center: LatLngExpression = deliveries[0]?.coordinates 
    ? [deliveries[0].coordinates.lat, deliveries[0].coordinates.lng]
    : [40.7128, -74.006];

  const route = calculateOptimalRoute(deliveries);
  const positions: LatLngExpression[] = route.map(point => [point.lat, point.lng]);

  const getMarkerColor = (status: Delivery['status']) => {
    const colors = {
      pending: '#EAB308',
      in_progress: '#3B82F6',
      delivered: '#22C55E',
      attempted: '#EF4444',
    };
    return colors[status];
  };

  const getStatusLabel = (status: Delivery['status']) => {
    const labels = {
      pending: 'Pending',
      in_progress: 'In Progress',
      delivered: 'Delivered',
      attempted: 'Attempted',
    };
    return labels[status];
  };

  const customIcon = (delivery: Delivery, index: number) => new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32">
        <circle cx="12" cy="12" r="10" fill="${getMarkerColor(delivery.status)}" stroke="white" stroke-width="2"/>
        <text x="12" y="16" text-anchor="middle" fill="white" font-size="12" font-weight="bold">${index + 1}</text>
      </svg>
    `)}`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <MapContainer
      center={center}
      zoom={12}
      className="h-[400px] w-full rounded-lg shadow-lg"
      style={{ zIndex: 0 }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Route line with gradient effect */}
      <Polyline
        positions={positions}
        pathOptions={{
          color: '#4F46E5',
          weight: 4,
          opacity: 0.8,
          lineCap: 'round',
          lineJoin: 'round',
          dashArray: '1, 10',
        }}
      />

      {/* Delivery markers with enhanced tooltips */}
      {deliveries.map((delivery, index) => (
        <Marker
          key={delivery.id}
          position={[delivery.coordinates.lat, delivery.coordinates.lng]}
          icon={customIcon(delivery, index)}
        >
          <Tooltip 
            permanent={false}
            direction="top"
            offset={[0, -16]}
            opacity={0.9}
            className="custom-tooltip"
          >
            <div className="p-2 min-w-[200px]">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold">{delivery.recipientName}</span>
                <span className="text-xs px-2 py-1 rounded-full" 
                      style={{ 
                        backgroundColor: `${getMarkerColor(delivery.status)}20`,
                        color: getMarkerColor(delivery.status)
                      }}>
                  {getStatusLabel(delivery.status)}
                </span>
              </div>
              <div className="text-sm space-y-1">
                <p className="text-gray-600">{delivery.timeSlot}</p>
                <p className="text-gray-600">{delivery.address}</p>
                {delivery.specialInstructions && (
                  <p className="text-amber-600 text-xs mt-1">
                    Note: {delivery.specialInstructions}
                  </p>
                )}
              </div>
            </div>
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}