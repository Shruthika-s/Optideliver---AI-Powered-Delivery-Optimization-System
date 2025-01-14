import React from 'react';
import type { Point } from '../types/Point';
import type { DeliveryStatus } from '../types/DeliveryStatus';
import { CheckCircle, Circle, Package } from 'lucide-react';

interface DeliveryListProps {
  points: Point[];
  deliveryStatus: DeliveryStatus[];
  onMarkCompleted: (id: number) => void;
  onReset: () => void;
}

export function DeliveryList({ points, deliveryStatus, onMarkCompleted, onReset }: DeliveryListProps) {
  const remainingDeliveries = points.filter(point => 
    !deliveryStatus.find(status => status.id === point.id)?.completed
  ).length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md back">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Delivery Progress</h2>
        <button
          onClick={onReset}
          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
        >
          Reset All
        </button>
      </div>

      <div className="mb-4 p-3 bg-blue-50 rounded-md">
        <p className="text-blue-800">
          Remaining Deliveries: <span className="font-bold">{remainingDeliveries}</span>
        </p>
      </div>

      <ul className="space-y-3 back">
        {points.map((point, index) => {
          const status = deliveryStatus.find(s => s.id === point.id);
          const isCompleted = status?.completed;

          return (
            <li 
              key={point.id}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                isCompleted ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
              }`}
            >
              <span className={`flex items-center justify-center w-8 h-8 ${
                isCompleted ? 'bg-green-600' : 'bg-blue-600'
              } text-white rounded-full font-bold`}>
                {index + 1}
              </span>
              
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Package size={16} className={isCompleted ? 'text-green-600' : 'text-blue-600'} />
                  <span className="font-medium">ORD1001{index + 1}</span>
                </div>
                <span className="text-sm text-gray-600">
                  ({point.lat}, {point.lng})
                </span>
              </div>

              <button
                onClick={() => !isCompleted && onMarkCompleted(point.id)}
                disabled={isCompleted}
                className={`p-2 rounded-full transition-colors ${
                  isCompleted 
                    ? 'text-green-600 cursor-default' 
                    : 'text-gray-400 hover:text-blue-600'
                }`}
              >
                {isCompleted ? <CheckCircle size={24} /> : <Circle size={24} />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}