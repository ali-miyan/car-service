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
  const { address, latitude, longitude } = useLocation();

  console.log(latitude,longitude,'latitutdededede');
  

  const [locationData, setLocationData] = useState<AddressData>({
    address: "",
    city: "",
    streetRegion: "",
    postcode: "",
    country: "",
    latitude: "",
    longitude: "",
  });

  const [errors, setErrors] = useState<AddressData>({
    address: "",
    city: "",
    streetRegion: "",
    postcode: "",
    country: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    setLocationData({
      address: address[0] || "",
      city: address[4] || "",
      streetRegion: address[2] || "",
      postcode: address[1] || "",
      country: address[6] || "",
      latitude: latitude || "",
      longitude: longitude || "",
    });
  }, [address, latitude, longitude]);

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
      latitude: validateInput("latitude", locationData.latitude),
      longitude: validateInput("longitude", locationData.longitude),
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
    <div className="flex  md:flex-row lowercase items-center justify-start font-bai-medium">
      <form className="p-2 rounded-lg text-gray-700  w-9/12 max-w-sm ml-20 md:ml-0" onSubmit={handleSubmit}>
        <div className="">
          <label htmlFor="address" className="block text-gray-700 text-xs">
            Address:
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={locationData.address}
            onChange={handleChange}
            className={`w-full px-3 border ${errors.address ? "border-red-500" : "border-gray-300"} rounded focus:outline-none`}
          />
          {errors.address && (
            <p className="text-red-500 font-bai-regular lowercase text-xs">
              {errors.address}
            </p>
          )}
        </div>

        <div className="">
          <label htmlFor="city" className="block text-gray-700 text-xs">
            City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={locationData.city}
            onChange={handleChange}
            className={`w-full px-3  border ${errors.city ? "border-red-500" : "border-gray-300"} rounded focus:outline-none`}
          />
          {errors.city && (
            <p className="text-red-500 font-bai-regular lowercase text-xs">
              {errors.city}
            </p>
          )}
        </div>

        <div className="">
          <label htmlFor="streetRegion" className="block text-gray-700 text-xs">
            Street/Region:
          </label>
          <input
            type="text"
            id="streetRegion"
            name="streetRegion"
            value={locationData.streetRegion}
            onChange={handleChange}
            className={`w-full px-3 border ${errors.streetRegion ? "border-red-500" : "border-gray-300"} rounded focus:outline-none`}
          />
          {errors.streetRegion && (
            <p className="text-red-500 font-bai-regular lowercase text-xs">
              {errors.streetRegion}
            </p>
          )}
        </div>

        <div className="">
          <label htmlFor="postcode" className="block text-gray-700 text-xs">
            Postcode:
          </label>
          <input
            type="text"
            id="postcode"
            name="postcode"
            value={locationData.postcode}
            onChange={handleChange}
            className={`w-full px-3 border ${errors.postcode ? "border-red-500" : "border-gray-300"} rounded focus:outline-none`}
          />
          {errors.postcode && (
            <p className="text-red-500 font-bai-regular lowercase text-xs">
              {errors.postcode}
            </p>
          )}
        </div>

        <div className="">
          <label htmlFor="country" className="block text-gray-700 text-xs">
            Country:
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={locationData.country}
            onChange={handleChange}
            className={`w-full px-3 border ${errors.country ? "border-red-500" : "border-gray-300"} rounded focus:outline-none`}
          />
          {errors.country && (
            <p className="text-red-500 font-bai-regular lowercase text-xs">
              {errors.country}
            </p>
          )}
        </div>

        <div className="">
          <label htmlFor="latitude" className="block text-gray-700 text-xs">
            Latitude:
          </label>
          <input
            type="text"
            id="latitude"
            name="latitude"
            value={locationData.latitude}
            onChange={handleChange}
            className={`w-full px-3 border ${errors.latitude ? "border-red-500" : "border-gray-300"} rounded focus:outline-none`}
          />
          {errors.latitude && (
            <p className="text-red-500 font-bai-regular lowercase text-xs">
              {errors.latitude}
            </p>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="longitude" className="block text-gray-700 text-xs">
            Longitude:
          </label>
          <input
            type="text"
            id="longitude"
            name="longitude"
            value={locationData.longitude}
            onChange={handleChange}
            className={`w-full px-3 border ${errors.longitude ? "border-red-500" : "border-gray-300"} rounded focus:outline-none`}
          />
          {errors.longitude && (
            <p className="text-red-500 font-bai-regular lowercase text-xs">
              {errors.longitude}
            </p>
          )}
        </div>

        <div>
          <button className="bg-red-800 hover:bg-red-900 text-white font-bai-regular font-bold p-2 px-4 rounded w-full ">
            SUBMIT
          </button>
        </div>
      </form>
      <div className="w-ful">
        <MiniMap mapChanged={mapChanged} />
      </div>
    </div>
  );
};

export default LocationModal;
