import { useEffect, useMemo, useState } from "react";
import { FaSpinner, FaTimes } from "react-icons/fa";
import { TbMessageDots } from "react-icons/tb";
import "../../../styles/SideBarNotification.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInitialToken } from "../../../helpers/getToken";
import {useBookingSocket} from "../../../service/socketService";
import OrderNotification from "../../common/OrderMessage";
import { IoMdClose } from "react-icons/io";
import { resetOrder } from "../../../context/OrderContext";

const NotificationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const currentPath = useMemo(() => location.pathname, [location.pathname]);

  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  const socket = useBookingSocket();

  useEffect(() => {
    if (socket) {
      socket.on("order_updated", (message: any) => {
        console.log("Message received: ", message);
        const newNotification = {
          message: `${message.message} Status info: ${message.status}`,
          timestamp: new Date().toISOString(),
        };
        setMessage(`${message.message} Status info: ${message.status}`);
        setNotifications((prevNotifications) => [
          newNotification,
          ...prevNotifications,
        ]);
        setHasNotification(true)
        setShowToast(true);
        localStorage.setItem(
          "orderUpdateNotifications",
          JSON.stringify([newNotification, ...notifications])
        );
      });
    }

    return () => {
      if (socket) {
        socket.off("order_updated");
      }
    };
  }, [socket, notifications]);

  useEffect(() => {
    window.scrollTo(0, 0)
    const stored = localStorage.getItem("orderUpdateNotifications");
    if (stored) {
      setNotifications(JSON.parse(stored));
    }
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const token = getInitialToken("userToken");

  const {
    address,
    carModel,
    selectedPackage,
    serviceDate,
    serviceId,
    selectedPlace,
    generalServiceId,
    companyId,
  } = useSelector((state: any) => state.order);

  useEffect(() => {
    const isPending =
      address &&
      carModel &&
      selectedPackage &&
      serviceDate &&
      serviceId &&
      selectedPlace &&
      generalServiceId &&
      companyId;
    setHasNotification(
      isPending &&
        ![
          `/set-spot/${serviceId}`,
          `/service-schedule/${serviceId}`,
          `/checkout/${serviceId}`,
        ].includes(currentPath)
    );
  }, [
    address,
    carModel,
    selectedPackage,
    serviceDate,
    serviceId,
    selectedPlace,
    generalServiceId,
    companyId,
    currentPath,
  ]);

  const handleCloseNotification = () => {
    setShowToast(false);
    setHasNotification(false);
    localStorage.removeItem("orderUpdateNotifications");
    setNotifications([]);
  };

  return (
    <div className="relative z-50">
      {token && (
        <OrderNotification
          show={showToast}
          message={message}
          to="/profile?section=garage"
        />
      )}
      <button
        onClick={toggleModal}
        className="animate-bounce fixed bottom-7 right-4 w-16 h-16 flex items-center justify-center rounded-full bg-[#ab0000] shadow-lg hover:bg-red-900 focus:outline-none"
      >
        <TbMessageDots className="text-white text-2xl" />
        {hasNotification && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-blue-300 rounded-full"></span>
        )}
      </button>

      <div
        className={`modal-overlay ${isOpen ? "modal-overlay-open" : ""}`}
        onClick={toggleModal}
      >
        <div
          className={`modal-content ${isOpen ? "modal-content-open" : ""}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <p className="text-xl font-bai-bold uppercase mx-auto mr-20 underline underline-offset-4 font-semibold text-gray-800">
              Notifications
            </p>
            <button
              aria-label="close modal"
              className="focus:outline-none"
              onClick={toggleModal}
            >
              <FaTimes className="w-4 h-4 text-black" />
            </button>
          </div>

          <div className="mt-8">
            {notifications.length > 0 && (
              <p className="bg-gray-300 border-l-4 border-red-900 text-black p-1 mb-2 text-xs lowercase rounded">
                Order updates
              </p>
            )}
            {notifications.length > 0 &&
              notifications.map((notification, index) => (
                <div
                  key={index}
                  className="p-3 mb-2 bg-red-50 rounded flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <div className="pl-3">
                      <p className="text-sm text-red-900">
                        {notification.message}
                      </p>
                      <p className="text-xs text-black font-bold lowercase">
                        Notification received at{" "}
                        {new Date(notification.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <button
                    className="px-2 py-2 lowercase bg-black text-white text-xs"
                    onClick={() => {
                      handleCloseNotification();
                      navigate(`/profile?section=garage`);
                    }}
                  >
                    Show
                  </button>
                  <button
                    className="ml-2 px-2 py-2 lowercase bg-red-900 text-white"
                    onClick={() => {
                      setNotifications((prevNotifications) =>
                        prevNotifications.filter((_, i) => i !== index)
                      );
                      localStorage.setItem(
                        "orderUpdateNotifications",
                        JSON.stringify(
                          notifications.filter((_, i) => i !== index)
                        )
                      );
                    }}
                  >
                    <IoMdClose />
                  </button>
                </div>
              ))}
            {notifications.length == 0 && !hasNotification && (
              <p className="text-center text-gray-500">No notifications</p>
            )}
          </div>
          <div className="mt-2">
            {hasNotification && (
              <>
                <p className="bg-gray-300 border-l-4 border-yellow-600 text-black p-1 mb-2 text-xs lowercase rounded">
                  Order pendings
                </p>
                <div className="p-3 bg-yellow-100 rounded flex items-center justify-between">
                  <div className="flex items-center">
                    <FaSpinner className="w-8 h-8 text-yellow-600 animate-spin" />
                    <div className="pl-3">
                      <p className="text-sm text-yellow-800">
                        Your order is pending. Please complete your order.
                      </p>
                      <p className="text-xs text-gray-500">
                        Pending action required
                      </p>
                    </div>
                  </div>
                  <button
                    className="px-2 text-xs py-2 lowercase bg-yellow-700 text-white"
                    onClick={() => {
                      navigate(`/checkout/${serviceId}`);
                    }}
                  >
                    Proceed
                  </button>
                  <button
                    className="ml-2 px-2 py-2 lowercase bg-red-900 text-white"
                    onClick={() => {
                      dispatch(resetOrder());
                    }}
                  >
                    <IoMdClose />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
