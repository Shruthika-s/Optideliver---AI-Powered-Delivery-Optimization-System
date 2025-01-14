import React from 'react';
import type { Point } from '../types/Point';
import { calculateTotalDistance } from '../utils/route';
import { MapPin } from 'lucide-react';

interface RouteInfoProps {
  points: Point[];
  optimizedPoints: Point[];
}

export function RouteInfo({ points, optimizedPoints }: RouteInfoProps) {
  const originalDistance = calculateTotalDistance(points);
  const optimizedDistance = calculateTotalDistance(optimizedPoints);
  const savings = Math.round((originalDistance - optimizedDistance) * 100) / 100;
  const savingsPercentage = Math.round((savings / originalDistance) * 100);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6 back">
      <h2 className="text-xl font-semibold mb-4">Route Information</h2>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Original Distance:</span>
          <span className="font-medium">{originalDistance} km</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Optimized Distance:</span>
          <span className="font-medium">{optimizedDistance} km</span>
        </div>
        <div className="flex items-center justify-between text-green-600">
          <span>Distance Saved:</span>
          <span className="font-medium">{savings} km ({savingsPercentage}%)</span>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="font-medium mb-2">Optimized Route Order:</h3>
        <div className="space-y-2">
          {optimizedPoints.map((point, index) => (
            <div key={point.id} className="flex items-center gap-2 text-sm">
              <MapPin size={16} className="text-red-600" />
              <span>Stop {index + 1}: ({point.lat}, {point.lng})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}