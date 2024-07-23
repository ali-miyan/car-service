import React from "react";
import { useGetEveryServicesQuery } from "../../../store/slices/companyApiSlice";
import ServiceCard from "./ServiceCard";

const ServiceList = ({ serviceData }: { serviceData: object[] }) => {
  const { data: servicesData } = useGetEveryServicesQuery({});

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        {servicesData && servicesData.length > 0 ? (
          servicesData.map((service) => (
            <ServiceCard
              key={service._id}
              id={service.generalServiceId}
              company={service.companyId}
              selectedHours={service.selectedHours}
              servicePlace={service.servicePlace}
              image={service.images[0]}
              serviceData={serviceData}
            />
          ))
        ) : (
          <p className="text-end my-10">no service available</p>
        )}
      </div>
    </div>
  );
};

export default React.memo(ServiceList);
