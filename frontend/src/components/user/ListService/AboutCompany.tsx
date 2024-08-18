import React from "react";
import { Link, useParams } from "react-router-dom";
import { useGetCompanyByIdQuery } from "../../../store/slices/companyApiSlice";
import { useGetServiceQuery } from "../../../store/slices/adminApiSlice";

const AboutCompany = () => {
  const { id } = useParams<{ id: string }>();
  const { data: company } = useGetCompanyByIdQuery(id as string);
  const { data: services } = useGetServiceQuery(undefined);

  return (
    <>
      {company && (
        <div className="py-16 bg-white font-bai-regular lowercase">
          <div className="container mx-auto px-6 md:px-12 xl:px-6">
            <div className="md:flex md:gap-6 lg:gap-12">
              <div className="md:w-1/2 md:order-2">
                <h2 className="text-4xl md:text-5xl uppercase text-gray-900 font-bold mb-4">
                  {company.name} - About Us
                </h2>
                <p className="text-gray-600">{company.description}</p>
                <p className="mt-4 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam non urna justo. Fusce pretium neque sit amet
                  ullamcorper eleifend.
                </p>
              </div>
              <div className="md:w-1/2 md:order-1 mb-6 md:mb-0 flex justify-center">
                <img
                  src={company.logo}
                  alt="Company Logo"
                  loading="lazy"
                  className="max-w-full h-auto rounded-lg"
                />
              </div>
            </div>

            <div className="flex flex-col items-center justify-center mt-12">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                OUR SERVICES
              </h1>
              <div className=" flex justify-center md:grid-cols-4 gap-4">
                {services && services.length > 0 ? (
                  services.map((service, index) => (                    
                    <Link to={`/services?company=${company._id}`}>
                    <div
                      key={index}
                      className="flex flex-col items-center space-y-1 p-2 hover:bg-gray-100 bg-white border rounded-lg"
                    >
                      <img
                        src={service.logoUrl}
                        alt={service.serviceName}
                        className="w-20 h-20 object-contain"
                      />
                      <p className="text-center text-sm md:text-base">
                        {service.serviceName}
                      </p>
                    </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-gray-600 col-span-4 text-center">
                    No services available
                  </p>
                )}
              </div>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <img
                  src="/images/history.jpg"
                  alt="History"
                  className="rounded-lg w-full h-auto"
                />
                <p className="mt-2 text-gray-600 text-sm text-center">Our Rich History</p>
              </div>
              <div>
                <img
                  src="/images/team.jpg"
                  alt="Team"
                  className="rounded-lg w-full h-auto"
                />
                <p className="mt-2 text-gray-600 text-sm text-center">Meet Our Team</p>
              </div>
              <div>
                <img
                  src="/images/values.jpg"
                  alt="Values"
                  className="rounded-lg w-full h-auto"
                />
                <p className="mt-2 text-gray-600 text-sm text-center">Our Values</p>
              </div>
              <div>
                <img
                  src="/images/facilities.jpg"
                  alt="Facilities"
                  className="rounded-lg w-full h-auto"
                />
                <p className="mt-2 text-gray-600 text-sm text-center">Our Facilities</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutCompany;
