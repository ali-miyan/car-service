import { useGetEveryServicesQuery } from "../../../store/slices/companyApiSlice";
import ServiceCard from "./ServiceCard";

const ServiceList = () => {
  const { data: servicesData } = useGetEveryServicesQuery({});

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
        {servicesData &&
          servicesData.map((service, index) => (
            <ServiceCard
              key={service._id}
              company={service.companyId}
              selectedHours={service.selectedHours}
              servicePlace={service.servicePlace}
              image={service.images[0]}
            />
          ))}
      </div>
    </div>
  );
};

export default ServiceList;
