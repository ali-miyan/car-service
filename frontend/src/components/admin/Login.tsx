import React, { useState, ChangeEvent, FormEvent } from "react";
import { validateInput } from "../../helpers/userValidation"; // Adjust the import path as necessary
import { useRegisterPostMutation } from "../../store/slices/adminApiSlice";
import { useNavigate } from "react-router-dom";
import { notifyError, notifySuccess } from "../common/Toast";
import { CustomError } from "../../schema/error";
import { errMessage } from "../../constants/errorMessage";

const Login: React.FC = () => {
  const [registerPost, { isLoading }] = useRegisterPostMutation();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateInput(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailError = validateInput("email", email);
    const passwordError = validateInput("password", password);

    if (emailError || passwordError) {
      setErrors({
        email: emailError,
        password: passwordError,
      });
      return;
    }

    try {
      const res = await registerPost({ email, password }).unwrap();
      console.log(res);

      if (res) {
        notifySuccess("you have logged in");
        navigate("/admin/home");
      }

      console.log("Form submitted successfully:");
    } catch (err) {
      const error = err as CustomError;
      console.error("Error submitting form:", error);
      if (error.status === 400) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ["password"]: error.data.error,
        }));
      } else if (error.status === "FETCH_ERROR") {
        notifyError(errMessage);
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          ["password"]: error.data.error,
        }));
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-bai-medium">
      <form
        className="bg-white p-5 rounded-lg shadow-md w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-2 text-center font-bai-bold text-black">
          LOGIN
        </h2>
        <div>
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none`}
          />
          {errors.email && (
            <p className="text-red-500 font-bai-regular lowercase text-xs">
              {errors.email}
            </p>
          )}
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } rounded focus:outline-none`}
          />
          {errors.password && (
            <p className="text-red-500 font-bai-regular lowercase text-xs">
              {errors.password}
            </p>
          )}
        </div>
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
      </form>
    </div>
  );
};

export default Login;
