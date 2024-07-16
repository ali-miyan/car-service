import React, { useEffect, useState } from "react";
import { validateInput } from "../../helpers/userValidation";
import { serviceForm } from "../../schema/component";
import { useAddServicePostMutation } from "../../store/slices/adminApiSlice";
import { notifyError, notifySuccess } from "../common/Toast";
import { Link, useNavigate } from "react-router-dom";
import LoadingButton from "../common/Loading";
import { CustomError } from "../../schema/error";
import { errMessage } from "../../constants/errorMessage";
import { useGetServiceQuery } from "../../store/slices/adminApiSlice";
import { FaDotCircle, FaPlus } from "react-icons/fa";
import AddPackageModal from "./AddPackageModal";
import CustomModal from "../common/Modal";
import { Post } from "../../schema/company";
import PackageContent from "./PackageContent";

const AddYourService: React.FC = () => {
  const {
    data: posts,
    refetch,
    error,
  } = useGetServiceQuery({ refetchOnMountOrArgChange: false });

  const [addServicePost, { isLoading }] = useAddServicePostMutation();
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [selectedService, setSelectedService] = useState(
    posts && posts.length > 0 ? posts[0]?._id : ""
  );
  const [selectedSubService, setSelectedSubService] = useState<string[]>([]);
  const [subservices, setSubservices] = useState(
    posts && posts.length > 0 ? posts[0]?.subServices : []
  );

  const handleSubServicesSubmit = (selectedSubServices: string[]) => {
    console.log(selectedSubServices, "parent to child");

    setSelectedSubService(selectedSubServices);
  };

  useEffect(() => {
    if (posts && posts.length > 0) {
      setSubservices(posts[0]?.subServices);
    }
  }, [posts]);

  const [formData, setFormData] = useState<serviceForm>({
    serviceName: "",
    experience: "",
    workingHours: "",
    terms: "",
    logo: null,
    subServices: [],
  });

  const [errors, setErrors] = useState({
    serviceName: "",
    experience: "",
    workingHours: "",
    terms: "",
    logo: "",
    subServices: "",
    global: "",
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
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        logo: file,
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        logo: "",
      }));
    }
  };

  const handleServiceChange = (event: any) => {
    const selectedServiceId = event.target.value;

    const selectedService = posts.find(
      (post: Post) => post._id === selectedServiceId
    );

    if (selectedService) {
      setSubservices(selectedService.subServices);
    } else {
      setSubservices([]);
    }
    setSelectedService(selectedServiceId);
  };

  const openModal = (title: string) => {
    setShowModal(true);
    setModalTitle(title);
  };

  const handleSubmit = async () => {
    const serviceNameError = validateInput("serviceName", formData.serviceName);
    const experienceError = validateInput("experience", formData.experience);
    const workingHoursError = validateInput(
      "workingHours",
      formData.workingHours
    );
    const termsError = validateInput("terms", formData.terms);
    const logoError = formData.logo ? "" : "Please provide a logo";
    const subServicesError =
      formData.subServices.length < 2
        ? "Please add at least two sub-service"
        : "";

    setErrors({
      serviceName: serviceNameError,
      experience: experienceError,
      workingHours: workingHoursError,
      terms: termsError,
      logo: logoError,
      subServices: subServicesError,
      global: "",
    });

    if (
      serviceNameError ||
      experienceError ||
      workingHoursError ||
      termsError ||
      logoError ||
      subServicesError
    ) {
      return;
    }

    const data = new FormData();
    data.append("serviceName", formData.serviceName);
    data.append("experience", formData.experience);
    data.append("workingHours", formData.workingHours);
    data.append("terms", formData.terms);
    data.append("image", formData.logo as File);
    formData.subServices.forEach((subService) => {
      data.append("services", subService);
    });

    try {
      const res = await addServicePost(data).unwrap();
      if (res.success) {
        notifySuccess("Successfully added");
        navigate("/admin/notification", { state: { refetch: true } });
      }
      console.log(res, "response");
    } catch (err) {
      console.log(err);
      const error = err as CustomError;
      if (error.status === 400 || error.status === 401) {
        setErrors((prev) => ({
          ...prev,
          global: error.data?.message,
        }));
      } else {
        notifyError(errMessage);
      }
    }
  };

  return (
    <div
      style={{ height: "100%", width: "100%" }}
      className="px-12 justify-center bg-gray-100  flex min-h-screen pt-14"
    >
      {showModal && (
        <CustomModal
          open={showModal}
          title={modalTitle}
          width={500}
          height={500}
          onClose={() => setShowModal(false)}
          children={
            <>
              <PackageContent
                subservices={subservices}
                onClose={() => setShowModal(false)}
                handleSubServicesSubmit={handleSubServicesSubmit}
              />
            </>
          }
        />
      )}
      <div className="font-bai-regular  text-sm lowercase ">
        <h2 className="font-bai-bold uppercase text-center mb-5">
          ADD YOUR SERVICE
        </h2>
        <div className="text-start w-full flex flex-col sm:flex-row">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="form-group">
              <label htmlFor="service-name">Service Name</label>
              <select
                name="service-name"
                className="border p-2 rounded w-full"
                id="service-name"
                value={selectedService}
                onChange={handleServiceChange}
              >
                {posts &&
                  posts.map((post, index) => (
                    <option key={index} value={post._id}>
                      {post.serviceName}
                    </option>
                  ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="experience">Experience</label>
              <input
                onChange={handleInputChange}
                value={formData.experience}
                type="text"
                className="border p-2 rounded w-full"
                placeholder="Type here"
                name="experience"
              />
              {errors.experience && (
                <p className="text-red-500 font-bai-regular lowercase text-xs">
                  {errors.experience}
                </p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="working-hours">Working Hours</label>
              <select
                name="working-hours"
                className="border p-2 rounded w-full"
                id="working-hours"
              >
                <option value="">Select working hours</option>
                <option value="sun-mon">Monday to Sunday</option>
                <option value="mon-sat">Monday to Saturday</option>
                <option value="24/7">24/7</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="terms">Terms</label>
              <input
                onChange={handleInputChange}
                value={formData.terms}
                type="text"
                className="border p-2 rounded w-full"
                placeholder="Type here"
                name="terms"
              />
              {errors.terms && (
                <p className="text-red-500 font-bai-regular lowercase text-xs">
                  {errors.terms}
                </p>
              )}
            </div>
          </div>
          <div className="w-full sm:w-5/12 sm:pl-5 mt-4 sm:mt-0">
            <div className="form-group h-36 logo-upload mt-7 relative">
              <input
                type="file"
                multiple
                name="logo"
                onChange={handleImage}
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
              {formData.logo ? (
                <img
                  src={URL.createObjectURL(formData.logo)}
                  alt="Company Logo"
                  className="w-24 h-24 object-cover m-2 rounded"
                />
              ) : (
                <span className="w-24 h-24  flex items-center justify-center rounded cursor-pointer">
                  ADD YOUR WORK PHOTOS
                </span>
              )}
              {errors.logo && (
                <p className="text-red-500 font-bai-regular lowercase text-xs">
                  {errors.logo}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="form-group mt-5">
          <h3 className="font-bai-bold uppercase text-center mb-2">
            ADD PACKAGES
          </h3>
          <section>
            <div className="py-2 px-4 mx-auto max-w-screen-xl lg:py-5 lg:px-6">
              <div className="space-y-8 lg:grid lg:grid-cols-3 sm:gap-6 xl:gap-10 lg:space-y-0">
                <div className="flex flex-col p-6 mx-auto max-w-lg text-center items-center text-gray-900 bg-white rounded-lg border border-gray-100 shadow xl:p-8">
                  <h3 className="font-bai-semi-bold uppercase underline-offset-2 underline">
                    BASIC PLAN
                  </h3>
                  <p className="font-light text-gray-500">
                    add your basic plan here.
                  </p>
                  <div className="flex justify-center items-baseline my-4">
                    <span className=" text-3xl font-extrabold">$29</span>
                    <span className="text-gray-500">/service</span>
                  </div>
                  <ul role="list" className="mb-8 space-y-4 text-left">
                    {selectedSubService.length === 0 && (
                      <p>None has been selected</p>
                    )}
                    {posts.map((val, index) => (
                      <React.Fragment key={index}>
                        {val.subServices
                          .filter((sub) => selectedSubService.includes(sub._id))
                          .map((sub) => (
                            <li
                              className="flex items-center space-x-3 text-xs"
                              key={sub._id}
                            >
                              <FaDotCircle className="flex-shrink-0 w-2 h-2 text-gray-300" />
                              <span>{sub.name}</span>
                            </li>
                          ))}
                      </React.Fragment>
                    ))}
                  </ul>

                  <FaPlus
                    className="text-2xl cursor-pointer "
                    onClick={() => {
                      openModal("basic");
                    }}
                  />
                </div>

                <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 items-center bg-white rounded-lg border border-gray-100 shadow xl:p-8">
                  <h3 className="font-bai-semi-bold uppercase underline-offset-2 underline">
                    STANDARD
                  </h3>
                  <p className="font-light text-gray-500">
                    add you standard plan here.
                  </p>
                  <div className="flex justify-center items-baseline my-4">
                    <span className=" text-3xl font-extrabold">$99</span>
                    <span className="text-gray-500">/service</span>
                  </div>
                  <ul role="list" className="mb-8 space-y-4 text-left">
                    <li className="flex items-center space-x-3">
                      <FaDotCircle className="flex-shrink-0 w-5 h-5 text-gray-300" />
                      <span>Individual configuration</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <FaDotCircle className="flex-shrink-0 w-5 h-5 text-gray-300" />
                      <span>No setup, or hidden fees</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <FaDotCircle className="flex-shrink-0 w-5 h-5 text-gray-300" />
                      <span>
                        Team size:{" "}
                        <span className="font-bai-semi-bold">
                          10 developers
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <FaDotCircle className="flex-shrink-0 w-5 h-5 text-gray-300" />
                      <span>
                        Premium support:{" "}
                        <span className="font-bai-semi-bold">24 months</span>
                      </span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <FaDotCircle className="flex-shrink-0 w-5 h-5 text-gray-300" />
                      <span>
                        Free updates:{" "}
                        <span className="font-bai-semi-bold">24 months</span>
                      </span>
                    </li>
                  </ul>
                  <FaPlus
                    className="text-2xl cursor-pointer "
                    onClick={() => {
                      openModal("standard");
                    }}
                  />
                </div>

                <div className="flex flex-col p-6 mx-auto max-w-lg text-center text-gray-900 items-center bg-white rounded-lg border border-gray-100 shadow xl:p-8">
                  <h3 className="font-bai-semi-bold uppercase underline-offset-2 underline">
                    premium
                  </h3>
                  <p className="font-light text-gray-500">
                    add your premium plan here.
                  </p>
                  <div className="flex justify-center items-baseline my-4">
                    <span className=" text-3xl font-extrabold">$499</span>
                    <span className="text-gray-500">/service</span>
                  </div>
                  <ul role="list" className="mb-8 space-y-4 text-left">
                    <li className="flex items-center space-x-3">
                      <FaDotCircle className="flex-shrink-0 w-5 h-5 text-gray-300" />
                      <span>Individual configuration</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <FaDotCircle className="flex-shrink-0 w-5 h-5 text-gray-300" />
                      <span>No setup, or hidden fees</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <FaDotCircle className="flex-shrink-0 w-5 h-5 text-gray-300" />
                      <span>
                        Team size:{" "}
                        <span className="font-bai-semi-bold">
                          100+ developers
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <FaDotCircle className="flex-shrink-0 w-5 h-5 text-gray-300" />
                      <span>
                        Premium support:{" "}
                        <span className="font-bai-semi-bold">36 months</span>
                      </span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <FaDotCircle className="flex-shrink-0 w-5 h-5 text-gray-300" />
                      <span>
                        Free updates:{" "}
                        <span className="font-bai-semi-bold">36 months</span>
                      </span>
                    </li>
                  </ul>
                  <FaPlus
                    className="text-2xl cursor-pointer "
                    onClick={() => {
                      openModal("premium");
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {errors.global && (
          <p className="text-red-500 text-center mt-5 font-bai-regular lowercase text-xs">
            {errors.global}
          </p>
        )}
        <div className="text-center mt-5 flex justify-center space-x-3">
          <Link to={"/company/services"}>
            <button className="bg-black h-10 px-4 w-12/12 text-white rounded">
              Back
            </button>
          </Link>
          <LoadingButton
            buttonText="Submit"
            isLoading={isLoading}
            onClick={handleSubmit}
            width="w-full sm:w-1/12"
            height="h-10"
          />
        </div>
      </div>
    </div>
  );
};

export default AddYourService;
