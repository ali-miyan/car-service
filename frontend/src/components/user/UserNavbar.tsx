import "../../styles/NavbarStyle.css";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import BasicModal from "./RegisterModal";
import { FaRegCircleUser, FaLocationDot, FaCross } from "react-icons/fa6";
import extractToken from "../../helpers/extractToken";
import { getInitialToken } from "../../helpers/getToken";
import { IoIosCloseCircleOutline } from "react-icons/io";

import ServiceMap from "./serviceMap";

const UserNavbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMap, setShowMap] = useState<boolean>(false);

  const mapRef = useRef()

  const token = getInitialToken("userToken");

  const userName = extractToken(token);

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

  const handleMap = () =>{
    setShowMap(true)
  }

  return (
    <>
      {showMap && (
        <div className="overlay">
          <button className="close-btn" onClick={handleMapClose}>
            <IoIosCloseCircleOutline  className="w-6 h-6" />
          </button>
          <ServiceMap />
        </div>
      )}
      <div className="w-full">
        <div className="flex w-full">
          <div className="w-1/12">
            <div className="mt-8 ml-8">
              <FaLocationDot
                className="w-8 h-8 cursor-pointer"
                onClick={handleMap}
              />
            </div>
          </div>
          <nav className="navbar font-bai-regular w-10/12">
            <div className="navbar-toggle" onClick={handleMenuToggle}>
              &#9776;
            </div>
            <div className={`navbar-links ${isMenuOpen ? "open" : ""}`}>
              <Link to="/" className="navbar-link">
                HOME
              </Link>
              <Link to="/company/services" className="navbar-link">
                SERVICES
              </Link>
              <Link to="/for-business" className="navbar-link">
                FOR BUSINESS
              </Link>
              <Link to="/about-us" className="navbar-link">
                ABOUT US
              </Link>
            </div>
          </nav>
          <div className="w-1/12 mt-8">
            {token ? (
              <Link to={"/profile"}>
                <div className="flex justify-start">
                  <FaRegCircleUser className="w-8 h-8 cursor-pointer" />
                  <span className="ml-1">{userName && userName}</span>
                </div>
              </Link>
            ) : (
              <FaRegCircleUser
                className="w-8 h-8 cursor-pointer"
                onClick={handleModalOpen}
              />
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <BasicModal isOpen={isModalOpen} onClose={handleModalClose} />
      )}
    </>
  );
};

export default UserNavbar;
