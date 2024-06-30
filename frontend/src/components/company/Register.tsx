import React, { useState } from "react";
import "../../styles/companyRegister.css";
import { validateInput } from "../../helpers/userValidation";

const Register: React.FC = () => {
  const [img, setImg] = useState<string | undefined>(undefined);
  // const [file, setFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    ownerName: "",
    companyName: "",
    year: "",
    description: "",
  });

  const [errors, setErrors] = useState({
    ownerName: "",
    companyName: "",
    year: "",
    description: "",
    img: "",
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
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImg(URL.createObjectURL(e.target.files[0]));
      // setFile(e.target.files?.[0]);
    }
  };

  const handleSubmit = () => {
    let valid = true;
    const newErrors = {
      ownerName: validateInput("ownerName", formData.ownerName),
      companyName: validateInput("companyName", formData.companyName),
      year: validateInput("year", formData.year),
      description: validateInput("description", formData.description),
      img: img ? "" : "Please upload a company logo.",
    };

    // Check if there are any validation errors
    Object.values(newErrors).forEach((error) => {
      if (error) {
        valid = false;
      }
    });

    setErrors(newErrors);

    if (valid) {
      console.log("Form data:", formData);
    } else {
      console.log("Form contains validation errors.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box mt-16 font-bai-bold text-sm uppercase">
        <h2 className="">REGISTER YOUR BUSINESS</h2>
        <p>
          PLEASE PROVIDE ALL REQUIRED DETAILS TO REGISTER YOUR BUSINESS WITH US
        </p>
        <div className="w-8/12 mx-auto">
          <div className="progress-bar">
            <div className="progress-step active">1</div>
            <div className="progress-line"></div>
            <div className="progress-step">2</div>
            <div className="progress-line"></div>
            <div className="progress-step">3</div>
          </div>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label>Company Owner Name</label>
            <input
              onChange={handleInputChange}
              value={formData.ownerName}
              type="text"
              className="h-12 font-bai-regular"
              placeholder="Type here"
              name="ownerName"
            />
            {errors.ownerName && (
              <p className="text-red-500 text-xs">{errors.ownerName}</p>
            )}
          </div>
          <div className="form-group">
            <label>Company Name</label>
            <input
              type="text"
              onChange={handleInputChange}
              value={formData.companyName}
              name="companyName"
              className="h-12  font-bai-regular"
              placeholder="Type here"
            />
            {errors.companyName && (
              <p className="text-red-500 text-xs">{errors.companyName}</p>
            )}
          </div>
          <div className="form-group">
            <label>Year Established</label>
            <input
              type="number"
              onChange={handleInputChange}
              value={formData.year}
              name="year"
              className="h-12 font-bai-regular"
              placeholder="Type here"
            />
            {errors.year && (
              <p className="text-red-500 text-xs">{errors.year}</p>
            )}
          </div>
          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              onChange={handleInputChange}
              value={formData.description}
              name="description"
              className="h-12 font-bai-regular"
              placeholder="Type here"
            />
            {errors.description && (
              <p className="text-red-500 text-xs">{errors.description}</p>
            )}
          </div>

          <div className="form-group logo-upload">
            <input
              type="file"
              onChange={handleImage}
              className="absolute opacity-0 inse t-0 cursor-pointer"
            />
            {!img ? (
              <>
                <span>ADD YOUR COMPANY LOGO</span>
              </>
            ) : (
              <img src={img ? img : ""} alt="Modal Image" />
            )}
            {errors.img && <p className="text-red-500 text-xs">{errors.img}</p>}
          </div>
        </div>

        <div className="form-submit">
          <button onClick={handleSubmit}>NEXT</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
