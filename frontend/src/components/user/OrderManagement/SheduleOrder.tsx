import React, { useCallback } from "react";
import { RegistrationStep } from "../../common/OrderHeader";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { BookingCalendar } from "./Calender";

const SheduleOrder = () => {
  const { selectedPlace, serviceId, servicePlace } = useSelector((state: any) => state.order);
  console.log(selectedPlace, "service shedule page", serviceId,servicePlace);
  const navigate = useNavigate();

  const handleNext = useCallback(() => {
    if (selectedPlace === "home") {
      navigate(`/service-at-home/${serviceId}`);
    } else {
      navigate(`/service-at-center/${serviceId}`);
    }
  }, [navigate, serviceId]);

  return (
    <>
      <div className="container mx-auto w-7/12 font-bai-regular px-4 py-20">
        <h1 className="text-2xl font-bai-bold font-bold text-center mb-2">
          BOOK YOUR SERVICE
        </h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          PLEASE PROVIDE ALL REQUIRED DETAILS TO BOOK YOUR SERVICE WITH US
        </p>

        <div className="flex flex-col md:flex-row justify-around items-center">
          <Link to={`/set-spot/${serviceId}`}>
            <RegistrationStep number={1} text="SELECT SPOT" />
          </Link>
          <div className="hidden md:block flex-grow border-t-2 border-gray-300 mb-5"></div>
          <RegistrationStep number={2} text="SCHEDULING" active={true} />
          <div className="hidden md:block flex-grow border-t-2 border-gray-300 mb-5"></div>
          <RegistrationStep number={3} text="ADDRESSING" />
          <div className="hidden md:block flex-grow border-t-2 border-gray-300 mb-5"></div>
          <RegistrationStep number={4} text="CONFIRMATION" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center  bg-gray-100 pb-10">
        <BookingCalendar />
        <button
          onClick={handleNext}
          className="bg-black text-white px-5 py-2 mt-4 transition-colors"
        >
          {"NEXT"}
        </button>
      </div>
    </>
  );
};

export default SheduleOrder;
