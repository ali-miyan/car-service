export interface IOtpService {
    generateOtp(length: number): string;
    generateToken(): string;
    sendMail(email: string, subject: string, message: string): Promise<void>;
}
