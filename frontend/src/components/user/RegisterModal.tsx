import React, { useState } from "react";
import CustomModal from "../common/Modal";
import SignupForm from "./UserSignup";
import LoginForm from "./UserLogin";
import OtpForm from "./UserOtp";

const App: React.FC = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [allowClose, setAllowClose] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [otp, setOtp] = useState("");

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmitOtp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted OTP:", otp);
    // Verify OTP logic here
  };

  const handleClose = () => {
    if (!isOtpSent || allowClose) {
      setAllowClose(true);
    }
  };

  return (
    <CustomModal
      width={500}
      height={isOtpSent ? 370 : isLogin ? 400 : 480}
      buttonLabel={isOtpSent ? "Signup" : "Signup"}
      title={
        isOtpSent ? "Enter OTP" : isLogin ? "Login" : "Create your account"
      }
      onClose={handleClose}
      disableClose={isOtpSent}
    >
      <div className="flex flex-col items-center mt-10">
        {!isOtpSent && !isLogin && (
          <SignupForm onOtpRequest={() => setIsOtpSent(true)} />
        )}
        {!isOtpSent && isLogin && (
          <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
        )}
        {isOtpSent && (
          <OtpForm
            otp={otp}
            onOtpChange={handleOtpChange}
            onSubmit={handleSubmitOtp}
          />
        )}
        {!isOtpSent && !isLogin && (
          <div className="flex justify-center w-full mt-2">
            <button onClick={() => setIsLogin(true)}>
              <span className="text-black text-sm font-bai-regular">
                Don't have an account?
              </span>
              <span className="hover:underline text-red-800 font-bai-regular">Register</span>
            </button>
          </div>
        )}
        <div className="flex justify-center items-center mt-2">
          <span className="mr-2 font-bai-extra-light">OR</span>
        </div>
        <div className="flex justify-center w-full mt-2">
          <button className="flex items-center justify-center border px-5 py-3 rounded shadow-md bg-white text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
            <img
              src="https://img.icons8.com/color/48/000000/google-logo.png"
              alt="Google"
              className="w-6 h-6 mr-3"
            />
            <span className="font-bai-semi-bold uppercase">
              Sign up with Google
            </span>
          </button>
        </div>
        
      </div>
    </CustomModal>
  );
};

export default App;
