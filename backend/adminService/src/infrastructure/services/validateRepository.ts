import dotenv from 'dotenv';

dotenv.config();

export class ConfigService {
  validateCredentials(email: string, password: string): boolean {
    const envEmail = process.env.ADMIN_EMAIL;
    const envPassword = process.env.ADMIN_PASSWORD;
    return email === envEmail && password === envPassword;
  }
}
