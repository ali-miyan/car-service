import React, { useState } from "react";
import Input from "../common/Input";
import { validateInput } from "../../helpers/userValidation";
import { useRegisterPostMutation } from "../../store/slices/userApiSlice";

interface SignupFormProps {
  onOtpRequest: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onOtpRequest }) => {
  const [registerPost, { isLoading, isError }] = useRegisterPostMutation();
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
    const error = validateInput(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
    setErrorFields((prevErrorFields) => ({
      ...prevErrorFields,
      [name]: false,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    

    const newErrors = {
      username: validateInput("username", formData.username),
      email: validateInput("email", formData.email),
      phone: validateInput("phone", formData.phone),
      password: validateInput("password", formData.password),
    };

    setErrors(newErrors);

    const hasError = Object.keys(newErrors).some(
      (key) => newErrors[key] !== ""
    );
    const isEmpty = Object.values(formData).some((field) => field === "");

    if (!hasError && !isEmpty) {
      try {
        const res = await registerPost(formData).unwrap();
        console.log(res);
        if (res.status === 200) {
          onOtpRequest(); 
        }
      } catch (error) {
        console.log("Error occurred:", error);
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
          <p className="text-red-500 text-xs">{errors.username}</p>
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
        {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
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
        {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
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
          <p className="text-red-500 text-xs">{errors.password}</p>
        )}
      </div>
      <div className="col-span-2">
        <button className="bg-red-800 hover:bg-red-900 font-bai-regular text-white font-bold py-2 px-4 rounded w-full h-12">
          REGISTER
        </button>
      </div>
    </form>
  );
};

export default SignupForm;
