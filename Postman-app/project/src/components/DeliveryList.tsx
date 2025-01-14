import React from 'react';
import { Phone, MapPin, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Delivery } from '../types';

interface DeliveryListProps {
  deliveries: Delivery[];
  onStatusUpdate: (id: string, status: Delivery['status']) => void;
}

export function DeliveryList({ deliveries, onStatusUpdate }: DeliveryListProps) {
  const getStatusColor = (status: Delivery['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      in_progress: 'bg-blue-100 text-blue-800',
      delivered: 'bg-green-100 text-green-800',
      attempted: 'bg-red-100 text-red-800',
    };
    return colors[status];
  };

  return (
    <div className="space-y-4 p-4">
      {deliveries.map((delivery) => (
        <div
          key={delivery.id}
          className="bg-white rounded-lg shadow-md p-4 space-y-3"
        >
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg">{delivery.recipientName}</h3>
            <span
              className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                delivery.status
              )}`}
            >
              {delivery.status.replace('_', ' ')}
            </span>
          </div>

          <div className="space-y-2 text-gray-600">
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{delivery.timeSlot}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} />
              <span>{delivery.address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} />
              <span>{delivery.recipientPhone}</span>
            </div>
            {delivery.specialInstructions && (
              <div className="flex items-center gap-2 text-amber-600">
                <AlertCircle size={16} />
                <span>{delivery.specialInstructions}</span>
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-2">
            <button
              onClick={() => onStatusUpdate(delivery.id, 'delivered')}
              className="flex-1 bg-green-500 text-white py-2 rounded-md flex items-center justify-center gap-2"
            >
              <CheckCircle size={16} />
              Mark Delivered
            </button>
            <button
              onClick={() => onStatusUpdate(delivery.id, 'attempted')}
              className="flex-1 bg-red-500 text-white py-2 rounded-md flex items-center justify-center gap-2"
            >
              <AlertCircle size={16} />
              Mark Attempted
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}