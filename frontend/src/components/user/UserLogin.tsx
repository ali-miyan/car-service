import React, { useState } from "react";
import Input from "../common/Input";
import { hasFormErrors, isFormEmpty, validateInput } from "../../helpers/userValidation";
import { useLoginUserMutation } from "../../store/slices/userApiSlice";
import { CustomError } from "../../schema/error";
import { notifyError, notifySuccess } from "../common/Toast";
import { errMessage } from "../../constants/errorMessage";

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup }) => {
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    global: "",
  });

  const [errorFields, setErrorFields] = useState<Record<string, boolean>>({
    email: false,
    password: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrorFields((prevErrorFields) => ({
      ...prevErrorFields,
      [name]: true,
    }));
    const error = validateInput(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
    if (error === "") {
      setErrorFields((prevErrorFields) => ({
        ...prevErrorFields,
        [name]: false,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = {
      email: validateInput("email", formData.email),
      password: validateInput("password", formData.password),
      global:''
    };

    setErrors(newErrors);

    const hasError = hasFormErrors(newErrors)
    const isEmpty = isFormEmpty(formData)

    if (!hasError && !isEmpty) {
        try {
          const res = await loginUser(formData).unwrap();
          console.log(res);
          
          if (res.success) {
            // onOtpRequest();
            notifySuccess("you have logged in");
            console.log(res, "ssssssssssssss");
          } else {
            setErrors((prevErrors) => ({
              ...prevErrors,
              global: res.message,
            }));
          }
        } catch (err) {
          const error = err as CustomError;
          console.log("Error occurred:", error);
          if (error.status === 400) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              global: error.data.error,
            }));
          }else{
            notifyError(errMessage)
          }
        }
    } else {
      console.log("Form contains errors or is incomplete");
      setErrorFields({
        email: newErrors.email !== "",
        password: newErrors.password !== "",
      });
    }
  };

  return (
    <form className="grid grid-cols-1 gap-4 w-full" onSubmit={handleSubmit}>
      <div>
        <Input
          type="text"
          width="w-full"
          placeholder="Email"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          error={errorFields.email}
        />
        {errors.email && (
          <p className="text-red-500 font-bai-regular lowercase text-xs">
            {errors.email}
          </p>
        )}
      </div>
      <div>
        <Input
          type="password"
          width="w-full"
          placeholder="Password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          error={errorFields.password}
        />
        {errors.password && (
          <p className="text-red-500 font-bai-regular lowercase text-xs">
            {errors.password}
          </p>
        )}
      </div>
      {errors.global && (
          <p className="text-red-500 font-bai-regular text-center relative left-28  lowercase text-sm">
            {errors.global}
          </p>
        )}
      <div className="col-span-2">
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
          <button className="bg-red-800 hover:bg-red-900 text-white font-bai-regular font-bold py-2 px-4 rounded w-full h-12">
            LOGIN
          </button>
        )}
      </div>
      <div className="col-span-2 text-center mb-1">
        <button
          type="button"
          className="text-red-800 text-sm font-bai-regular"
          onClick={onSwitchToSignup}
        >
          <span className="text-black text-sm font-bai-regular">
            Don't have an account?
          </span>
          <span className="hover:underline">Register</span>
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
