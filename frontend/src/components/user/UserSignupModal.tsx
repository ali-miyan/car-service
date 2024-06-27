import React, { useEffect, useState } from "react";
import CustomModal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import { validateInput } from "../../helpers/userValidation";
import { useGetPostsQuery, useRegisterPostMutation } from "../../store/slices/userApiSlice";

const App: React.FC = () => {

  // const { data:post , isError, isLoading } = useGetPostsQuery({});
  const [registerPost, { isLoading, isError }] = useRegisterPostMutation();



  

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: ""
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    phone: "",
    password: ""
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError){
    console.log(isError);
    
   return <div>Error loading posts</div>;
  }
    

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
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newErrors = {
      username: validateInput("username", formData.username),
      email: validateInput("email", formData.email),
      phone: validateInput("phone", formData.phone),
      password: validateInput("password", formData.password)
    };

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === "") && 
        Object.values(formData).every((field) => field !== "")) {
      console.log(formData);

      const res = await registerPost(formData).unwrap();
      console.log(res);
      

    } else {
      console.log("Form contains errors");
    }


    

  };

  return (
    <CustomModal
      width={500}
      height={470}
      buttonLabel="Signup"
      title="Create your account"
    >
      <div className="flex flex-col items-center mt-10">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full" onSubmit={handleSubmit}>
          <div>
            <Input
              type="text"
              width="w-full"
              placeholder="username"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}
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
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
          </div>
          <div className="col-span-2">
            <Button
              bgColor="#bf0000"
              width="w-full"
              height="47px"
              hoverColor="#9A1A1A"
              onClick={handleSubmit}
            >
              <span className="font-bai-semi-bold">REGISTER</span>
            </Button>
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

export default App;
