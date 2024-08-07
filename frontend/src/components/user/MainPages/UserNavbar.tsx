import "../../../styles/NavbarStyle.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import BasicModal from "../Registeration/RegisterModal";
import {
  FaFacebook,
  FaTwitter,
  FaGooglePlusG,
  FaLinkedin,
  FaPinterest,
  FaYoutube,
  FaUserCircle,
} from "react-icons/fa";
import { IoIosCloseCircleOutline } from "react-icons/io";
import ServiceMap from "./serviceMap";
import { getInitialToken } from "../../../helpers/getToken";
import { FaMapMarkedAlt } from "react-icons/fa";
import useSocket from "../../../service/socketService";
import OrderNOtification from "../../common/OrderMessage";
import NotificationModal from "./SideNotifacation";
import { ReactNotifications } from "react-notifications-component";

const UserNavbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMap, setShowMap] = useState<boolean>(false);
 

  const location = useLocation();
  const currentPath = useMemo(() => location.pathname, [location.pathname]);

  console.log(currentPath, "current path");

  useEffect(() => {
    if (location.state && location.state.openModal) {
      setIsModalOpen(true);
    }
  }, [location.state]);

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
      <ReactNotifications />
      {showMap && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <button
            className="absolute top-14 z-50 right-3 text-black text-4xl"
            onClick={handleMapClose}
          >
            <IoIosCloseCircleOutline />
          </button>
          <ServiceMap />
        </div>
      )}
      <header className="w-full bg-[#ab0000] font-bai-regular text-white">
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
        <div className="flex items-center justify-around p-6 lg:px-8 bg-gray-900">
          <div
            onClick={handleMap}
            className="items-center cursor-pointer space-x-4"
          >
            <FaMapMarkedAlt className="text-2xl mx-auto mr-8" />
            <button className="mx-auto text-white text-xs">
              services near me
            </button>
          </div>
          <nav className="hidden lg:flex items-center space-x-4">
            <Link
              to="/"
              className={`text-white font-bai-regular px-3 py-2 custom-underline ${
                currentPath === "/" ? "active" : ""
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
              <Link to={"/profile?section=car"}>
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
            <NotificationModal />
          </div>
        </div>

        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:hidden absolute top-16 left-0 w-full bg-white text-center`}
        >
          <Link
            to="/"
            className="block py-2 hover:bg-[#ab0000]"
            onClick={handleMenuToggle}
          >
            HOME
          </Link>
          <Link
            to="/company/services"
            className="block py-2 hover:bg-[#ab0000]"
            onClick={handleMenuToggle}
          >
            SERVICES
          </Link>
          <Link
            to="/for-business"
            className="block py-2 hover:bg-[#ab0000]"
            onClick={handleMenuToggle}
          >
            FOR BUSINESS
          </Link>
          <Link
            to="/about-us"
            className="block py-2 hover:bg-[#ab0000]"
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
