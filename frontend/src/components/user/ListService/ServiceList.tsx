import React from "react";
import { useGetEveryServicesQuery } from "../../../store/slices/companyApiSlice";
import ServiceCard from "./ServiceCard";
import { useNavigate, useSearchParams } from "react-router-dom";
import Filters from "./Filter";
import Loader from "../../common/Loader";

const ServiceList = ({ serviceData }: { serviceData: object[] }) => {
  const [searchParams] = useSearchParams();
  const { data: servicesData, isLoading } = useGetEveryServicesQuery({
    type: searchParams.get("service") ? "service" : "company",
    id: searchParams.get("service") || searchParams.get("company"),
  });
  const navigate = useNavigate();

  if (isLoading) {
    return <Loader />;
  }

  const handleServiceClick = (id: string, generalServiceId: string) => {
    navigate(`/selected-service/${id}`, {
      state: {
        generalServiceId,
      },
    });
  };

  return (
    <>
      <Filters />
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
          {servicesData && servicesData.length > 0 ? (
            servicesData.map((service) => (
              <div
                key={service._id}
                onClick={() =>
                  handleServiceClick(service._id, service.generalServiceId)
                }
                className="cursor-pointer"
              >
                <ServiceCard
                  id={service.generalServiceId}
                  company={service.companyId}
                  selectedHours={service.selectedHours}
                  servicePlace={service.servicePlace}
                  image={service.images[0]}
                  serviceData={serviceData}
                />
              </div>
            ))
          ) : (
            <p className="text-end my-10">No service available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default React.memo(ServiceList);
