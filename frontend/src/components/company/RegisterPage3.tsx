import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../context/RegisterContext";
import "../../styles/companyRegister.css";
import { validateInput } from "../../helpers/userValidation";
import { useRegisterPostMutation } from "../../store/slices/companyApiSlice";

const Page3: React.FC = () => {
  const { formData, setFormData, errors, setErrors } = useForm();
  const [registerPost, { isLoading, isError }] = useRegisterPostMutation();

  const navigate = useNavigate();

  const [img, setImg] = useState<{ img1?: string; img2?: string }>({
    img1: undefined,
    img2: undefined,
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

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>,
    imgKey: "img1" | "img2"
  ) => {
    const name = e.target.name;
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      if (file.size > 1024 * 1024) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "File size exceeds limit (1MB).",
        }));
        setFormData((prevData) => ({
          ...prevData,
          [name]: undefined,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: file,
        }));

        setImg((prevImages) => ({
          ...prevImages,
          [imgKey]: URL.createObjectURL(file),
        }));
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
        }));
      }
    }
  };

  const handleSubmit = async () => {
    const newErrors = {
      lisenceNumber: validateInput("lisenceNumber", formData.lisenceNumber),
      lisenceExpiry: validateInput("lisenceExpiry", formData.lisenceExpiry),
      password: validateInput("password", formData.password),
      confirmPassword: validateInput(
        "confirmPassword",
        formData.confirmPassword
      ),
      lisenceImg: formData.lisenceImg ? "" : "Please upload a lisence image.",
      approvedImg: formData.approvedImg
        ? ""
        : "Please upload an approved image.",
    };

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    const valid = Object.values(newErrors).every((error) => !error);

    if (valid) {
      const formDatas = new FormData();

      console.log(formData);
      Object.entries(formData).forEach(([key, value]) => {
        if (key === "lisenceImg") {
          formDatas.append("image", value as File);
        } else if (key === "approvedImg") {
          formDatas.append("image", value as File);
        } else if (key === "logoImg") {
          formDatas.append("image", value as File);
        } else {
          formDatas.append(key, value);
        }
      });
      console.log([...formDatas.entries()]);

      try {
        const res = await registerPost(formDatas).unwrap();
        console.log(res);

        console.log("Form submitted successfully:");
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    } else {
      console.log("Form contains validation errors.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box mt-16 font-bai-bold text-sm uppercase">
        <h2 className="">REGISTER YOUR BUSINESS - Step 3</h2>
        <p>
          PLEASE PROVIDE ALL REQUIRED DETAILS TO REGISTER YOUR BUSINESS WITH US
        </p>
        <div className="w-8/12 mx-auto">
          <div className="progress-bar">
            <div className="progress-step">1</div>
            <div className="progress-line"></div>
            <div className="progress-step">2</div>
            <div className="progress-line"></div>
            <div className="progress-step active">3</div>
          </div>
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label>Lisence Number</label>
            <input
              onChange={handleInputChange}
              value={formData.lisenceNumber}
              type="number"
              className="h-12 font-bai-regular"
              placeholder="Type here"
              name="lisenceNumber"
            />
            {errors.lisenceNumber && (
              <p className="text-red-500 text-xs">{errors.lisenceNumber}</p>
            )}
          </div>
          <div className="form-group">
            <label>Lisence Expiry Date</label>
            <input
              type="date"
              onChange={handleInputChange}
              value={formData.lisenceExpiry}
              name="lisenceExpiry"
              className="h-12  font-bai-regular"
            />
            {errors.lisenceExpiry && (
              <p className="text-red-500 text-xs">{errors.lisenceExpiry}</p>
            )}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              onChange={handleInputChange}
              value={formData.password}
              name="password"
              className="h-12 font-bai-regular"
              placeholder="Type here"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              onChange={handleInputChange}
              value={formData.confirmPassword}
              name="confirmPassword"
              className="h-12 font-bai-regular"
              placeholder="Type here"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
            )}
          </div>
          <div className="form-group logo-upload">
            <label>Upload Lisence Image</label>
            <input
              type="file"
              onChange={(e) => handleImage(e, "img1")}
              name="lisenceImg"
              className="absolute opacity-0 cursor-pointer"
            />
            {!img.img1 ? (
              <span className="text-sm text-gray-600">
                Choose a file (Max 1MB)
              </span>
            ) : (
              <img
                src={img.img1}
                alt="Lisence Image"
                className="h-20 w-auto mt-2"
              />
            )}
            {errors.lisenceImg && (
              <p className="text-red-500 text-xs">{errors.lisenceImg}</p>
            )}
          </div>
          <div className="form-group logo-upload">
            <label>Upload Government Approved Image</label>
            <input
              type="file"
              onChange={(e) => handleImage(e, "img2")}
              name="approvedImg"
              className="absolute opacity-0 cursor-pointer"
            />
            {!img.img2 ? (
              <span className="text-sm text-gray-600">
                Choose a file (Max 1MB)
              </span>
            ) : (
              <img
                src={img.img2}
                alt="Approved Image"
                className="h-20 w-auto mt-2"
              />
            )}
            {errors.approvedImg && (
              <p className="text-red-500 text-xs">{errors.approvedImg}</p>
            )}
          </div>
        </div>

        <div className="form-submit">
          <button className="mr-3" onClick={() => navigate("/register-2")}>
            Back
          </button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Page3;
