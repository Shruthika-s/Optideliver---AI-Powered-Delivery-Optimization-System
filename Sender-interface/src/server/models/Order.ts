import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  trackingId: {
    type: String,
    required: true,
    unique: true,
  },
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiverDetails: {
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  selectedTimeSlot: {
    type: String,
    default: null,
  },
  status: {
    type: String,
    enum: ['pending', 'scheduled', 'delivered'],
    default: 'pending',
  },
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);