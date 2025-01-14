import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { DeliveryList } from './components/DeliveryList';
import { DeliveryMap } from './components/DeliveryMap/Map';
import { Delivery } from './types';
import { calculateDeliveryMetrics } from './utils/metrics';

// Mock data with Hyderabad coordinates
const mockDeliveries: Delivery[] = [
  {
    id: '1',
    recipientName: 'Jerry Smith',
    recipientPhone: '+91 9876543210',
    address: 'Hitech City, Hyderabad',
    timeSlot: '10:00 AM - 12:00 PM',
    status: 'pending',
    coordinates: { lat: 17.486395, lng: 78.500423 },
    specialInstructions: 'Please ring doorbell twice',
  },
  {
    id: '2',
    recipientName: 'Sarah Johnson',
    recipientPhone: '+91 9876543211',
    address: 'Gachibowli, Hyderabad',
    timeSlot: '12:00 PM - 2:00 PM',
    status: 'in_progress',
    coordinates: { lat: 17.428765, lng: 78.509786 },
  },
  {
    id: '3',
    recipientName: 'Michael Brown',
    recipientPhone: '+91 9876543212',
    address: 'Madhapur, Hyderabad',
    timeSlot: '2:00 PM - 4:00 PM',
    status: 'pending',
    coordinates: { lat: 17.389363, lng: 78.508957 },
  },
  {
    id: '4',
    recipientName: 'Emily Davis',
    recipientPhone: '+91 9876543213',
    address: 'Jubilee Hills, Hyderabad',
    timeSlot: '2:00 PM - 4:00 PM',
    status: 'pending',
    coordinates: { lat: 17.362814, lng: 78.51865 },
  },
  {  
    id: '5',
    recipientName: 'David Wilson',
    recipientPhone: '+91 9876543214',
    address: 'Banjara Hills, Hyderabad',
    timeSlot: '4:00 PM - 6:00 PM',
    status: 'pending',
    coordinates: { lat: 17.412345, lng: 78.445254 },
  },
];

function App() {
  const [deliveries, setDeliveries] = useState<Delivery[]>(mockDeliveries);
  const [metrics, setMetrics] = useState(calculateDeliveryMetrics(mockDeliveries));

  const handleStatusUpdate = (id: string, newStatus: Delivery['status']) => {
    setDeliveries((prev) =>
      prev.map((delivery) =>
        delivery.id === id ? { ...delivery, status: newStatus } : delivery
      )
    );
  };

  // Update metrics whenever deliveries change
  useEffect(() => {
    setMetrics(calculateDeliveryMetrics(deliveries));
  }, [deliveries]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header onMenuToggle={() => {}} />
      <main className="max-w-6xl mx-auto pb-20">
        <Dashboard metrics={metrics} />
        <div className="mt-6 px-4">
          <h2 className="text-xl font-semibold mb-4">Delivery Route</h2>
          <DeliveryMap deliveries={deliveries} />
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold px-4 mb-4">Today's Deliveries</h2>
          <DeliveryList
            deliveries={deliveries}
            onStatusUpdate={handleStatusUpdate}
          />
        </div>
      </main>
    </div>
  );
}

export default App;