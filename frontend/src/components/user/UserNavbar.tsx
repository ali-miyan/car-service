import "../../styles/NavbarStyle.css";
import { Link, useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import BasicModal from "./RegisterModal";
import {
  FaFacebook,
  FaTwitter,
  FaGooglePlusG,
  FaLinkedin,
  FaPinterest,
  FaYoutube,
  FaHeart,
  FaShoppingCart,
  FaUserCircle,
} from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ServiceMap from "./serviceMap";
import { getInitialToken } from "../../helpers/getToken";

const UserNavbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMap, setShowMap] = useState<boolean>(false);

  const location = useLocation();

  const currentPath = useMemo(() => location.pathname, [location.pathname]);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMapClose = () => {
    setShowMap(false);
  };

  const token = getInitialToken("userToken");

  const handleMap = () => {
    setShowMap(true);
  };

  return (
    <>
      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <button
            className="absolute top-4 right-4 text-white text-4xl"
            onClick={handleMapClose}
          >
            <IoIosCloseCircleOutline />
          </button>
          <ServiceMap />
        </div>
      )}
      <header className="w-full bg-red-900 font-bai-regular text-white">
        <div className="flex justify-around items-center py-2 px-4 lg:px-8">
          <div className="flex items-center space-x-2 lg:space-x-4">
            <a href="#" className="text-xl text-white">
              <FaFacebook />
            </a>
            <a href="#" className="text-xl text-white">
              <FaTwitter />
            </a>
            <a href="#" className="text-xl text-white">
              <FaGooglePlusG />
            </a>
            <a href="#" className="text-xl text-white">
              <FaLinkedin />
            </a>
            <a href="#" className="text-xl text-white">
              <FaPinterest />
            </a>
            <a href="#" className="text-xl text-white">
              <FaYoutube />
            </a>
          </div>
          <div className="hidden lg:flex items-center space-x-2 lg:space-x-4">
            <Link to="/login" className="text-white">
              Login
            </Link>
            <span className="text-white">/</span>
            <Link to="/register" className="text-white">
              Register
            </Link>
          </div>
        </div>
        <div className="flex items-center justify-around py-4 px-4 lg:px-8 bg-gray-900 text-red-900">
          <div className="flex items-center space-x-4">
            <img
              src="../../../public/assets/_f91ac4f4-f43a-4549-9339-b2d9e4be63d9.jpeg"
              alt="Ripara"
              className="h-20"
            />
          </div>
          <nav className="hidden lg:flex items-center space-x-4">
            <Link
              to="/"
              className={`text-white font-bai-regular px-3 py-2 custom-underline ${
                currentPath === "/home" ? "active" : ""
              }`}
            >
              HOME
            </Link>

            <Link
              to="/services"
              className={`text-white font-bai-regular px-3 py-2 custom-underline ${
                currentPath === "/services" ? "active" : ""
              }`}
            >
              SERVICES
            </Link>

            <Link
              to="/for-business"
              className={`text-white font-bai-regular px-3 py-2 custom-underline ${
                currentPath === "/for-business" ? "active" : ""
              }`}
            >
              FOR BUSINESS
            </Link>

            <Link
              to="/about-us"
              className={`text-white font-bai-regular px-3 py-2 custom-underline ${
                currentPath === "/about-us" ? "active" : ""
              }`}
            >
              ABOUT US
            </Link>
          </nav>

          <div className="flex items-center text-white space-x-4">
            {token ? (
              <Link to={"/profile"}>
                <div className="flex justify-start">
                  <FaUserCircle className="w-8 h-8 cursor-pointer" />
                </div>
              </Link>
            ) : (
              <FaUserCircle
                className="w-8 h-8 cursor-pointer"
                onClick={handleModalOpen}
              />
            )}
            <button
              className="text-3xl text-gray-900 lg:hidden"
              onClick={handleMenuToggle}
            >
              &#9776;
            </button>
          </div>
        </div>

        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:hidden absolute top-16 left-0 w-full bg-white text-center`}
        >
          <Link
            to="/"
            className="block py-2 hover:bg-red-500"
            onClick={handleMenuToggle}
          >
            HOME
          </Link>
          <Link
            to="/company/services"
            className="block py-2 hover:bg-red-500"
            onClick={handleMenuToggle}
          >
            SERVICES
          </Link>
          <Link
            to="/for-business"
            className="block py-2 hover:bg-red-500"
            onClick={handleMenuToggle}
          >
            FOR BUSINESS
          </Link>
          <Link
            to="/about-us"
            className="block py-2 hover:bg-red-500"
            onClick={handleMenuToggle}
          >
            ABOUT US
          </Link>
        </div>
      </header>

      {isModalOpen && (
        <BasicModal isOpen={isModalOpen} onClose={handleModalClose} />
      )}
    </>
  );
};

export default UserNavbar;
