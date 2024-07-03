import React, { useState } from "react";
import CustomModal from "../common/Modal";
import SignupForm from "./UserSignup";
import LoginForm from "./UserLogin";
import OtpForm from "./UserOtp";
import { useVerifyOtpMutation } from "../../store/slices/userApiSlice";
import { CustomError } from "../../schema/error";
import { useGoogleLogin } from "@react-oauth/google";
import { notifyError, notifySuccess } from "../common/Toast";
import axios from "axios";

const App: React.FC = () => {
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [allowClose, setAllowClose] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [otpError, setOtpError] = useState("");


  const getEmail = (email: string) => {
    console.log(email, "ddddddddddddd");
    setEmail(email);
  };

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleSubmitOtp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted OTP:", otp);

    try {
      const res = await verifyOtp({ otp, email }).unwrap();
      console.log(res, "hkjhhjkkj");

      if (res.success) {
        notifySuccess("registered successfully");
        location.reload();
      }
    } catch (err) {
      const error = err as CustomError;

      if (error.status === 400) {
        console.log("4000000000000");

        setOtpError(error.data.error);
      } else {
        notifyError("something went wrong,please try again later");
      }
    }
  };

  const handleGoogleButton = () => {
    handleGoogleSubmit()
  }

  const handleGoogleSubmit = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      const res = await axios.post("http://localhost/api/user/google-register", codeResponse);

      if (res.data.success) {
        notifySuccess("Successfully logged");
      } else {
        notifyError("Something went wrong");
      }
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleClose = () => {
    if (!isOtpSent || allowClose) {
      setAllowClose(true);
    }
  };

  return (
    <CustomModal
      width={500}
      height={isOtpSent ? 320 : isLogin ? 420 : 480}
      buttonLabel={isOtpSent ? "Signup" : "Signup"}
      title={
        isOtpSent ? "Enter OTP" : isLogin ? "Login" : "Create your account"
      }
      onClose={handleClose}
      disableClose={isOtpSent}
    >
      <div className="flex flex-col items-center mt-10">
        {!isOtpSent && !isLogin && (
          <SignupForm
            onOtpRequest={() => setIsOtpSent(true)}
            getEmail={getEmail}
          />
        )}
        {!isOtpSent && isLogin && (
          <LoginForm onSwitchToSignup={() => setIsLogin(false)} />
        )}
        {isOtpSent && (
          <>
            {otpError && (
              <p className="text-red-500 relative top-24 text-xs">{otpError}</p>
            )}
            <OtpForm
              otp={otp}
              isLoading={isLoading}
              onOtpChange={handleOtpChange}
              onSubmit={handleSubmitOtp}
            />
          </>
        )}

        {!isOtpSent && !isLogin && (
          <div className="flex justify-center w-full mt-2 mb-2">
            <button onClick={() => setIsLogin(true)}>
              <span className="text-black text-sm font-bai-regular">
                Already a user?
              </span>
              <span className="hover:underline text-red-800 font-bai-regular">
                login
              </span>
            </button>
          </div>
        )}
        {!isOtpSent && (
          <>
            <div className="flex justify-center items-center mt-2">
              <span className="mr-2 font-bai-extra-light">OR</span>
            </div>
            <div className="flex justify-center w-full mt-2">
              <button
                onClick={handleGoogleButton}
                className="flex items-center justify-center border px-5 py-3 rounded shadow-md bg-white text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              >
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
          </>
        )}
      </div>
    </CustomModal>
  );
};

export default App;
