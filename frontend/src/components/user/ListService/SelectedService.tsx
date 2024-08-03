import React, { useRef, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { useGetSinglServicesQuery } from "../../../store/slices/companyApiSlice";
import { FaTruckMoving } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { FaUserFriends, FaStar, FaLock } from "react-icons/fa";
import { getInitialToken } from "../../../helpers/getToken";
import { notifyError } from "../../common/Toast";
import TermsAndService from "./TermsAndService";
import { useDispatch } from "react-redux";
import { setPackage } from "../../../context/OrderContext";

const SelectedService = () => {
  const { id } = useParams<{ id: string }>();
  const token = getInitialToken("userToken");
  const { data: posts } = useGetSinglServicesQuery(id as string);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleClick = (name?:string) => {
    if (token) {
      console.log(name,'namemememe');
      
      dispatch(setPackage(name))
      setIsModalOpen(true);
    } else {
      notifyError("You need to log in to continue");
      navigate("/", { state: { openModal: true } });
    }
  };

  console.log(posts, "selected service");
  const scrollRef = useRef(null);

  if (!posts) {
    return <div></div>;
  }

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
      <div className="flex flex-col items-center px-4 py-16 font-bai-regular lowercase bg-gray-100">
        <div className="mx-auto w-full max-w-6xl px-4 py-8 flex justify-center">
          <div className="mb-8 flex flex-col md:flex-row items-center border border-gray-200 rounded-lg shadow-lg p-6 bg-white">
            <img
              src={posts && posts.images && posts.images[0]}
              alt="Car Service"
              className="border-4 border-gray-300 w-full md:w-80 h-80 object-cover rounded-lg"
            />

            <div className="md:w-1/2 md:ml-8 mt-4 md:mt-0 text-center md:text-left">
              <img
                src={posts.companyId && posts.companyId.logo}
                alt="Company Logo"
                className="w-24 h-24 mx-auto md:mx-0 object-cover"
              />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4 mb-6 uppercase">
                {posts?.title || "Our Services"}
              </h1>

              <div className="flex flex-wrap w-full justify-center md:justify-start items-center space-x-6 mb-6">
                <div className="flex items-center flex-col mb-4">
                  <FaUserFriends className="text-2xl mb-2" />
                  <span className="text-sm font-medium text-gray-600">
                    1000 Trusted People
                  </span>
                </div>
                <div className="flex items-center flex-col mb-4">
                  <FaStar className="text-2xl mb-2" />
                  <span className="text-sm font-medium text-gray-600">
                    4.7 Rating
                  </span>
                </div>
                <div className="flex items-center flex-col mb-4">
                  <FaLock className="text-2xl mb-2" />
                  <span className="text-sm font-medium text-gray-600">
                    Service Warranty
                  </span>
                </div>
              </div>

              <div className="text-gray-600 mb-6">
                <p className="text-lg font-medium">
                  Working Days: {posts?.selectedHours || "N/A"}
                </p>
                <p className="text-lg font-medium">
                  Service Locations:
                  {posts?.servicePlace === "both"
                    ? "Service Center & Home Service"
                    : posts?.servicePlace === "home"
                    ? "Home Service"
                    : "Service Center"}
                </p>
              </div>

              <button
                onClick={token ? scrollToRef : ()=>handleClick()}
                className="px-6 py-3 bg-[#ab0000] text-white font-semibold  shadow-md hover:bg-red-900 focus:outline-none transition ease-in-out duration-300"
              >
                Book Service
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 mx-10 mb-10 text-center">
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

                    <span className="text-base font-medium text-slate-500">
                      /service
                    </span>
                    <br />
                    <span className="text-gray-500">
                      - takes {basicPackage?.detail?.workingHours} hours
                    </span>
                  </p>
                  <button
                    onClick={()=>handleClick('basic')}
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

                    <span className="text-base font-medium text-slate-500">
                      /service
                    </span>
                    <br />
                    <span className="text-gray-500">
                      - takes {standardPackage?.detail?.workingHours} hours
                    </span>
                  </p>
                  <button
                    onClick={()=>handleClick('standard')}
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

                    <span className="text-base font-medium text-slate-500">
                      /service
                    </span>
                    <br />
                    <span className="text-gray-500">
                      - takes {premiumPackage?.detail?.workingHours} hours
                    </span>
                  </p>
                  <button
                    onClick={()=>handleClick('premium')}
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
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-700">
                  <strong className="text-red-900">
                    Q: How long does the service take?
                  </strong>
                  <br />
                  A: Typically, our service takes 2-3 days depending on the
                  extent of the damage.
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <strong className="text-red-900">
                    Q: Are your paints environmentally friendly?
                  </strong>
                  <br />
                  A: Yes, we use eco-friendly paints that comply with
                  environmental standards.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
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
        id = {id}
      />
    </>
  );
};

export default SelectedService;
