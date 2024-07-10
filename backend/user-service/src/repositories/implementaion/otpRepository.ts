import nodemailer from 'nodemailer';
import { generateOtp, generateToken } from '../../utils';
import { IOtpService } from '../interfaces';
require('dotenv').config();

export class OtpService implements IOtpService {
  private transporter: nodemailer.Transporter;

  constructor() { 
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  generateOtp(length: number = 4): string {
    return generateOtp(length);
  }
  generateToken(): string {
    return generateToken();
  }

  async sendMail(email: string, subject: string, message: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: message,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
