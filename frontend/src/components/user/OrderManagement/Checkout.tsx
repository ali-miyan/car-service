import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetSelectedCarQuery,
} from "../../../store/slices/userApiSlice";
import {
  useMakeOrderMutation,
} from "../../../store/slices/orderApiSlice";
import { useGetSinglServicesQuery } from "../../../store/slices/companyApiSlice";
import { RegistrationStep } from "../../common/OrderHeader";
import { loadStripe } from "@stripe/stripe-js";
import { getInitialToken } from "../../../helpers/getToken";

const Checkout = () => {
  const {
    address,
    carModel,
    selectedPackage,
    serviceDate,
    serviceId,
    selectedPlace,
  } = useSelector((state: any) => state.order);

  console.log(address,
    carModel,
    selectedPackage,
    serviceDate,
    serviceId,
    selectedPlace);
  
  const token = getInitialToken("userToken");

  const { data: car } = useGetSelectedCarQuery(carModel);
  const { data: service } = useGetSinglServicesQuery(serviceId);
  const [makeOrder] = useMakeOrderMutation();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >("cash");
  const handlePaymentMethodChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const packageMap: any = {
    basic: "basicPackage",
    standard: "standardPackage",
    premium: "premiumPackage",
  };
  const serviceKey = packageMap[selectedPackage];
  const serviceDetails = service ? service[serviceKey] : [];

  const handleSubmit = async () => {
    try {
      if (selectedPaymentMethod === "online") {
        const stripe = await loadStripe(
          "pk_test_51Piw5m09257pZrXUfjcIjUSkygdRNTNDHFqlBmMhALAMzXeZIhrA9dUspnnBGWaIFg9rOsSuYVHcFMAO1qsiRvXu00FVZc6hg5"
        );
        const res = await makeOrder({
          userId: token,
          payment: selectedPaymentMethod,
          address,
          selectedPlace,
          package: selectedPackage,
          bookingData: serviceDate,
          carId: carModel,
          serviceId,
        }).unwrap();
        const result = stripe?.redirectToCheckout({
          sessionId: res.id,
        });
      } else if (selectedPaymentMethod === "cash") {
        console.log("Cash payment selected");
        const res = await makeOrder({
          userId: token,
          payment: selectedPaymentMethod,
          address,
          selectedPlace,
          package: selectedPackage,
          bookingData: serviceDate,
          carId: carModel,
          serviceId,
        }).unwrap();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mx-auto w-7/12 font-bai-regular px-4 py-20">
        <h1 className="text-2xl font-bai-bold font-bold text-center mb-2">
          BOOK YOUR SERVICE
        </h1>
        <p className="text-sm text-gray-600 text-center mb-8">
          PLEASE PROVIDE ALL REQUIRED DETAILS TO BOOK YOUR SERVICE WITH US
        </p>

        <div className="flex flex-col md:flex-row justify-around items-center">
          <RegistrationStep number={1} text="SELECT SPOT" />
          <div className="hidden md:block flex-grow border-t-2 border-gray-300 mb-5"></div>
          <RegistrationStep number={2} text="SCHEDULING" />
          <div className="hidden md:block flex-grow border-t-2 border-gray-300 mb-5"></div>
          <RegistrationStep number={3} text="ADDRESSING" />
          <div className="hidden md:block flex-grow border-t-2 border-gray-300 mb-5"></div>
          <RegistrationStep number={4} text="CONFIRMATION" active />
        </div>
      </div>
      <h1 className="text-center text-2xl font-bai-bold underline under">
        CHECKOUT
      </h1>
      <hr className="my-5" />
      <section className="bg-gray-100 py-8 antialiased font-bai-regular">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="flex flex-col md:flex-row gap-6">
            <form className="flex-1 space-y-6">
              <h3 className="font-semibold text-center text-gray-900 uppercase">
                Service Car and Address
              </h3>
              <div className="flex justify-evenly">
                {car && (
                  <div
                    key={car._id}
                    className="p-4 shadow-md mx-3 mb-4 bg-white w-full "
                    role="button"
                    tabIndex={0}
                  >
                    <div className="flex justify-center mb-2">
                      <img
                        src={car.src}
                        alt={car.name}
                        className="object-cover w-auto"
                      />
                    </div>
                    <div className="flex items-center mb-2">
                      <label htmlFor={`car-${car._id}`} className="flex-grow">
                        <h2 className="text-sm font-semibold">
                          <strong>Brand:</strong> {car.name}
                        </h2>
                        <p className="text-gray-700">
                          <strong>Color:</strong> {car.color}
                        </p>
                        <p className="text-gray-700">
                          <strong>Number:</strong> {car.vin}
                        </p>
                      </label>
                    </div>
                  </div>
                )}
                <div className="p-4 shadow-md mx-3 mb-4 bg-white w-full ">
                  <h3 className="text-lg font-semibold mb-2">Address</h3>
                  <p className="text-gray-700">
                    <strong>Address:</strong> {address.address}
                  </p>
                  <p className="text-gray-700">
                    <strong>City:</strong> {address.city}
                  </p>
                  <p className="text-gray-700">
                    <strong>Country:</strong> {address.country}
                  </p>
                  <p className="text-gray-700">
                    <strong>Postcode:</strong> {address.postcode}
                  </p>
                  <p className="text-gray-700">
                    <strong>Street Region:</strong> {address.streetRegion}
                  </p>
                </div>{" "}
              </div>

              <h3 className="font-semibold text-center text-gray-900 uppercase">
                service package
              </h3>

              <div className="border border-slate-200 bg-white rounded-lg shadow-sm divide-y divide-slate-200">
                <div className="p-6">
                  <h2 className="text-xl leading-6 font-bold text-slate-900 uppercase">
                    {selectedPackage}
                  </h2>
                  <p className="mt-8">
                    <span className="text-4xl font-bold text-slate-900 tracking-tighter">
                      ₹{serviceDetails?.detail?.price || "0"}
                    </span>

                    <span className="text-base font-medium text-slate-500">
                      /service
                    </span>
                    <br />
                    <span className="text-gray-500">
                      - takes {serviceDetails?.detail?.workingHours} hours
                    </span>
                  </p>
                </div>
                <div className="pt-6 pb-8 px-6">
                  <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
                    What's included
                  </h3>
                  <ul role="list" className="mt-4 space-y-3">
                    {serviceDetails &&
                      serviceDetails?.subServices?.map(
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
            </form>

            <div className="w-full max-w-xs xl:max-w-md border p-5 bg-white">
              <div className="space-y-1">
                <h3 className="font-semibold text-center text-gray-900 uppercase">
                  Service location and Date
                </h3>
                <div>
                  <div className="rounded-lg border border-gray-200 bg-white my-4 p-4 ps-4">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center"></div>
                      <div className="text-sm">
                        <label
                          htmlFor="service-location"
                          className="font-medium leading-none text-gray-900"
                        >
                          Service at <strong> {selectedPlace}</strong>
                        </label>
                        <p
                          id="service-location-text"
                          className="mt-1 text-xs font-normal text-gray-500"
                        >
                          Car pick-up, service, and drop-off included
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-white p-4 ps-4">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center"></div>
                      <div className="text-sm">
                        <label
                          htmlFor="service-date"
                          className="font-medium lowercase leading-none text-gray-900"
                        >
                          Scheduled at <strong>{serviceDate}</strong>
                        </label>
                        <p
                          id="service-date-text"
                          className="mt-1 text-xs font-normal text-gray-500"
                        >
                          Pick-up and drop-off arranged for your selected date.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4 font-bai-regular py-8">
                <h3 className="font-semibold text-center text-gray-900 uppercase">
                  Delivery Methods
                </h3>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="cash-on-delivery"
                          aria-describedby="cash-on-delivery-text"
                          type="radio"
                          name="payment-method"
                          value="cash"
                          checked={selectedPaymentMethod === "cash"}
                          onChange={handlePaymentMethodChange}
                          className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600"
                        />
                      </div>

                      <div className="ms-4 text-sm">
                        <label
                          htmlFor="cash-on-delivery"
                          className="font-medium leading-none text-gray-900"
                        >
                          Cash on Delivery
                        </label>
                        <p
                          id="cash-on-delivery-text"
                          className="mt-1 text-xs font-normal text-gray-500"
                        >
                          Pay with cash when your order arrives.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 ps-4">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center">
                        <input
                          id="online-payment"
                          aria-describedby="online-payment-text"
                          type="radio"
                          name="payment-method"
                          value="online"
                          checked={selectedPaymentMethod === "online"}
                          onChange={handlePaymentMethodChange}
                          className="h-4 w-4 border-gray-300 bg-white text-primary-600 focus:ring-2 focus:ring-primary-600"
                        />
                      </div>

                      <div className="ms-4 text-sm">
                        <label
                          htmlFor="online-payment"
                          className="font-medium leading-none text-gray-900"
                        >
                          Online Payment
                        </label>
                        <p
                          id="online-payment-text"
                          className="mt-1 text-xs font-normal text-gray-500"
                        >
                          Pay securely using your credit or debit card online.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flow-root">
                <div className="-my-3 divide-y divide-gray-200">
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500">
                      Subtotal
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      ₹{serviceDetails?.detail?.price || "0"}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500">
                      Home Pickup
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      ₹{selectedPlace === "home" ? 100 : 0}
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-bold text-gray-900">Total</dt>
                    <dd className="text-base font-bold text-gray-900">
                      ₹
                      {(serviceDetails?.detail?.price || 0) +
                        (selectedPlace === "home" ? 100 : 0)}
                    </dd>
                  </dl>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="flex w-full mt-5 items-center justify-center bg-primary-700 px-5 py-2.5 text-sm font-medium bg-black text-white hover:bg-primary-800"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
