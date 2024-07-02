import React, { useState } from "react";
import Input from "../common/Input";
import { validateInput } from "../../helpers/userValidation";
import { useLoginUserMutation } from "../../store/slices/userApiSlice";
import { CustomError } from "../../schema/error";

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup }) => {

  const [loginUser, { isLoading, isError }] = useLoginUserMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
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
    };

    setErrors(newErrors);

    const hasError = Object.keys(newErrors).some(
      (key) => newErrors[key] !== ""
    );
    const isEmpty = Object.values(formData).some((field) => field === "");

    if (!hasError && !isEmpty) {
      try {
        try {
          const res = await loginUser(formData).unwrap();
          if (res.success) {
            // onOtpRequest();

            console.log(res,'ssssssssssssss');
          }
          
        } catch (err) {
          const error = err as CustomError;
          console.log("Error occurred:", error);
          if (error.status === 400) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              global: error.data.error,
            }));
          }
        }
      } catch (error) {
        console.log("Error occurred:", error);
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
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
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
          <p className="text-red-500 text-xs">{errors.password}</p>
        )}
      </div>
      <div className="col-span-2 mt-1">
        <button className="bg-red-800 hover:bg-red-900 font-bai-regular text-white font-bold py-2 px-4 rounded w-full h-12">
          LOGIN
        </button>
      </div>
      <div className="col-span-2 text-center mb-1">
        <button
          type="button"
          className="text-red-800 text-sm font-bai-regular"
          onClick={onSwitchToSignup}
        >
          <span className="text-black text-sm font-bai-regular">Don't have an account?</span><span className="hover:underline">Register</span>
        </button>
      </div>  
    </form>
  );
};

export default LoginForm;
