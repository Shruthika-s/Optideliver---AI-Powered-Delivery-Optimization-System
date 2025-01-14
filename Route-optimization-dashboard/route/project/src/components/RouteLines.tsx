import { Polyline } from 'react-leaflet';
import type { Point } from '../types/Point';
import { calculateRouteOrder, getLineColor } from '../utils/route';

interface RouteLinesProps {
  points: Point[];
}

export function RouteLines({ points }: RouteLinesProps) {
  if (points.length < 2) return null;

  const orderedPoints = calculateRouteOrder(points);
  const positions = orderedPoints.map(point => [point.lat, point.lng]);

  return (
    <>
      {positions.map((_, index) => {
        if (index === positions.length - 1) return null;
        
        return (
          <Polyline
            key={`line-${index}`}
            positions={[positions[index], positions[index + 1]]}
            color={getLineColor(index)}
            weight={3}
            opacity={0.8}
            dashArray="10, 10"
          >
          </Polyline>
        );
      })}
    </>
  );
}