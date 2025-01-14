import React, { useEffect, useRef, useState } from 'react';
import { Delivery } from '../../types';
import { useMapServices } from './hooks/useMapServices';
import { useDeliveryMarkers } from './hooks/useDeliveryMarkers';

interface MapComponentProps {
  deliveries: Delivery[];
}

export function MapComponent({ deliveries }: MapComponentProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { directionsService, directionsRenderer } = useMapServices();
  
  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return;

    const newMap = new google.maps.Map(mapRef.current, {
      zoom: 12,
      center: deliveries[0]?.coordinates || { lat: 40.7128, lng: -74.006 },
      mapTypeControl: false,
      streetViewControl: false,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    setMap(newMap);
    directionsRenderer.setMap(newMap);
  }, [mapRef, directionsRenderer]);

  // Handle markers and route updates
  useDeliveryMarkers({ map, deliveries, directionsService, directionsRenderer });

  return <div ref={mapRef} className="w-full h-full rounded-lg" />;
}