import { sendSMS, sendWhatsApp } from '../services/messageService';

// In your component:
const handleSendMessage = async () => {
  try {
    await sendSMS('+917386545459', 'Your message here');
    // or
    await sendWhatsApp('+917386545459', 'Your WhatsApp message here');
  } catch (error) {
    console.error('Error:', error);
  }
}; 