import type { Point } from '../types/Point';

function calculateDistance(point1: Point, point2: Point): number {
  // Haversine formula for calculating distance between two points on Earth
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(point2.lat - point1.lat);
  const dLon = toRad(point2.lng - point1.lng);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(point1.lat)) * Math.cos(toRad(point2.lat)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function calculateRouteOrder(points: Point[]): Point[] {
  if (points.length <= 2) return [...points];

  const unvisited = [...points.slice(1)];
  const optimizedRoute = [points[0]]; // Start with the first point
  let currentPoint = points[0];

  while (unvisited.length > 0) {
    // Find the nearest unvisited point
    let nearestIdx = 0;
    let minDistance = Infinity;

    unvisited.forEach((point, idx) => {
      const distance = calculateDistance(currentPoint, point);
      if (distance < minDistance) {
        minDistance = distance;
        nearestIdx = idx;
      }
    });

    // Add the nearest point to our route
    currentPoint = unvisited[nearestIdx];
    optimizedRoute.push(currentPoint);
    unvisited.splice(nearestIdx, 1);
  }

  return optimizedRoute;
}

export function getLineColor(index: number): string {
  const colors = [
    '#3B82F6', // Blue
    '#10B981', // Green
    '#8B5CF6', // Purple
    '#EF4444', // Red
    '#F59E0B'  // Orange
  ];
  return colors[index % colors.length];
}

export function calculateTotalDistance(points: Point[]): number {
  let total = 0;
  for (let i = 0; i < points.length - 1; i++) {
    total += calculateDistance(points[i], points[i + 1]);
  }
  return Math.round(total * 100) / 100; // Round to 2 decimal places
}