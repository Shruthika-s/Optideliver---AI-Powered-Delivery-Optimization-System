const API_URL = 'http://127.0.0.1:5000/';

export const sendSMS = async (to: string, message: string) => {
  try {
    const response = await fetch(`${API_URL}/send_sms`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, message }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error sending SMS:', error);
    throw error;
  }
};

export const sendWhatsApp = async (to: string, message: string) => {
  try {
    const response = await fetch(`${API_URL}/send_whatsapp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ to, message }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
}; 