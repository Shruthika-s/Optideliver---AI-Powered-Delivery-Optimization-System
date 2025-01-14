import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { sendSMSNotification } from './services/twilio';
import mongoose from 'mongoose';

config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/india-post')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Endpoint to confirm slot and send SMS
app.post('/api/orders/:id/confirm-slot', async (req, res) => {
  try {
    const { timeSlot } = req.body;
    const { id } = req.params;

    // For demo, using mock data
    const order = {
      _id: id,
      trackingId: 'IP123456789',
      selectedTimeSlot: timeSlot,
      status: 'scheduled',
      receiverDetails: {
        phone: process.env.TEST_PHONE_NUMBER
      }
    };

    if (!order.receiverDetails.phone) {
      throw new Error('Receiver phone number is required');
    }

    // Send SMS notification
    await sendSMSNotification(
      order.receiverDetails.phone,
      `Your delivery for order ${order.trackingId} has been scheduled for ${timeSlot}. Thank you for using India Post!`
    );

    res.json({ success: true, order });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Failed to confirm slot' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});