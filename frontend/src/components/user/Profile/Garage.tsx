import React from "react";
import { useGetUsersOrderQuery } from "../../../store/slices/orderApiSlice";
import { getInitialToken } from "../../../helpers/getToken";
import { Link } from "react-router-dom";

const MyBookings = () => {
  const token = getInitialToken("userToken");
  const { data: orders } = useGetUsersOrderQuery(token as string);
  console.log(orders, "mu");

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Order List</h1>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100 border-b border-gray-300">
            <th className="py-2 px-4 text-left">No</th>
            <th className="py-2 px-4 text-left">Order ID</th>
            <th className="py-2 px-4 text-left">Order Place</th>
            <th className="py-2 px-4 text-left">Order Date</th>
            <th className="py-2 px-4 text-left">Order Payment</th>
            <th className="py-2 px-4 text-left">View</th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders.map((order, index) => (
              <tr key={order?.id} className="border-b border-gray-200">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">#{order?.id.substring(0, 8)}</td>
                <td className="py-2 px-4">{order?.servicePlace}</td>
                <td className="py-2 px-4">{order?.date}</td>
                <td className="py-2 px-4">{order?.payment}</td>
                <td className="py-2 px-4">
                  <button className="text-red-900 hover:underline"><Link to={`/order-details/${order.id}`}> View</Link></button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBookings;
