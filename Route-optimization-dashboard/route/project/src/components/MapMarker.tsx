import { Marker, Popup } from 'react-leaflet';
import { Icon, divIcon } from 'leaflet';
import { Truck } from 'lucide-react';
import type { Point } from '../types/Point';

interface MapMarkerProps {
  point: Point;
  index: number;
}

const courierIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export function MapMarker({ point, index }: MapMarkerProps) {
  const numberIcon = divIcon({
    className: 'custom-number-icon',
    html: `<div class="number-marker">${index + 1}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });

  return (
    <>
      <Marker
        position={[point.lat, point.lng]}
        icon={courierIcon}
      >
        <Popup className="delivery-popup">
          <div className="flex items-center gap-2 p-1">
            <Truck className="text-red-600" size={24} />
            <div className="flex flex-col">
              <span className="font-bold text-lg">ORD1001{index + 1}</span>
              <span className="text-sm text-gray-600">({point.lat}, {point.lng})</span>
            </div>
          </div>
        </Popup>
      </Marker>
      <Marker
        position={[point.lat, point.lng]}
        icon={numberIcon}
        zIndexOffset={1000}
      />
    </>
  );
}