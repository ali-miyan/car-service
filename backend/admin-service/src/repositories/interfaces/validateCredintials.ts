export interface IConfigService {
  validateCredentials(email: string, password: string): boolean;
}
