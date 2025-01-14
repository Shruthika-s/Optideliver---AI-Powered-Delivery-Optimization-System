export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'sender' | 'receiver';
}

export interface Order {
  _id: string;
  trackingId: string;
  senderId: string;
  receiverDetails: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  deliveryDate: string;
  selectedTimeSlot: string | null;
  status: 'pending' | 'scheduled' | 'delivered';
  createdAt: string;
}