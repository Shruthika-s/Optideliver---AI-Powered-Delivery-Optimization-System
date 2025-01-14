import React, { useState } from 'react';
import type { Point } from '../types/Point';

interface PointFormProps {
  onAddPoint: (point: Point) => void;
}

export function PointForm({ onAddPoint }: PointFormProps) {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (lat && lng) {
      onAddPoint({
        id: Date.now(),
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      });
      setLat('');
      setLng('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div>
        <label htmlFor="lat" className="block text-sm font-medium text-gray-700">
          Latitude
        </label>
        <input
          type="number"
          id="lat"
          step="any"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="lng" className="block text-sm font-medium text-gray-700">
          Longitude
        </label>
        <input
          type="number"
          id="lng"
          step="any"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
      >
        Add Point
      </button>
    </form>
  );
}