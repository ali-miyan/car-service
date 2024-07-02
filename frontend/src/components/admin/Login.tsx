import React, { useState, ChangeEvent, FormEvent } from "react";
import { validateInput } from "../../helpers/userValidation"; // Adjust the import path as necessary
import { useRegisterPostMutation } from "../../store/slices/adminApiSlice";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [registerPost, { isLoading, isError }] = useRegisterPostMutation();
  const navigate = useNavigate()

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

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
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
      const res = await registerPost({email,password}).unwrap();
      console.log(res);

      if(res){
        navigate('/admin/home')
      }

      console.log("Form submitted successfully:");
    } catch (error) {
      console.error("Error submitting form:", error);
      if(error.status === 400){
        setErrors((prevErrors) => ({
          ...prevErrors,
          ['password']: error.data.error,
        }));
      }else{
        setErrors((prevErrors) => ({
          ...prevErrors,
          ['password']: error.data.error,
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
        <h2 className="text-2xl font-bold mb-4 text-center font-bai-bold text-black">
          Login
        </h2>
        <div className="mb-2">
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
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
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
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-red-700 text-white py-2 rounded hover:bg-red-800 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
