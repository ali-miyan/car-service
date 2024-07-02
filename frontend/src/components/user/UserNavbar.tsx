import "../../styles/NavbarStyle.css";
import "../../App.css";
import {
  FaPhone,
  FaUser,
  FaMapMarkerAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import BasicModal from "./RegisterModal";
import { Link } from "react-router-dom";

const UserNavbar = () => {
  return (
    <>
      <div className="flex justify-between items-center mr-4 ml-4 mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center mt-5 w-44 border p-2 space-x-2">
            <FaPhone className="text-2xl" />
            <span className="font-bai-regular">call us: +</span>
          </div>
          <div className="flex items-center mt-5 w-44 border p-2 space-x-2">
            <FaMapMarkerAlt className="text-3xl" />
            <span className="font-bai-regular">service center near me!</span>
          </div>
        </div>
        <img
          src="./src/assets/_f91ac4f4-f43a-4549-9339-b2d9e4be63d9.jpeg"
          className="w-32"
          alt=""
        />
        <div className="flex items-center space-x-4">
          <div className="border p-2 font-bai-extra-light flex items-center w-44 space-x-2 mt-5">
            <FaExclamationTriangle className="text-4xl" />
            <span className="font-bai-light text-sm">
              need emergency services?{" "}
              <a href="#" className="text-red-500">
                click here!
              </a>
            </span>
          </div>
          <div className="flex items-center w-44 border p-2 space-x-2 mt-5">
            <FaUser className="text-3xl" />
            <span className="font-bai-regular">
              <BasicModal />
            </span>
          </div>
        </div>
      </div>

      <nav className="bg-gray p-4 mt-5 mb-2 ">
            <div className="flex justify-center space-x-16 font-bai-bold">
                <Link to="/" className="hover:text-gray-700">
                    HOME
                </Link>
                <Link to="/company/services" className="hover:text-gray-700">
                    SERVICES
                </Link>
                <Link to="/company/register-1" className="hover:text-gray-700">
                    FOR BUSINESS
                </Link>
                <Link to="/about-us" className="hover:text-gray-700">
                    ABOUT US
                </Link>
            </div>
        </nav>
    </>
  );
};

export default UserNavbar;