import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useGetRatingsQuery,
  useGetSinglServicesQuery,
} from "../../../store/slices/companyApiSlice";
import { FaStar, FaTruckMoving } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { getInitialToken } from "../../../helpers/getToken";
import { notifyError } from "../../common/Toast";
import TermsAndService from "./TermsAndService";
import { useDispatch } from "react-redux";
import {
  setCompanyId,
  setGeneralService,
  setPackage,
} from "../../../context/OrderContext";
import OrderDetailSkeleton from "../../../layouts/skelotons/OrderDetailSkeleton";

const SelectedService = () => {
  const { id } = useParams<{ id: string }>();
  const token = getInitialToken("userToken");
  const { data: posts, isLoading } = useGetSinglServicesQuery(id as string);
  const { data: rating } = useGetRatingsQuery(id as string);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [generalServiceDetials, setGeneralServiceDetails] = useState<any>();
  const location = useLocation();
  const { generalServiceId, serviceData } = location.state || {};

  const totalRatings = rating.length;
  const averageRating = totalRatings
    ? (
        rating.reduce((acc, { stars }) => acc + stars, 0) / totalRatings
      ).toFixed(1)
    : 0;
  const starCounts = [1, 2, 3, 4, 5].reduce((acc: any, star: any) => {
    acc[star] = rating.filter((val) => val.stars === star).length;
    return acc;
  }, {});

  console.log(rating, "ratings");

  useEffect(() => {
    if (serviceData && generalServiceId) {
      const details = serviceData.find((val) => val.id === generalServiceId);
      setGeneralServiceDetails(details);
    }
  }, [serviceData, generalServiceId]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (name?: string) => {
    if (token) {
      dispatch(setCompanyId(posts.companyId._id));
      dispatch(setGeneralService(generalServiceId));
      dispatch(setPackage(name));
      setIsModalOpen(true);
    } else {
      notifyError("You need to log in to continue");
      navigate("/", { state: { openModal: true } });
    }
  };

  console.log(posts, "selected service");
  const scrollRef = useRef(null);

  if (isLoading || !posts) return <OrderDetailSkeleton />;

  const {
    basicPackage = {},
    standardPackage = {},
    premiumPackage = {},
  } = posts && posts;

  const scrollToRef = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="flex flex-col py-8 font-bai-regular lowercase bg-gray-100">
        <div className="mx-4 lg:mx-20 p-4 flex flex-col lg:flex-row items-center lg:items-start justify-evenly">
          <div className="w-full lg:w-5/12 flex flex-col items-center">
            <img
              src={posts?.images?.[0]}
              alt="Main Product"
              className="lg:w-full h-auto object-cover mb-4"
            />

            <div className="flex lg:hidden space-x-2 py-4">
              {posts?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product Thumbnail ${index + 1}`}
                  className="w-16 h-16 object-cover"
                />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 lg:pl-8 flex flex-col items-center lg:items-start">
            <img
              src={posts?.companyId?.logo}
              alt={`${posts?.companyId?.companyName} Logo`}
              className="w-20 h-20 lg:w-24 lg:h-24 mb-4 lg:-mb-5 "
            />
            <h2 className="text-[#ab0000] text-xs lg:text-sm font-semibold tracking-wide uppercase text-center lg:text-left">
              {posts?.companyId?.companyName} company
            </h2>
            <h1 className="text-2xl lg:text-3xl font-bold mt-2 text-center lg:text-left">
              {generalServiceDetials?.name}
            </h1>
            <p className="text-gray-600 text-sm mt-4 text-center lg:text-left">
              {generalServiceDetials?.description}
            </p>

            <div className="flex items-center border my-6">
              <span className="text-xl lg:text-3xl font-bold">
                <span className="text-base mr-1">Price Range:</span>₹
                {posts?.basicPackage?.detail?.price}
                <span className="text-base mx-1">to</span>₹
                {posts?.premiumPackage?.detail?.price}
              </span>
            </div>
            <table className="table-auto border-collapse border  border-gray-300">
              <thead>
                <tr>
                  <th className="border text-sm border-red-900 px-4">
                    working hours
                  </th>
                  <th className="border text-sm border-red-900 px-4">
                    service place
                  </th>
                  <th className="border text-sm border-red-900 px-4">
                    services per day
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-red-900 text-sm text-center py-1 px-4">
                    {posts?.selectedHours}
                  </td>
                  <td className="border border-red-900 text-sm text-center py-1 px-4">
                    {posts?.servicePlace}
                  </td>
                  <td className="border border-red-900 text-sm text-center py-1 px-4">
                    {posts?.servicesPerDay}
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="flex items-center mt-6 space-x-4">
              <button
                onClick={scrollToRef}
                className="bg-[#ab0000] text-white px-6 py-2 lg:py-3 font-bold flex items-center justify-center hover:bg-[#7c1f1f]"
              >
                BOOK SERVICE
              </button>
            </div>

            <div className="space-x-2 lg:space-x-4 hidden lg:flex py-8 lg:py-6">
              {posts?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product Thumbnail ${index + 1}`}
                  className="w-16 h-16 lg:w-20 lg:h-20 object-cover"
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-1 mx-10 mb-10 text-center">
          <ul className="md:flex items-center gap-8 md:gap-12 p-4 md:p-8 text-gray-700">
            <li className="flex flex-col items-center md:w-auto w-full mb-6 md:mb-0">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-200 mb-2">
                <FaTruckMoving className="text-gray-600" />
              </div>
              <span className="text-red-900 font-bold block text-center md:w-auto w-full">
                FREE US DELIVERY
              </span>
              <p className="text-center md:w-auto w-full">
                For US customers including Alaska and Hawaii on orders over
                $200.
              </p>
            </li>
            <li className="flex flex-col items-center md:w-auto w-full mb-6 md:mb-0">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-200 mb-2">
                <RiSecurePaymentLine className="text-gray-600" />
              </div>
              <span className="text-red-900 font-bold block text-center md:w-auto w-full">
                SECURE PAYMENT
              </span>
              <p className="text-center md:w-auto w-full">
                We accept Visa, American Express, Paypal, Payoneer Mastercard,
                and Discover.
              </p>
            </li>
            <li className="flex flex-col items-center md:w-auto w-full">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gray-200 mb-2">
                <VscWorkspaceTrusted className="text-gray-600" />
              </div>
              <span className="text-red-900 font-bold block text-center md:w-auto w-full">
                1 YEAR WARRANTY
              </span>
              <p className="text-center md:w-auto w-full">
                All our products are made with care and covered for one year
              </p>
            </li>
          </ul>
        </div>

        <div ref={scrollRef} className="w-full mx-auto">
          <h2 className="uppercase font-bai-bold text-center text-xl underline underline-offset-4">
            CHOOSE A PACKAGE
          </h2>
          <div className="md:flex md:flex-co -mt-7 md:align-center">
            <div className="mt-12 space-y-3 md:mt-16 md:space-y-0 md:grid md:grid-cols-3 md:gap-6 md:max-w-5xl md:mx-auto xl:grid-cols-3">
              <div className="border border-slate-200 bg-white rounded-lg shadow-md divide-y divide-slate-200">
                <div className="p-6">
                  <h2 className="text-xl leading-6 font-bold text-slate-900 uppercase">
                    BASIC
                  </h2>
                  <p className="mt-2 text-xs text-slate-700 leading-tight">
                    Ideal for routine upkeep and ensuring your vehicle runs
                    smoothly with basic servicing and inspections.
                  </p>
                  <p className="mt-8">
                    <span className="text-4xl font-bold text-slate-900 tracking-tighter">
                      ₹{basicPackage?.detail?.price || "0"}
                    </span>

                    <span className="text-base text-slate-500">/service</span>
                    <br />
                    <span className="text-gray-500">
                      - takes {basicPackage?.detail?.workingHours} hours
                    </span>
                  </p>
                  <button
                    onClick={() => handleClick("basic")}
                    className="mt-2 uppercase block bg-black w-full bg-slate-900 rounded py-2 text-sm font-semibold text-white text-center"
                  >
                    book now
                  </button>
                </div>
                <div className="pt-6 pb-8 px-6">
                  <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
                    What's included
                  </h3>
                  <ul role="list" className="mt-4 space-y-3">
                    {standardPackage &&
                      standardPackage?.subServices?.map(
                        (val: any, index: number) => (
                          <React.Fragment key={index}>
                            <li className="flex space-x-3" key={val._id}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="flex-shrink-0 h-5 w-5 text-green-400"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                ></path>
                                <path d="M5 12l5 5l10 -10"></path>
                              </svg>
                              <span className="text-sm text-slate-700">
                                {val.name}
                              </span>
                            </li>
                          </React.Fragment>
                        )
                      )}
                  </ul>
                </div>
              </div>
              <div className="border border-slate-200 bg-white rounded-lg shadow-sm divide-y divide-slate-200">
                <div className="p-6">
                  <h2 className="text-xl leading-6 font-bold text-slate-900 uppercase">
                    standard
                  </h2>
                  <p className="mt-2 text-xs text-slate-700 leading-tight">
                    Perfect for maintaining peak performance and addressing
                    minor issues before they become costly repairs.
                  </p>
                  <p className="mt-8">
                    <span className="text-4xl font-bold text-slate-900 tracking-tighter">
                      ₹{standardPackage?.detail?.price || "0"}
                    </span>

                    <span className="text-base text-slate-500">/service</span>
                    <br />
                    <span className="text-gray-500">
                      - takes {standardPackage?.detail?.workingHours} hours
                    </span>
                  </p>
                  <button
                    onClick={() => handleClick("standard")}
                    className="mt-2 uppercase block bg-black w-full bg-slate-900 rounded py-2 text-sm font-semibold text-white text-center"
                  >
                    book now
                  </button>
                </div>
                <div className="pt-6 pb-8 px-6">
                  <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
                    What's included
                  </h3>
                  <ul role="list" className="mt-4 space-y-3">
                    {standardPackage &&
                      standardPackage?.subServices?.map(
                        (val: any, index: number) => (
                          <React.Fragment key={index}>
                            <li className="flex space-x-3" key={val._id}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="flex-shrink-0 h-5 w-5 text-green-400"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                ></path>
                                <path d="M5 12l5 5l10 -10"></path>
                              </svg>
                              <span className="text-sm text-slate-700">
                                {val.name}
                              </span>
                            </li>
                          </React.Fragment>
                        )
                      )}
                  </ul>
                </div>
              </div>
              <div className="border border-slate-200 bg-white rounded-lg shadow-sm divide-y divide-slate-200">
                <div className="p-6">
                  <h2 className="text-xl leading-6 font-bold text-slate-900 uppercase">
                    premium
                  </h2>
                  <p className="mt-2 text-xs text-slate-700 leading-tight">
                    Experience top-tier treatment with premium detailing,
                    advanced diagnostics, and personalized service for your
                    vehicle.
                  </p>
                  <p className="mt-8">
                    <span className="text-4xl font-bold text-slate-900 tracking-tighter">
                      ₹{premiumPackage?.detail?.price || "0"}
                    </span>

                    <span className="text-base text-slate-500">/service</span>
                    <br />
                    <span className="text-gray-500">
                      - takes {premiumPackage?.detail?.workingHours} hours
                    </span>
                  </p>
                  <button
                    onClick={() => handleClick("premium")}
                    className="mt-2 uppercase block bg-black w-full bg-slate-900 rounded py-2 text-sm font-semibold text-white text-center"
                  >
                    book now
                  </button>
                </div>
                <div className="pt-6 pb-8 px-6">
                  <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
                    What's included
                  </h3>
                  <ul role="list" className="mt-4 space-y-3">
                    {premiumPackage &&
                      premiumPackage?.subServices?.map(
                        (val: any, index: number) => (
                          <React.Fragment key={index}>
                            <li className="flex space-x-3" key={val._id}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="flex-shrink-0 h-5 w-5 text-green-400"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                aria-hidden="true"
                              >
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                ></path>
                                <path d="M5 12l5 5l10 -10"></path>
                              </svg>
                              <span className="text-sm text-slate-700">
                                {val.name}
                              </span>
                            </li>
                          </React.Fragment>
                        )
                      )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="py-24 relative">
          <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
            <div className="w-full">
              <h2 className="font-bai-bold font-bold text-xl uppercase text-black mb-8 text-center">
                Our customer reviews
              </h2>
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-11 pb-11 border-b  border-gray-100 max-xl:max-w-2xl max-xl:mx-auto">
                <div className="box flex flex-col gap-y-4 w-full">
                  {[5, 4, 3, 2, 1].map((value) => (
                    <div
                      key={value}
                      className="flex my-0.5 items-center w-full"
                    >
                      <p className=" text-black mr-0.5">{value}</p>
                      <p className="h-2 w-full sm:min-w-[278px] rounded-3xl bg-white ml-5 mr-3">
                        <span
                          className="h-full rounded-3xl bg-red-700 flex"
                          style={{
                            width: `${
                              (starCounts[value] / totalRatings) * 100
                            }%`,
                          }}
                        ></span>
                      </p>

                      <p className=" text-black mr-0.5">{starCounts[value]}</p>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-white rounded-3xl flex items-center justify-center flex-col">
                  <h2 className="font-manrope font-bold text-5xl text-gray-900 mb-6">
                    {averageRating}
                  </h2>
                  <div className="flex items-center justify-center gap-2 sm:gap-6 mb-4">
                    {[...Array(Math.round(averageRating))].map((_, index) => (
                      <FaStar key={index} className="text-[#ab0000] text-4xl" />
                    ))}
                  </div>
                  <p className="text-xl leading-8 text-gray-900 text-center">
                    {rating?.length} Ratings
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {rating &&
                  rating.map((val) => (
                    <div
                      key={val.id}
                      className="flex-1 px-5 min-w-[calc(50%-1.25rem)] max-w-[calc(50%-1.25rem)] pt-5 pb-4 border border-gray-200 rounded-lg shadow-md bg-white"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                          <img
                            src={val.profileImg}
                            alt={val.username}
                            className="w-14 h-14 rounded-full border-2"
                          />
                          <div className="flex-1">
                            <h6 className="text-lg font-semibold text-gray-800">
                              {val.username}
                            </h6>
                            <p className="text-sm text-gray-500">
                              {new Date(val.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-col items-start ml-auto space-y-2 ">
                          <div className="flex items-center space-x-1">
                            {[...Array(val.stars)].map((_, index) => (
                              <svg
                                key={index}
                                className="w-6 h-6 text-[#ab0000] transition-transform transform hover:scale-110"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path d="M12 .587l3.668 7.425 8.2 1.19-5.918 5.783 1.396 8.148L12 17.74 5.654 22.028l1.396-8.148-5.918-5.783 8.2-1.19L12 .587z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-gray-600 mx-auto text-sm mt-1">
                            {val.stars} out of 5
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-700 mt-2 text-center">
                        '' {val.review}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>

        <div className="mt-8 mx-20 bg-white rounded-lg shadow-lg p-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700">
              For more information or to book our services, please contact us at
              <strong className="text-red-900">
                info@carpaintingservice.com
              </strong>{" "}
              or call
              <strong className="text-red-900">(123) 456-7890</strong>.
            </p>
          </div>
        </div>
      </div>
      <TermsAndService
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={posts && posts.terms}
        servicePlace={posts?.servicePlace}
        id={id}
      />
    </>
  );
};

export default SelectedService;
