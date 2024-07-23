import React, { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useGetServiceQuery } from "../../../store/slices/adminApiSlice";
import Filters from "./Filter";
import ServiceList from "./ServiceList";

const ServiceHeader = () => {
  const scrollRef = useRef(null);

  const { data: services } = useGetServiceQuery({});

  console.log(services, "servicew");

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
  };

  const scrollBarStyles = {
    WebkitOverflowScrolling: "touch",
    overflowX: "scroll",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  };

  return (
    <>
      <div className="flex items-center font-bai-regular lowercase justify-center p-2 mx-4 sm:mx-44">
        <button onClick={() => scroll(-100)} className="text-xl  mr-2">
          <FaArrowLeft />
        </button>
        <div
          ref={scrollRef}
          style={scrollBarStyles}
          className="flex items-center justify-center w-full max-w-full overflow-x-auto"
        >
          <div className="flex space-x-1">
            {services &&
              services.map((service, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-1 p-2 hover:bg-red-50 bg-white border rounded-lg min-w-[120px] md:min-w-[150px]"
                >
                  <img src={service.logoUrl} alt="" className="w-20 h-20" />
                  <p className="text-center text-xs md:text-xs lg:text-xs">
                    {service.serviceName}
                  </p>
                </div>
              ))}
            {services && services.length === 0 && <p>no services abailable</p>}
          </div>
        </div>
        <button onClick={() => scroll(100)} className="text-xl  ml-2">
          <FaArrowRight />
        </button>
      </div>
      <div className="flex flex-col md:flex-row justify-evenly p-4 md:p-10">
        <Filters />
        <ServiceList />
      </div>
    </>
  );
};

export default ServiceHeader;
