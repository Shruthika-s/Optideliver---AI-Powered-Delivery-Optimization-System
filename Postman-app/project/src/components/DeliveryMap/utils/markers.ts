import { Delivery } from '../../../types';

interface CreateDeliveryMarkerProps {
  map: google.maps.Map;
  delivery: Delivery;
  label: string;
}

export function createDeliveryMarker({ map, delivery, label }: CreateDeliveryMarkerProps) {
  const marker = new google.maps.Marker({
    position: delivery.coordinates,
    map,
    label: {
      text: label,
      color: '#FFFFFF',
      fontWeight: 'bold',
    },
    icon: {
      path: google.maps.SymbolPath.CIRCLE,
      scale: 12,
      fillColor: getStatusColor(delivery.status),
      fillOpacity: 1,
      strokeWeight: 2,
      strokeColor: '#FFFFFF',
    },
  });

  // Add click listener for info window
  const infoWindow = new google.maps.InfoWindow({
    content: createInfoWindowContent(delivery),
  });

  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });

  return marker;
}

function getStatusColor(status: Delivery['status']): string {
  const colors = {
    pending: '#EAB308',
    in_progress: '#3B82F6',
    delivered: '#22C55E',
    attempted: '#EF4444',
  };
  return colors[status];
}

function createInfoWindowContent(delivery: Delivery): string {
  return `
    <div class="p-2">
      <h3 class="font-semibold">${delivery.recipientName}</h3>
      <p class="text-sm text-gray-600">${delivery.address}</p>
      <p class="text-sm text-gray-600">${delivery.timeSlot}</p>
    </div>
  `;
}