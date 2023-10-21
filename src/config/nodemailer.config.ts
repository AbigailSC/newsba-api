import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';

import { config } from '@config';

dotenv.config();

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendEmail = async (email: string, html: string): Promise<void> => {
  const mailOptions = {
    from: `"NewsBA" <${config.email.user}>`,
    to: email,
    subject: 'Confirm your account in NewsBA',
    html
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
