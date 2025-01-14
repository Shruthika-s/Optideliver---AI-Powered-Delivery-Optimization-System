import { useEffect } from 'react';
import { Delivery } from '../../../types';
import { calculateOptimalRoute } from '../utils/routeOptimization';
import { createDeliveryMarker } from '../utils/markers';

interface UseDeliveryMarkersProps {
  map: google.maps.Map | null;
  deliveries: Delivery[];
  directionsService: google.maps.DirectionsService;
  directionsRenderer: google.maps.DirectionsRenderer;
}

export function useDeliveryMarkers({
  map,
  deliveries,
  directionsService,
  directionsRenderer,
}: UseDeliveryMarkersProps) {
  useEffect(() => {
    if (!map || deliveries.length === 0) return;

    // Clear existing markers
    directionsRenderer.setMap(null);
    directionsRenderer.setMap(map);

    // Create markers for each delivery
    deliveries.forEach((delivery, index) => {
      createDeliveryMarker({
        map,
        delivery,
        label: (index + 1).toString(),
      });
    });

    // Calculate and display route
    const waypoints = calculateOptimalRoute(deliveries);
    const origin = waypoints[0];
    const destination = waypoints[waypoints.length - 1];
    const middlePoints = waypoints.slice(1, -1).map(point => ({
      location: new google.maps.LatLng(point.lat, point.lng),
      stopover: true
    }));

    directionsService.route(
      {
        origin: new google.maps.LatLng(origin.lat, origin.lng),
        destination: new google.maps.LatLng(destination.lat, destination.lng),
        waypoints: middlePoints,
        optimizeWaypoints: true,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === 'OK' && result) {
          directionsRenderer.setDirections(result);
        }
      }
    );
  }, [map, deliveries, directionsService, directionsRenderer]);
}