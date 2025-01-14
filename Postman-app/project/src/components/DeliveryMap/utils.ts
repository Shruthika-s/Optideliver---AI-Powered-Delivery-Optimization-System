import { Delivery } from '../../types';

interface Point {
  lat: number;
  lng: number;
}

// Simple implementation of the nearest neighbor algorithm
export function calculateOptimalRoute(deliveries: Delivery[]): Point[] {
  if (deliveries.length <= 1) return deliveries.map(d => d.coordinates);

  const points: Point[] = [];
  const unvisited = [...deliveries];
  let current = unvisited.shift()!;
  points.push(current.coordinates);

  while (unvisited.length > 0) {
    let nearestIdx = 0;
    let minDistance = Number.MAX_VALUE;

    unvisited.forEach((delivery, idx) => {
      const distance = calculateDistance(
        current.coordinates,
        delivery.coordinates
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestIdx = idx;
      }
    });

    current = unvisited[nearestIdx];
    points.push(current.coordinates);
    unvisited.splice(nearestIdx, 1);
  }

  return points;
}

function calculateDistance(point1: Point, point2: Point): number {
  const lat1 = point1.lat;
  const lon1 = point1.lng;
  const lat2 = point2.lat;
  const lon2 = point2.lng;

  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(value: number): number {
  return (value * Math.PI) / 180;
}