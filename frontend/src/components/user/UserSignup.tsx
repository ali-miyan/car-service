import React, { useState } from "react";
import Input from "../common/Input";
import { hasFormErrors, isFormEmpty, validateInput } from "../../helpers/userValidation";
import { useRegisterPostMutation } from "../../store/slices/userApiSlice";
import { CustomError } from "../../schema/error";
import { notifyError } from "../common/Toast";
import { errMessage } from "../../constants/errorMessage";

interface SignupFormProps {
  onOtpRequest: () => void;
  getEmail: (email: string) => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onOtpRequest, getEmail }) => {
  const [registerPost, { isLoading }] = useRegisterPostMutation();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    global: "",
  });

  const [errorFields, setErrorFields] = useState<Record<string, boolean>>({
    username: false,
    email: false,
    phone: false,
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

    getEmail(formData.email);

    const newErrors = {
      username: validateInput("username", formData.username),
      email: validateInput("email", formData.email),
      phone: validateInput("phone", formData.phone),
      password: validateInput("password", formData.password),
      global: "",
    };

    setErrors(newErrors);

    const hasError = hasFormErrors(newErrors);
    const isEmpty = isFormEmpty(formData)

    if (!hasError && !isEmpty) {
      try {
        const res = await registerPost(formData).unwrap();
        if (res.success) {
          onOtpRequest();
        }
        console.log(res, "ssssssssssssss");
      } catch (err) {
        const error = err as CustomError;
        console.log("Error occurred:", error);
        if (error.status === 400) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            global: error.data.error,
          }));
        } else {
          notifyError(errMessage);
        }
      }
    } else {
      console.log("Form contains errors or is incomplete");
      setErrorFields({
        username: newErrors.username !== "",
        email: newErrors.email !== "",
        phone: newErrors.phone !== "",
        password: newErrors.password !== "",
      });
    }
  };

  return (
    <form
      className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
      onSubmit={handleSubmit}
    >
      <div>
        <Input
          type="text"
          width="w-full"
          placeholder="username"
          label="Username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          error={errorFields.username}
        />
        {errors.username && (
          <p className="text-red-500 font-bai-regular lowercase text-xs">
            {errors.username}
          </p>
        )}
      </div>
      <div>
        <Input
          type="text"
          width="w-full"
          placeholder="email"
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
          type="tel"
          width="w-full"
          placeholder="phone"
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          error={errorFields.phone}
        />
        {errors.phone && (
          <p className="text-red-500 font-bai-regular lowercase text-xs">
            {errors.phone}
          </p>
        )}
      </div>
      <div>
        <Input
          type="password"
          width="w-full"
          placeholder="password"
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
        <div className="text-center relative left-28">
          <p className="text-red-500 text-center text-xs">{errors.global}</p>
        </div>
      )}
      <div className="col-span-2 flex items-center justify-center text-center">
        {isLoading ? (
          <button className="bg-red-800  text-white font-bold py-2 px-4 rounded w-full h-12 flex items-center justify-center" disabled>
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
            REGISTER
          </button>
        )}
      </div>
    </form>
  );
};

export default SignupForm;
