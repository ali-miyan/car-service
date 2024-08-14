import React from "react";

const ServiceCard = ({
  id,
  company,
  selectedHours,
  servicePlace,
  image,
  serviceData,
  servicePackage
}: any) => {
  const service = React.useMemo(
    () => serviceData.find((service) => service.id === id),
    [id, serviceData]
  );

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transform hover:scale-95 transition duration-500 cursor-pointer">
      <div className="flex flex-col md:flex-row">
        <div className="my-auto flex-shrink-0 p-4">
          <img
            src={service?.image || image}
            alt="Company Logo"
            className="w-24 h-24 object-cover rounded-md mx-auto md:mx-0"
          />
          <p className="lowercase text-center md:text-left text-sm text-gray-500 ">
            {service?.name}
          </p>
        </div>
        <div className="flex flex-col font-bai-regular lowercase justify-between p-4 flex-grow">
          <div>
            <div className="flex items-center mb-4">
              <img
                src={company?.logo}
                alt="Service Provider"
                className="w-16 h-16 object-cover rounded-full mr-4"
              />
              <div>
                <p className="text-lg uppercase font-bai-bold -mb-1">
                  {company?.companyName}
                </p>
                <p className="text-sm text-gray-600">Since {company?.year}</p>
              </div>
            </div>

            <div className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Start from:</span> ₹{servicePackage?.detail.price}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Working Hours:</span> {selectedHours}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Service Area:</span> {servicePlace}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              <span className="font-semibold">Service Type:</span> {service ? service.name : "Unknown Service"}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold">Location:</span> {company?.address?.city}, {company?.address?.address}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ServiceCard);
