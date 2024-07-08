import React from 'react';

const Address = () => {
  return (
    <div className="w-full md:w-8/12 bg-gray-100 p-6 mx-10 md:mx-0 font-normal lowercase rounded-lg">
      <h2 className="text-2xl font-bold mb-4">MY ADDRESS</h2>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">ADDRESS - 1</h3>
          <ul className="list-disc pl-5">
            <li>Name: John Smith</li>
            <li>Email: smith@example.com</li>
            <li>Phone No: +1 (555) 123-4567</li>
            <li>Alternate Phone No: +1 (555) 967-55-43</li>
            <li>City: Springfield</li>
            <li>Street: Oak Street</li>
            <li>Building No: 123</li>
            <li>Pincode: 12345</li>
          </ul>
        </div>
        <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-2">ADDRESS - 2</h3>
          <ul className="list-disc pl-5">
            <li>Name: Emily Johnson</li>
            <li>Email: johnson@example.com</li>
            <li>Phone No: +44 20 1234 5678</li>
            <li>Alternate Phone No: +44 20 8765 4321</li>
            <li>City: London</li>
            <li>Street: Mapla Avenue</li>
            <li>Building No: 456</li>
            <li>Pincode: SW1A 1AA</li>
          </ul>
        </div>
      </div>
      <button className="mt-8 px-6 py-3 bg-red-800 text-white font-medium rounded-md hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50">
        ADD ADDRESS
      </button>
    </div>
  );
};

export default Address;
