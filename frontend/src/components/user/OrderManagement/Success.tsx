import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useUpdateOrderMutation } from "../../../store/slices/orderApiSlice";

const Success = () => {
  const { id } = useParams();

  const orderToken = localStorage.getItem("orderToken");
  const [updateOrder] = useUpdateOrderMutation();

  useEffect(() => {
    const updateStatus = async () => {
      if (orderToken && id === orderToken) {
        try {
          const res = await updateOrder({ id }).unwrap();
          localStorage.removeItem("orderToken");
          console.log(
            "Order status updated successfully and token removed.",
            res
          );
        } catch (error) {
          console.error("Failed to update order status:", error);
        }
      } else {
        console.log("ID and orderToken do not match.");
      }
    };

    updateStatus();
  }, [id, orderToken, updateOrder]);

  return (
    <div className="bg-gray-100 min-h-screen font-bai-regular flex items-center justify-center">
      <div className="bg-white p-6 w-full max-w-md mx-4 rounded shadow-lg">
        <svg viewBox="0 0 24 24" className="text-green-600 w-16 h-16 mx-auto my-6">
          <path fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
          </path>
        </svg>
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold uppercase">Booking Done!</h3>
          <p className="text-gray-600 my-2 mx-3">Thank you for completing your booking, We will update soon.</p>
          <div className="py-10 text-center">
            <Link to={'/profile?section=garage'} className="px-12 bg-black text-white font-semibold py-3">
              see my booking
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
