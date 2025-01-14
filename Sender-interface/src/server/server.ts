import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import twilio from 'twilio';

config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

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
        phone: process.env.TEST_PHONE_NUMBER // Use a test phone number from .env
      }
    };

    // Add type assertions or checks for environment variables
    if (!process.env.TWILIO_PHONE_NUMBER || !order.receiverDetails.phone) {
      throw new Error('Missing phone number configuration');
    }

    // Send SMS notification
    await twilioClient.messages.create({
      body: `Your delivery for order ${order.trackingId} has been scheduled for ${timeSlot}. Thank you for using India Post!`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: order.receiverDetails.phone
    });

    res.json({ order });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Failed to confirm slot' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 