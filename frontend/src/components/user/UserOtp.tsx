import React from "react";
import Input from "../common/Input";

interface OtpFormProps {
  otp: string;
  onOtpChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const OtpForm: React.FC<OtpFormProps> = ({ otp, onOtpChange, onSubmit }) => {
  return (
    <form className="grid grid-cols-1 gap-4 w-full" onSubmit={onSubmit}>
      <div>
        <Input
          type="text"
          width="w-full"
          placeholder="OTP"
          label="OTP"
          name="otp"
          value={otp}
          onChange={onOtpChange}
          error={false}
        />
      </div>
      <div className="col-span-2">
        <button className="bg-red-800 hover:bg-red-900 font-bai-regular text-white font-bold py-2 px-4 rounded w-full h-12">
          VERIFY OTP
        </button>
      </div>
    </form>
  );
};

export default OtpForm;
