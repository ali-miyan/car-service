import React from "react";
import { useGetApprovedCompanyQuery } from "../../../store/slices/companyApiSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Filters() {
  const { data: filterData } = useGetApprovedCompanyQuery({});

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialSection = queryParams.get("company");
  const navigate = useNavigate();

  const handleNavigate = (id:string) => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set('company', id);
    const newUrl = `/services?${currentParams.toString()}`;
    navigate(newUrl);
  };
  
  const renderCompanyImagesAndIds = () => {
    if (!filterData) return null;

    return filterData.map(
      (company: { _id: any; companyName: any; logo: any }) => {
        const { _id, companyName, logo } = company;
        return (
          <div
            key={_id}
            className={`${
              _id === initialSection && "bg-red-50 "
            } flex items-center p-1 hover:bg-red-50 cursor-pointer mt-3 space-x-2 mb-2`}
            onClick={() => handleNavigate(_id)}
          >
            <img
              src={logo}
              alt={companyName}
              className="w-10 h-10 rounded-full"
            />
            <span className="text-sm">{companyName}</span>
          </div>
        );
      }
    );
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg font-bai-regular lowercase shadow-md md:w-1/5 md:flex-shrink-0 md:mr-4">
        <h2 className="text-lg font-bold mb-4 text-center underline underline-offset-2">
          FILTERS
        </h2>

        <div className="mb-4">
          <p className="uppercase underline underline-offset-2 font-bai-medium">
            companies
          </p>
          {renderCompanyImagesAndIds()}
        </div>

        <div className="mb-4">
          <label
            htmlFor="brand"
            className="block text-sm font-medium text-gray-700"
          >
            Select a brand
          </label>
          <div className="mt-1">
            <button className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus-ring-blue-500">
              Tap for dropdown
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Sort by price
          </label>
          <div className="mt-1 flex items-center">
            <input
              type="number"
              id="price-min"
              name="price-min"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus-ring-blue-500"
              placeholder="₹999"
            />
            <span className="mx-2">-</span>
            <input
              type="number"
              id="price-max"
              name="price-max"
              className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus-ring-blue-500"
              placeholder="₹10000"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Sort by location
          </label>
          <div className="mt-1">
            <button className="w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus-ring-blue-500">
              Select your location
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Filters;
