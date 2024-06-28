import React, { useState } from "react";
import CustomModal from "../common/Modal";
import Input from "../common/Input";
import { validateInput } from "../../helpers/userValidation";
import { useRegisterPostMutation } from "../../store/slices/userApiSlice";

const LoginModal: React.FC = () => {
  const [registerPost, { isLoading, isError }] = useRegisterPostMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });

  const [errorFields, setErrorFields] = useState<Record<string, boolean>>({
    email: false,
    password: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    const error = validateInput(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));
    setErrorFields((prevErrorFields) => ({
      ...prevErrorFields,
      [name]: false
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newErrors = {
      email: validateInput("email", formData.email),
      password: validateInput("password", formData.password)
    };

    setErrors(newErrors);

    const hasError = Object.keys(newErrors).some((key) => newErrors[key] !== "");
    const isEmpty = Object.values(formData).some((field) => field === "");

    if (!hasError && !isEmpty) {
      try {
        const res = await registerPost(formData).unwrap();
        console.log(res);
        if (res.status === 200) {
          // Show another modal or perform another action
        }
      } catch (error) {
        console.log("Error occurred:", error);
      }
    } else {
      console.log("Form contains errors or is incomplete");
      setErrorFields({
        email: newErrors.email !== "",
        password: newErrors.password !== ""
      });
    }
  };

  return (
    <CustomModal
      width={500}
      height={470}
      buttonLabel="lOGIN"
      title="LOG IN TO your account"
    >
      <div className="flex flex-col items-center mt-10">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full" onSubmit={handleSubmit}>
          <div>
            <Input
              type="text"
              width="w-full"
              placeholder="email"
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              error={errorFields.email} // Pass error state to highlight input
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
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
              error={errorFields.password} // Pass error state to highlight input
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>
          <div className="col-span-2">
            <button
              className="bg-red-800 hover:bg-red-900 font-bai-regular text-white font-bold py-2 px-4 rounded w-full h-12"
            >
              LOGIN
            </button>
          </div>
        </form>
        <div className="flex justify-center items-center mt-2">
          <span className="mr-2 font-bai-extra-light">OR</span>
        </div>
        <div className="flex justify-center w-full mt-2">
          <button className="flex items-center justify-center border w-full px-5 py-3 rounded-lg shadow-md bg-white text-gray-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200">
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

export default LoginModal;
