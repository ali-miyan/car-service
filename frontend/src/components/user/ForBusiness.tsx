import { Link } from "react-router-dom";

const ForBusiness = () => {
  return (
    <div className="bg-gray-100 lowercase font-bai-regular py-8">
      <div className="container min-h-96 mx-auto relative">
        <img
          src="/public/assets/hero_bg_3_1.png"
          alt="Car"
          className="absolute -top-8 w-auto h-auto object-cover brightness-50"
        />
      </div>
      
      <div className="text-center mb-52 z-10 relative">
        <h1 className="text-3xl font-bold font-bai-bold uppercase -z-0 text-white -mt-48 mb-4">
          Welcome to Car Service for Businesses
        </h1>
        <Link to={"/company/login"}>
          <button className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-10 rounded-full">
            JOIN
          </button>
        </Link>
      </div>

      <div className="container z-10 relative mx-auto mt-2 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg mx-5 shadow-md p-6 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Boost Your Visibility
          </h2>
          <p className="text-justify">
            Join a network of trusted service providers and get your business
            noticed by thousands of potential customers. Our platform helps you
            stand out and attract more clients looking for quality car
            services. Enhanced business profiles with reviews and ratings.
            Increase your visibility and attract more bookings.
          </p>
        </div>
        <div className="bg-white rounded-lg mx-5 shadow-md p-6 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Simplify Management
          </h2>
          <p className="text-justify">
            Our intuitive dashboard makes it easy to manage your services,
            appointments, and customer interactions. Spend less time on
            administrative tasks and more time doing what you do best. Real-time
            scheduling and booking management. Save time and improve efficiency
            with automated tools.
          </p>
        </div>
        <div className="bg-white rounded-lg shadow-md mx-5 p-6 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Grow Your Revenue
          </h2>
          <p className="text-justify">
            Offer a variety of service packages and upsell premium options to
            your customers. Our platform helps you maximize your revenue
            potential with flexible pricing and package management. Customizable
            service packages. Increase your earnings by offering tailored
            services to meet customer needs.
          </p>
        </div>
      </div>

      <div className="container z-10 relative mx-auto mt-12 bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-2xl font-bold text-black mb-4">
          Empower Your Automotive Service Business
        </h2>
        <p className="text-gray-900 mb-6">
          Join our platform and connect with thousands of car owners looking for
          reliable, high-quality automotive services. Whether you specialize in
          periodic maintenance, AC repair, battery replacement, or any other
          car-related services, our platform provides the tools you need to grow
          your business.
        </p>
      </div>

      <div className="container mx-auto mt-12 bg-white rounded-lg shadow-md p-6 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Why Partner With Us?
        </h2>
        <ul className="list-disc pl-6 text-justify">
          <li>
            Reach more customers: gain visibility to a large and growing customer
            base actively seeking car services.
          </li>
          <li>
            Manage your services: easily add and manage your services and
            packages through our intuitive dashboard.
          </li>
          <li>
            Increase your revenue: boost your income by attracting more
            customers and offering premium services.
          </li>
          <li>
            Real-time scheduling: allow customers to book your services online
            at their convenience.
          </li>
          <li>
            Customer reviews: build your reputation with genuine customer reviews
            and ratings.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ForBusiness;
