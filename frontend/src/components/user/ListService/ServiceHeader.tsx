import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useGetServiceQuery } from "../../../store/slices/adminApiSlice";
import ServiceList from "./ServiceList";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#363232",
        color: "red",
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        textAlign: "center",
        lineHeight: "30px",
        fontSize: "18px",
        cursor: "pointer",
        right: "10px", 
        top: "40%",
        transform: "translateX(180%)",
        position: "absolute",
      }}
      onClick={onClick}
    >
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#363232",
        color: "red",
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        textAlign: "center",
        lineHeight: "30px",
        fontSize: "18px",
        cursor: "pointer",
        left: "10px", 
        top: "40%",
        transform: "translateX(-180%)",
        position: "absolute",
      }}
      onClick={onClick}
    >
    </div>
  );
}

const ServiceHeader = () => {
  const { data: services } = useGetServiceQuery({
    refetchOnMountOrArgChange: false,
  });
  
  const [serviceData, setServiceData] = useState<object[]>([]);
  
  useEffect(() => {
    if (services) {
      const transformedData = services.map((service) => ({
        id: service._id,
        name: service.serviceName,
        image: service.logoUrl,
        description:service.description
      }));
      
      setServiceData(transformedData);
    } else {
      setServiceData([]);
    }
  }, [services]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="p-4 mx-20">
        <Slider {...settings} className="service-slider">
          {services && services.length > 0 ? (
            services.map((service, index) => (
              <div key={index}>
                <Link to={`/services?service=${service._id}`}>
                  <div className="flex flex-col items-center space-y-1 p-2 hover:bg-red-50 bg-white border rounded-lg min-w-[120px] md:min-w-[150px]">
                    <img src={service.logoUrl} alt={service.serviceName} className="w-20 h-20" />
                    <p className="text-center text-xs md:text-xs lg:text-xs">
                      {service.serviceName}
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p>no services available</p>
          )}
        </Slider>
      </div>
      <hr className="mt-5 w-11/12 mx-auto " />
      <div className="flex flex-col md:flex-row justify-evenly p-4 md:p-10">
        <ServiceList serviceData={serviceData} />
      </div>
    </>
  );
};

export default React.memo(ServiceHeader);
