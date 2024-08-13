import React, { useEffect, useState } from "react";
import { useGetEveryServicesQuery } from "../../../store/slices/companyApiSlice";
import ServiceCard from "./ServiceCard";
import { useNavigate } from "react-router-dom";
import Filters from "./Filter";
import Loader from "../../common/Loader";
import { IoIosSearch } from "react-icons/io";

const ServiceList = ({ serviceData }: { serviceData: object[] }) => {
  const {
    data: servicesData,
    isLoading,
    refetch,
  } = useGetEveryServicesQuery({});
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    refetch();
  }, [window.location.search]);

  if (isLoading) {
    return <Loader />;
  }

  const handleServiceClick = (id: string, generalServiceId: string) => {
    navigate(`/selected-service/${id}`, {
      state: {
        generalServiceId,
        serviceData,
      },
    });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = event.target.value;
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("sort", sortValue);
    const newUrl = `/services?${currentParams.toString()}`;
    navigate(newUrl);
  };

  const handleSearchClick = () => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("search", searchValue);
    const newUrl = `/services?${currentParams.toString()}`;
    navigate(newUrl);
  };

  return (
    <>
      <Filters />
      <div className="container mx-auto p-4 font-bai-regular">
        <div className="flex justify-between items-center p-4 ">
          <div className="flex items-center space-x-2">
            <label
              htmlFor="sort"
              className="text-gray-700 lowercase font-semibold"
            >
              Sort By:
            </label>
            <select
              id="sort"
              className="border border-gray-300 p-1.5 focus:outline-none "
              onChange={handleSortChange}
            >
              <option value="low-to-high">low-to-high</option>
              <option value="high-to-low">high-to-low</option>
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search..."
              className="border border-gray-300 p-2 focus:outline-none"
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <button
              className="bg-[#ab0000] text-white p-2 transition-colors"
              onClick={handleSearchClick}
            >
              <IoIosSearch className="text-2xl" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {servicesData && servicesData.length > 0 ? (
            servicesData.map((service) => (
              <div
                key={service._id}
                onClick={() =>
                  handleServiceClick(service._id, service.generalServiceId)
                }
                className="cursor-pointer"
              >
                <ServiceCard
                  id={service.generalServiceId}
                  company={service.companyId}
                  selectedHours={service.selectedHours}
                  servicePlace={service.servicePlace}
                  image={service.images[0]}
                  serviceData={serviceData}
                />
              </div>
            ))
          ) : (
            <p className="text-end my-10">No service available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(ServiceList);
