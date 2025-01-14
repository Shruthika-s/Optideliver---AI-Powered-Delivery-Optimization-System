import React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import { MapComponent } from './MapComponent';
import { Delivery } from '../../types';
import { GOOGLE_MAPS_API_KEY } from '../../config/constants';

interface MapWrapperProps {
  deliveries: Delivery[];
}

export function MapWrapper({ deliveries }: MapWrapperProps) {
  // Fallback component while map is loading
  const render = (status: string) => {
    return (
      <div className="h-[400px] w-full flex items-center justify-center bg-gray-100 rounded-lg">
        <p className="text-gray-500">{status}</p>
      </div>
    );
  };

  return (
    <Wrapper apiKey={GOOGLE_MAPS_API_KEY} render={render}>
      <div className="h-[400px] w-full">
        <MapComponent deliveries={deliveries} />
      </div>
    </Wrapper>
  );
}