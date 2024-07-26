import React, { useEffect, useRef, useState, useMemo } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useGetServiceQuery } from "../../../store/slices/adminApiSlice";
import Filters from "./Filter";
import ServiceList from "./ServiceList";
import { Link, useSearchParams } from "react-router-dom";
import Loader from "../../common/Loader";

const ServiceHeader = () => {
  const scrollRef = useRef(null);
  const { data: services, isLoading } = useGetServiceQuery({
    refetchOnMountOrArgChange: false,
  });
  
  const [serviceData, setServiceData] = useState<object[]>([]);
  
  useEffect(() => {
    if (services) {
      const transformedData = services.map((service) => ({
        id: service._id,
        name: service.serviceName,
        image: service.logoUrl,
      }));
      
      setServiceData(transformedData);
    } else {
      setServiceData([]);
    }
  }, [services]);

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollBy({ left: scrollOffset, behavior: "smooth" });
  };

  const scrollBarStyles = useMemo(
    () => ({
      WebkitOverflowScrolling: "touch",
      overflowX: "scroll",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    }),
    []
  );


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
            {services && services.length > 0 ? (
              services.map((service, index) => (
                <Link key={index} to={`/services?service=${service._id}`}>
                  <div className="flex flex-col items-center space-y-1 p-2 hover:bg-red-50 bg-white border rounded-lg min-w-[120px] md:min-w-[150px]">
                    <img src={service.logoUrl} alt="" className="w-20 h-20" />
                    <p className="text-center text-xs md:text-xs lg:text-xs">
                      {service.serviceName}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p>no services available</p>
            )}
          </div>
        </div>
        <button onClick={() => scroll(100)} className="text-xl  ml-2">
          <FaArrowRight />
        </button>
      </div>
      <hr className="mt-5 w-11/12 mx-auto " />
      <div className="flex flex-col md:flex-row justify-evenly p-4 md:p-10">
        <ServiceList serviceData={serviceData} />
      </div>
    </>
  );
};

export default React.memo(ServiceHeader);
