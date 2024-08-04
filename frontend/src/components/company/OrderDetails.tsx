import React from "react";
import { FaUser, FaTruck, FaMapMarkerAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useGetSingleOrderQuery } from "../../store/slices/orderApiSlice";

const OrderDetail = () => {
  const { id } = useParams();
  const { data: order } = useGetSingleOrderQuery(id as string);
  console.log(order, "order gotted");
  return (
    <div className="mx-32 my-20 lowercase">
      <h1 className="text-2xl font-bold mb-2 uppercase font-bai-bold">
        Order detail
      </h1>
      <p className="text-gray-600 mb-6 uppercase    ">
        Order ID: {order?.data.id}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white border-2 p-8 mb-8">
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-50 p-4 rounded-full mb-4">
            <FaUser className="text-red-900 text-3xl" />
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-2">Customer</h2>
            <p className="mb-1">Name: {order?.username}</p>
            <p className="mb-1">Email: {order?.email}</p>
            <p className="mb-1">Phone: {order?.phone}</p>
          </div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="bg-red-50 p-4 rounded-full mb-4">
            <FaTruck className="text-red-900 text-3xl" />
          </div>
          <div>
            <h2 className="font-semibold text-lg mb-2">Order Info</h2>
            <p className="mb-1">Total Amount: ₹{order?.data.totalPrice}</p>
            <p className="mb-1">Payment: {order?.data.payment}</p>
            <p className="mb-1">Scheduled on: {order?.data.date}</p>
            <p className="mb-1">Service at: {order?.data.servicePlace}</p>
          </div>
        </div>
        {order?.data.servicePlace === "home" && (
          <div className="flex flex-col items-center text-center">
            <div className="bg-red-50 p-4 rounded-full mb-4">
              <FaMapMarkerAlt className="text-red-900 text-3xl" />
            </div>
            <div>
              <div>
                <h2 className="font-semibold text-lg mb-2">User's Home</h2>
                <p className="mb-1">City: {order.data.address.city}</p>
                <p className="mb-1">Address: {order.data.address.address}</p>
                <p className="mb-1">
                  Street: {order.data.address.streetRegion}
                </p>
                <p className="mb-1">Pincode: {order.data.address.postcode}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-4">SERVICE BOOKED</h2>
      <div className="overflow-x-auto">
        <h3 className="font-semibold text-center text-gray-900 uppercase">
          service package
        </h3>
        <div className="flex">
          <div className="border border-slate-200 bg-white rounded-lg shadow-sm divide-y divide-slate-200">
            <div className="p-6">
              <h2 className="text-xl leading-6 font-bold text-slate-900 uppercase">
                {}
              </h2>
              <p className="mt-8">
                <span className="text-4xl font-bold text-slate-900 tracking-tighter">
                  ₹{order?.standardPackage?.detail?.price || "0"}
                </span>

                <span className="text-base font-medium text-slate-500">
                  /service
                </span>
                <br />
                <span className="text-gray-500">
                  - takes {order?.standardPackage?.detail?.workingHours} hours
                </span>
              </p>
            </div>
            <div className="pt-6 pb-8 px-6">
              <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
                What's included
              </h3>
              <ul role="list" className="mt-4 space-y-3">
                {order?.standardPackage &&
                  order?.standardPackage.subServices?.map(
                    (val: any, index: number) => (
                      <React.Fragment key={index}>
                        <li className="flex space-x-3" key={val._id}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="flex-shrink-0 h-5 w-5 text-green-400"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <path d="M5 12l5 5l10 -10"></path>
                          </svg>
                          <span className="text-sm text-slate-700">
                            {val.name}
                          </span>
                        </li>
                      </React.Fragment>
                    )
                  )}
              </ul>
            </div>
          </div>
          <div className="flex justify-evenly">
                {order && (
                  <div
                    key={order._id}
                    className="p-4 shadow-md mx-3 mb-4 bg-white w-full "
                    role="button"
                    tabIndex={0}
                  >
                    <div className="flex justify-center mb-2">
                      <img
                        src={order.src}
                        alt={order.name}
                        className="object-cover w-auto"
                      />
                    </div>
                    <div className="flex items-center mb-2">
                      <label htmlFor={`car-${order._id}`} className="flex-grow">
                        <h2 className="text-sm font-semibold">
                          <strong>Brand:</strong> {order.name}
                        </h2>
                        <p className="text-gray-700">
                          <strong>Color:</strong> {order.color}
                        </p>
                        <p className="text-gray-700">
                          <strong>Number:</strong> {order.vin}
                        </p>
                      </label>
                    </div>
                  </div>
                )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
