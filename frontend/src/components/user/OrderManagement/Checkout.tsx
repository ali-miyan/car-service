import React from "react";
import { useSelector } from "react-redux";
import { useGetSelectedCarQuery } from "../../../store/slices/userApiSlice";
import { RegistrationStep } from "../../common/OrderHeader";

const Checkout = () => {
  const datas = useSelector((state: any) => state.order);
  const { data: car } = useGetSelectedCarQuery(datas.carModel);
  console.log(datas, "dataas", car);

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
      <section className="bg-gray-100 py-8 antialiased font-bai-regular md:py-16">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <div className="flex flex-col md:flex-row gap-6">
            <form className="flex-1 space-y-6">
              <div className="space-y-1">
                <h3 className="font-semibold text-center text-gray-900 uppercase">
                  Service location and Date
                </h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="rounded-lg border border-gray-200 bg-white p-4 ps-4">
                    <div className="flex items-start">
                      <div className="flex h-5 items-center"></div>
                      <div className="text-sm">
                        <label
                          htmlFor="service-location"
                          className="font-medium leading-none text-gray-900"
                        >
                          Service at {datas.servicePlace}
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
                          Scheduled at <strong>{datas.serviceDate}</strong>
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
              <h3 className="font-semibold text-center text-gray-900 uppercase">
                Service Car and Address
              </h3>
              <div className="flex justify-evenly">
                {car && (
                  <div
                    key={car._id}
                    className="p-4 shadow-md mx-3 mb-4 bg-white w-60 "
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
                <div className="p-4 shadow-md mx-3 mb-4 bg-white w-60 ">
                  <h3 className="text-lg font-semibold mb-2">Address</h3>
                  <p className="text-gray-700">
                    <strong>Address:</strong> {datas.address.address}
                  </p>
                  <p className="text-gray-700">
                    <strong>City:</strong> {datas.address.city}
                  </p>
                  <p className="text-gray-700">
                    <strong>Country:</strong> {datas.address.country}
                  </p>
                  <p className="text-gray-700">
                    <strong>Postcode:</strong> {datas.address.postcode}
                  </p>
                  <p className="text-gray-700">
                    <strong>Street Region:</strong> {datas.address.streetRegion}
                  </p>
                </div>{" "}
              </div>
              <div className="space-y-4 font-bai-regular">
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
            </form>

            <div className="w-full max-w-xs xl:max-w-md">
              <div className="flow-root">
                <div className="-my-3 divide-y divide-gray-200">
                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500">
                      Subtotal
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      ₹4000
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500">
                      Savings
                    </dt>
                    <dd className="text-base font-medium text-green-500">0</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500">
                      Store Pickup
                    </dt>
                    <dd className="text-base font-medium text-gray-900">$99</dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-normal text-gray-500">Tax</dt>
                    <dd className="text-base font-medium text-gray-900">
                      ₹4000
                    </dd>
                  </dl>

                  <dl className="flex items-center justify-between gap-4 py-3">
                    <dt className="text-base font-bold text-gray-900">Total</dt>
                    <dd className="text-base font-bold text-gray-900">₹4000</dd>
                  </dl>
                </div>
              </div>
              <button
                type="submit"
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
