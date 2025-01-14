import { Delivery } from '../types';
import { calculateDistance } from './distance';

export function calculateDeliveryMetrics(deliveries: Delivery[]) {
  const totalDeliveries = deliveries.length;
  const completedDeliveries = deliveries.filter(
    (d) => d.status === 'delivered'
  ).length;

  // Calculate total distance of the optimized route
  let distanceCovered = 0;
  for (let i = 0; i < deliveries.length - 1; i++) {
    distanceCovered += calculateDistance(
      deliveries[i].coordinates,
      deliveries[i + 1].coordinates
    );
  }

  // Calculate efficiency score based on:
  // 1. Completion rate (60% weight)
  // 2. Time slot adherence (40% weight)
  const completionRate = totalDeliveries > 0 ? completedDeliveries / totalDeliveries : 0;
  const timeSlotAdherence = calculateTimeSlotAdherence(deliveries);
  const efficiencyScore = (completionRate * 0.6) + (timeSlotAdherence * 0.4);

  return {
    totalDeliveries,
    completedDeliveries,
    distanceCovered: Number(distanceCovered.toFixed(1)),
    efficiencyScore: Number(efficiencyScore.toFixed(2))
  };
}

function calculateTimeSlotAdherence(deliveries: Delivery[]): number {
  const completedDeliveries = deliveries.filter(d => d.status === 'delivered');
  if (completedDeliveries.length === 0) return 0;

  // For this example, we'll assume all completed deliveries are within their time slots
  // In a real application, you would compare delivery timestamps with time slots
  return 1;
}