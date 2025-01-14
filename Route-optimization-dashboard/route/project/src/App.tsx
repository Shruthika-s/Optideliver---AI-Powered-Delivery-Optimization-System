import React, { useState, useMemo } from 'react';
import { Map } from './components/Map';
import { RouteInfo } from './components/RouteInfo';
import { DeliveryList } from './components/DeliveryList';
import { routes } from './data/routes';
import { calculateRouteOrder } from './utils/route';
import { useDeliveryTracking } from './hooks/useDeliveryTracking';
import 'leaflet/dist/leaflet.css';

function App() {
  const points = routes.route1;
  const optimizedPoints = useMemo(() => calculateRouteOrder(points), [points]);
  const {
    activePoints,
    deliveryStatus,
    markAsCompleted,
    resetDeliveries
  } = useDeliveryTracking(optimizedPoints);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
           
          <h1 className="text-3xl font-bold text-gray-900 head">India Post Delivery Tracking</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <RouteInfo points={points} optimizedPoints={optimizedPoints} />
            <DeliveryList 
              points={optimizedPoints}
              deliveryStatus={deliveryStatus}
              onMarkCompleted={markAsCompleted}
              onReset={resetDeliveries}
            />
          </div>
          
          <div className="md:col-span-2">
            <Map points={activePoints} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;