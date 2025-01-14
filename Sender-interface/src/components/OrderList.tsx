import React from 'react';
import { Order } from '../types';

interface OrderListProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
}

export const OrderList: React.FC<OrderListProps> = ({ orders, onSelectOrder }) => {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <div
          key={order._id}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => onSelectOrder(order)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">
                {order.receiverDetails.name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {order.receiverDetails.address}
              </p>
            </div>
            <span className="text-sm text-gray-500">
              #{order.trackingId}
            </span>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-gray-500">
              Delivery: {new Date(order.deliveryDate).toLocaleDateString()}
            </span>
            <span
              className={`capitalize px-2 py-1 rounded ${
                order.status === 'scheduled'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}
            >
              {order.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};