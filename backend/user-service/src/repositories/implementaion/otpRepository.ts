import nodemailer from 'nodemailer';
import { generateOtp } from '../../utils';
import { IOtpService } from '../interfaces';
require('dotenv').config()

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

  generateOtp(length:number = 4): string {
    return generateOtp(length)
  }

  async sendOtp(email: string, otp: string): Promise<void> {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}`,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
