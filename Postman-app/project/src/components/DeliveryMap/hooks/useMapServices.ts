import { useState } from 'react';

export function useMapServices() {
  const [directionsService] = useState<google.maps.DirectionsService>(
    new google.maps.DirectionsService()
  );
  
  const [directionsRenderer] = useState<google.maps.DirectionsRenderer>(
    new google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#4F46E5',
        strokeWeight: 5,
      }
    })
  );

  return { directionsService, directionsRenderer };
}