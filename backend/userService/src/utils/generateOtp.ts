import crypto from "crypto";

export const generateOtp = (length: number = 4): string => {
  const digits: string = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
};

export const generateToken = (): string => {
  const token = crypto.randomBytes(32).toString("hex");
  return token;
};
