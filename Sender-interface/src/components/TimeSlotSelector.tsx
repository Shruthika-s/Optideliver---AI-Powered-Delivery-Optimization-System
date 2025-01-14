import React, { useState } from 'react';
import { Clock, Check } from 'lucide-react';

interface TimeSlot {
  time: string;
  available: number;
}

interface TimeSlotSelectorProps {
  slots: TimeSlot[];
  selectedSlot: string | null;
  onSelectSlot: (slot: string) => void;
}

export const TimeSlotSelector: React.FC<TimeSlotSelectorProps> = ({
  slots,
  selectedSlot,
  onSelectSlot,
}) => {
  const [tempSelectedSlot, setTempSelectedSlot] = useState<string | null>(null);

  const handleConfirmSlot = (slot: string) => {
    onSelectSlot(slot);
    setTempSelectedSlot(null);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Clock size={20} />
        Available Time Slots
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {slots.map(({ time, available }) => (
          <div
            key={time}
            className={`p-3 rounded-lg border transition-all ${
              selectedSlot === time
                ? 'border-green-500 bg-green-50'
                : tempSelectedSlot === time
                ? 'border-blue-500 bg-blue-50'
                : available === 0
                ? 'border-gray-200 bg-gray-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <div 
              onClick={() => available > 0 && !selectedSlot && setTempSelectedSlot(time)}
              className={`${available > 0 && !selectedSlot ? 'cursor-pointer' : ''}`}
            >
              <div className="text-sm font-medium">{time}</div>
              <div className={`text-xs ${
                available === 0 ? 'text-red-500' : 'text-green-600'
              }`}>
                {available} slots available
              </div>
            </div>
            {tempSelectedSlot === time && !selectedSlot && (
              <button
                onClick={() => handleConfirmSlot(time)}
                className="mt-2 w-full flex items-center justify-center gap-1 bg-blue-600 text-white py-1 px-2 rounded text-sm hover:bg-blue-700 transition-colors"
              >
                <Check size={14} />
                Confirm Slot
              </button>
            )}
            {selectedSlot === time && (
              <div className="mt-2 w-full flex items-center justify-center gap-1 bg-green-600 text-white py-1 px-2 rounded text-sm">
                <Check size={14} />
                Confirmed
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};