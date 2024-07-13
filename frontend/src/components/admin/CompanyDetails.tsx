import React from 'react';
import { useGetCompanyByIdQuery } from '../../store/slices/companyApiSlice';
import { useParams } from 'react-router-dom';

const ServiceInfo = () => {

  const { id } = useParams<{ id: string }>();
  const { data: posts, isLoading, refetch,error } = useGetCompanyByIdQuery(id as string);
  
  
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center text-xl font-bold mb-4">SERVICE INFO</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-200 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">COMPANY DETAILS</h2>
          <ul className="list-none">
            <li><strong>Company Name:</strong> Example Company</li>
            <li><strong>Owner Name:</strong> John Doe</li>
            <li><strong>Year:</strong> 2023</li>
            <li><strong>License Number:</strong> 123456</li>
            <li><strong>License Expiry:</strong> 2025-12-31</li>
            <li><strong>Address:</strong> 123 Main St, City, Country</li>
          </ul>
        </div>

        <div className="bg-gray-200 p-4 rounded">
          <h2 className="text-lg font-semibold mb-2">CONTACT AND LOCATION</h2>
          <ul className="list-none">
            <li><strong>Contact 1:</strong> +1234567890</li>
            <li><strong>Contact 2:</strong> +0987654321</li>
            <li><strong>Email:</strong> example@example.com</li>
            <li><strong>State:</strong> State Name</li>
            <li><strong>Country:</strong> Country Name</li>
            <li><strong>Pin Code:</strong> 123456</li>
          </ul>
        </div>
      </div>

      <h2 className="text-center text-lg font-semibold my-4">LICENSING INFORMATION</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex justify-center">
          <img src="company-license.jpg" alt="Company License" className="w-full md:w-3/4 rounded" />
        </div>
        <div className="flex justify-center">
          <img src="government-approved-certificate.jpg" alt="Government Approved Certificate" className="w-full md:w-3/4 rounded" />
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded mr-2">REJECT</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded">ACCEPT</button>
      </div>
    </div>
  );
};

export default ServiceInfo;
