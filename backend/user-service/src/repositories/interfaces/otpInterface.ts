export interface IOtpService {
    generateOtp(length: number): string;
    sendOtp(email: string, otp: string): Promise<void>;
}
