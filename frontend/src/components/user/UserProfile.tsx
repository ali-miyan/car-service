import React from 'react';
import { FiSettings, FiLogOut, FiUser, FiPackage, FiMapPin, FiTool } from 'react-icons/fi';
import Address from './Address';

const Profile = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 mt-10 w-full">
      <div className="w-full md:w-2/12 bg-gray-100 p-6 rounded-lg mx-10">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
            <FiUser size={32} color="gray" />
          </div>
          <p className="text-gray-700 font-medium mt-2">HELLO USER</p>
        </div>
        <ul className="flex flex-col gap-3 lowercase font-normal">
          <li className="flex items-center gap-3 hover:bg-red-100 rounded-md p-3 cursor-pointer">
            <FiPackage size={24} color="#718096" />
            <span>My Services</span>
          </li>
          <li className="flex items-center gap-3 hover:bg-red-100 rounded-md p-3 cursor-pointer">
            <FiTool size={24} color="#718096" />
            <span>My Garage</span>
          </li>
          <li className="flex items-center gap-3 hover:bg-red-100 rounded-md p-3 cursor-pointer">
            <FiMapPin size={24} color="#718096" />
            <span>My Address</span>
          </li>
          <li className="flex items-center gap-3 hover:bg-red-100 rounded-md p-3 cursor-pointer">
            <FiSettings size={24} color="#718096" />
            <span>Profile Settings</span>
          </li>
          <li className="flex items-center gap-3 hover:bg-red-100 rounded-md p-3 cursor-pointer">
            <FiLogOut size={24} color="#718096" />
            <span>Log-Out</span>
          </li>
        </ul>
      </div>
      <Address />
    </div>
  );
};

export default Profile;
