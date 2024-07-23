import React from "react";

const ServiceCard = ({ id, company, selectedHours, servicePlace, image, serviceData }) => {
  const service = React.useMemo(() => serviceData.find(service => service.id === id), [id, serviceData]);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl hover:scale-90 transition duration-700 cursor-pointer">
      <div className="flex flex-col md:flex-row">
        <img
          src={image}
          alt="Company Logo"
          className="w-full md:w-48 h-52 object-cover"
        />

        <div className="flex flex-col font-bai-regular lowercase justify-between p-3 flex-grow">
          <div className="">
            <div className="flex items-center">
              <img
                src={company.logo}
                alt="Service Provider"
                className="w-20 h-20 object-cover rounded-full mr-3"
              />
              <p className="text-md uppercase font-bai-bold">
                {company.companyName}
              </p>
            </div>

            <div className="text-sm text-gray-600 ">
              <span className="font-semibold">Working Hours:</span>{" "}
              {selectedHours}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold">Service Area:</span>{" "}
              {servicePlace}
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold ">Since</span> {company.year}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold ">service Type:</span>{" "}
              {service ? service.name : "Unknown Service"}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold ">location:</span>{" "}
              {company.address.city}, {company.address.address}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ServiceCard);
