import React, { useEffect, useState } from "react";
import { useGetEveryServicesQuery } from "../../../store/slices/companyApiSlice";
import ServiceCard from "./ServiceCard";
import { Link, useSearchParams } from "react-router-dom";
import Filters from "./Filter";

const ServiceList = ({ serviceData }: { serviceData: object[] }) => {
  const [searchParams] = useSearchParams();
  const { data: servicesData } = useGetEveryServicesQuery({
    type: searchParams.get("service") ? "service" : "company",
    id: searchParams.get("service") || searchParams.get("company")
  });
  
  console.log(servicesData, "....");

  
  return (
    <>
      <Filters />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {servicesData && servicesData.length > 0 ? (
            servicesData.map((service) => (
              <Link key={service._id} to={`/selected-service/${service._id}`}>
                <ServiceCard
                  id={service.generalServiceId}
                  company={service.companyId}
                  selectedHours={service.selectedHours}
                  servicePlace={service.servicePlace}
                  image={service.images[0]}
                  serviceData={serviceData}
                />
              </Link>
            ))
          ) : (
            <p className="text-end my-10">no service available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(ServiceList);
