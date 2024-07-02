import dotenv from 'dotenv';
import { IConfigService } from '../interfaces';

dotenv.config();

export class ConfigService implements IConfigService {
  validateCredentials(email: string, password: string): boolean {
    
    const envEmail = process.env.ADMIN_EMAIL;
    const envPassword = process.env.ADMIN_PASSWORD;
    console.log(envEmail,envPassword);
    return email === envEmail && password === envPassword;
  }
}
