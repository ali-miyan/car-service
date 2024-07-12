import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { validateInput } from "../../helpers/userValidation";
import { AddressData } from "../../schema/address";
import 'mapbox-gl/dist/mapbox-gl.css';
import MiniMap from "./MapBox";
import { useLocation } from "../../context/MapContext";
import { useForm } from "../../context/RegisterContext";

const LocationModal: React.FC<{onClose: ()=> void,setIsAddressFilled:()=>void}> = ({setIsAddressFilled,onClose}) => {
  const { formData, setFormData } = useForm();
  const [message, setMessage] = useState<boolean>(false);
  const { address } = useLocation();

  const [locationData, setLocationData] = useState<AddressData>({
    address: "",
    city: "",
    streetRegion: "",
    postcode: "",
    country: "",
  });

  const [errors, setErrors] = useState<AddressData>({
    address: "",
    city: "",
    streetRegion: "",
    postcode: "",
    country: "",
  });

  useEffect(() => {
    setLocationData({
      address: address[0] || "",
      city: address[4] || "",
      streetRegion: address[2] || "",
      postcode: address[1] || "",
      country: address[6] || "",
    });
  }, [address]);

  useEffect(() => {
    console.log(address, 'address data');
  }, [message, setFormData]);

  const mapChanged = (data: boolean) => {
    setMessage(data);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateInput(name, value);

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setLocationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: AddressData = {
      address: validateInput("address", locationData.address),
      city: validateInput("city", locationData.city),
      streetRegion: validateInput("streetRegion", locationData.streetRegion),
      postcode: validateInput("postcode", locationData.postcode),
      country: validateInput("country", locationData.country),
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    setFormData((prevData) => ({
      ...prevData,
      address: locationData,
    }));

    setIsAddressFilled();
    onClose();
  };

  return (
    <div className="flex  md:flex-row  items-center justify-start font-bai-medium">
      <form className="p-5 rounded-lg  w-9/12 max-w-sm ml-20 md:ml-0" onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="address" className="block text-gray-700 text-sm">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={locationData.address}
            onChange={handleChange}
            className={`w-full px-3 py-1 border ${errors.address ? "border-red-500" : "border-gray-300"} rounded focus:outline-none`}
          />
          {errors.address && (
            <p className="text-red-500 font-bai-regular lowercase text-xs">
              {errors.address}
            </p>
          )}
        </div>

        <div className="">
          <label htmlFor="city" className="block text-gray-700 text-sm">
            City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={locationData.city}
            onChange={handleChange}
            className={`w-full px-3 py-1 border ${errors.city ? "border-red-500" : "border-gray-300"} rounded focus:outline-none`}
          />
          {errors.city && (
            <p className="text-red-500 font-bai-regular lowercase text-xs">
              {errors.city}
            </p>
          )}
        </div>

        <div className="">
          <label htmlFor="streetRegion" className="block text-gray-700 text-sm">
            Street/Region:
          </label>
          <input
            type="text"
            id="streetRegion"
            name="streetRegion"
            value={locationData.streetRegion}
            onChange={handleChange}
            className={`w-full px-3 py-1 border ${errors.streetRegion ? "border-red-500" : "border-gray-300"} rounded focus:outline-none`}
          />
          {errors.streetRegion && (
            <p className="text-red-500 font-bai-regular lowercase text-xs">
              {errors.streetRegion}
            </p>
          )}
        </div>

        <div className="">
          <label htmlFor="postcode" className="block text-gray-700 text-sm">
            Postcode:
          </label>
          <input
            type="text"
            id="postcode"
            name="postcode"
            value={locationData.postcode}
            onChange={handleChange}
            className={`w-full px-3 py-1 border ${errors.postcode ? "border-red-500" : "border-gray-300"} rounded focus:outline-none`}
          />
          {errors.postcode && (
            <p className="text-red-500 font-bai-regular lowercase text-xs">
              {errors.postcode}
            </p>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="country" className="block text-gray-700 text-sm">
            Country:
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={locationData.country}
            onChange={handleChange}
            className={`w-full px-3 py-1 border ${errors.country ? "border-red-500" : "border-gray-300"} rounded focus:outline-none`}
          />
          {errors.country && (
            <p className="text-red-500 font-bai-regular lowercase text-xs">
              {errors.country}
            </p>
          )}
        </div>

        <div>
          <button className="bg-red-800 hover:bg-red-900 text-white font-bai-regular font-bold p-2 px-4 rounded w-full ">
            SUBMIT
          </button>
        </div>
      </form>
      <div className="w-full mt-5 md:mt-0">
        <MiniMap mapChanged={mapChanged} />
      </div>
    </div>
  );
};

export default LocationModal;
