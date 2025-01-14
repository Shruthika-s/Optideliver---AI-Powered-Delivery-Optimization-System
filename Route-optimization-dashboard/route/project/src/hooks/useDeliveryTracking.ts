import { useState, useCallback } from 'react';
import type { Point } from '../types/Point';
import type { DeliveryStatus } from '../types/DeliveryStatus';

export function useDeliveryTracking(initialPoints: Point[]) {
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus[]>(
    initialPoints.map(point => ({
      id: point.id,
      completed: false
    }))
  );

  const markAsCompleted = useCallback((pointId: number) => {
    setDeliveryStatus(prev => 
      prev.map(status => 
        status.id === pointId 
          ? { ...status, completed: true, timestamp: new Date() }
          : status
      )
    );
  }, []);

  const activePoints = initialPoints.filter(point => 
    !deliveryStatus.find(status => status.id === point.id)?.completed
  );

  const completedPoints = initialPoints.filter(point => 
    deliveryStatus.find(status => status.id === point.id)?.completed
  );

  const resetDeliveries = useCallback(() => {
    setDeliveryStatus(initialPoints.map(point => ({
      id: point.id,
      completed: false
    })));
  }, [initialPoints]);

  return {
    activePoints,
    completedPoints,
    deliveryStatus,
    markAsCompleted,
    resetDeliveries
  };
}