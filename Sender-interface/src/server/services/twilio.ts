import { Twilio } from 'twilio';

const twilioClient = new Twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendSMSNotification = async (
  phoneNumber: string,
  message: string
) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
    return response;
  } catch (error) {
    console.error('Twilio SMS Error:', error);
    throw error;
  }
}; 
import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendSMSNotification = async (
  phoneNumber: string,
  message: string
) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
    return response;
  } catch (error) {
    console.error('Twilio SMS Error:', error);
    throw error;
  }
}; import twilio from 'twilio';

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export const sendSMSNotification = async (
  phoneNumber: string,
  message: string
) => {
  try {
    const response = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
    return response;
  } catch (error) {
    console.error('Twilio SMS Error:', error);
    throw error;
  }
}; 