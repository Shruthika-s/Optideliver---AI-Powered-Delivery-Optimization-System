import React from 'react';
import { Package, Clock, MapPin, Award } from 'lucide-react';
import { DeliveryMetrics } from '../types';

interface DashboardProps {
  metrics: DeliveryMetrics;
}

export function Dashboard({ metrics }: DashboardProps) {
  const stats = [
    {
      label: 'Total Deliveries',
      value: metrics.totalDeliveries,
      icon: Package,
      color: 'bg-blue-500',
    },
    {
      label: 'Completed',
      value: metrics.completedDeliveries,
      icon: Clock,
      color: 'bg-green-500',
    },
    {
      label: 'Distance (km)',
      value: metrics.distanceCovered.toFixed(1),
      icon: MapPin,
      color: 'bg-purple-500',
    },
    {
      label: 'Efficiency',
      value: `${(metrics.efficiencyScore * 100).toFixed(0)}%`,
      icon: Award,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={`${stat.color} p-4 rounded-lg text-white shadow-lg`}
        >
          <div className="flex items-center gap-2 mb-2">
            <stat.icon size={20} />
            <span className="font-medium">{stat.label}</span>
          </div>
          <p className="text-2xl font-bold">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}