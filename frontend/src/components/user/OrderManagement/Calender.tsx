import React, { useState } from "react";
import { Calendar } from "@demark-pro/react-booking-calendar";
import "@demark-pro/react-booking-calendar/dist/react-booking-calendar.css";
import "../../../styles/Global.css";
import { useDispatch, useSelector } from "react-redux";
import { setServiceDate } from "../../../context/OrderContext";
import { useGetSinglServicesQuery } from "../../../store/slices/companyApiSlice";
const today = new Date();
const thisMonth = today.getMonth();
const thisYear = today.getFullYear();

const reserved = [
  {
    startDate: new Date(thisYear, thisMonth, 27),
    endDate: new Date(thisYear, thisMonth, 27),
  },
  {
    startDate: new Date(thisYear, thisMonth, 29),
    endDate: new Date(thisYear, thisMonth, 29),
  },
];

export const BookingCalendar = () => {

  const { serviceId } = useSelector((state: any) => state.order);

  const {data:dates} = useGetSinglServicesQuery(serviceId as string)
  console.log(dates);
  

  const [selectedDates, setSelectedDates] = useState([]);

  const dispatch = useDispatch();

  const handleDateChange = (newDates) => {
    setSelectedDates(newDates);
    const date = new Date(newDates);
    const options:any = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    dispatch(setServiceDate(formattedDate));
  };

  return (
    <>
      <h2 className="text-xl font-bai-bold font-semibold mb-4 text-center text-gray-800 uppercase">
        choose a date
      </h2>
      <div className="w-full max-w-md mx-auto p-4 bg-white shadow-lg lowercase font-bai-regular  border border-gray-300">
        <Calendar
          selected={selectedDates}
          reserved={reserved}
          onChange={handleDateChange}
          className=" text-black rounded-lg  font-bai-regular"
        />
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Select your dates from the calendar. Reserved dates are not
            available for booking.
          </p>
        </div>
      </div>
    </>
  );
};
