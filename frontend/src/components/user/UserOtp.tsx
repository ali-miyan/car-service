import React from "react";
import Input from "../common/Input";

interface OtpFormProps {
  otp: string;
  onOtpChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const OtpForm: React.FC<OtpFormProps> = ({ otp, onOtpChange, onSubmit,isLoading }) => {
  return (
    <>
      <div className="text-center relative bottom-6 text-sm text-gray-700">
        An OTP has been sent to your registered email
      </div>
      <form className="grid grid-cols-1 gap-6 w-full" onSubmit={onSubmit}>
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
        <div className="col-span-2 flex items-center justify-center text-center">
        {isLoading ? (
          <button className="bg-red-800 text-white font-bold py-2 px-4 rounded w-full h-12 flex items-center justify-center" disabled>
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V2.5"
              ></path>
            </svg>
          </button>
        ) : (
          <button className="bg-red-800 hover:bg-red-900 text-white font-bold py-2 px-4 rounded w-full h-12">
            REGISTER
          </button>
        )}
      </div>
      </form>
    </>
  );
};

export default OtpForm;
