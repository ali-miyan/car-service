import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../context/RegisterContext";
import "../../styles/companyRegister.css";
import { validateInput } from "../../helpers/userValidation";

const Page2: React.FC = () => {
  const { formData, setFormData, errors, setErrors } = useForm();
  const navigate = useNavigate();

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
  };

  const handleNext = () => {
    const newErrors = {
      contact1: validateInput("contact1", formData.contact1),
      contact2: validateInput("contact2", formData.contact2),
      email: validateInput("email", formData.email),
    };

    setErrors(newErrors);

    const valid = Object.values(newErrors).every((error) => !error);

    if (valid) {
        navigate("/company/register-3");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box font-bai-bold text-sm uppercase">
        <h2 className="">REGISTER YOUR BUSINESS</h2>
        <p>
          PLEASE PROVIDE ALL REQUIRED DETAILS TO REGISTER YOUR BUSINESS WITH US
        </p>
        <div className="w-8/12 mx-auto">
          <div className="progress-bar">
            <div className="progress-step">1</div>
            <div className="progress-line"></div>
            <div className="progress-step active">2</div>
            <div className="progress-line"></div>
            <div className="progress-step">3</div>
          </div>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label>Contact Number 1</label>
            <input
              onChange={handleInputChange}
              value={formData.contact1}
              type="number"
              className="h-12 font-bai-regular"
              placeholder="Type here"
              name="contact1"
            />
            {errors.contact1 && (
              <p className="text-red-500 text-xs">{errors.contact1}</p>
            )}
          </div>
          <div className="form-group">
            <label>Contact Number 2</label>
            <input
              type="number"
              onChange={handleInputChange}
              value={formData.contact2}
              name="contact2"
              className="h-12  font-bai-regular"
              placeholder="Type here"
            />
            {errors.contact2 && (
              <p className="text-red-500 text-xs">{errors.contact2}</p>
            )}
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              onChange={handleInputChange}
              value={formData.email}
              name="email"
              className="h-12 font-bai-regular"
              placeholder="Type here"
            />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email}</p>
            )}
          </div>
        </div>

        <div className="form-submit">
          <button className="mr-4" onClick={() => navigate("/company/register-1")}>BACK</button>
          <button onClick={handleNext}>NEXT</button>
        </div>
      </div>
    </div>
  );
};

export default Page2;
