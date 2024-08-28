require("dotenv").config();

export class ConfigService {
  validateCredentials(email: string, password: string): boolean {
    const envEmail = process.env.EMAIL;
    const envPassword = process.env.PASSWORD;
    return email === envEmail && password === envPassword;
  }
}
