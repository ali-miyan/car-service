import { useEffect, useMemo, useState } from "react";
import { FaPlane, FaSpinner, FaTimes } from "react-icons/fa";
import { TbMessageDots } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import "../../../styles/SideBarNotification.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getInitialToken } from "../../../helpers/getToken";
import { useBookingSocket } from "../../../service/socketService";
import OrderNotification from "../../common/OrderMessage";
import { resetOrder } from "../../../context/OrderContext";
import { useGetApprovedCompanyQuery } from "../../../store/slices/companyApiSlice";
import { BsSendFill } from "react-icons/bs";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const NotificationModal = () => {
  const { data } = useGetApprovedCompanyQuery({});

  const [isOpen, setIsOpen] = useState(false);
  const [hasNotification, setHasNotification] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [activeSection, setActiveSection] = useState<"chat" | "notifications">(
    "notifications"
  );
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentPath = useMemo(() => location.pathname, [location.pathname]);

  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState("");

  const socket = useBookingSocket();

  useEffect(() => {
    if (socket) {
      socket.on("order_updated", (message: any) => {
        const newNotification = {
          message: `${message.message} Status info: ${message.status}`,
          timestamp: new Date().toISOString(),
        };
        setMessage(`${message.message} Status info: ${message.status}`);
        setNotifications((prevNotifications) => [
          newNotification,
          ...prevNotifications,
        ]);
        setHasNotification(true);
        setShowToast(true);
        localStorage.setItem(
          "orderUpdateNotifications",
          JSON.stringify([newNotification, ...notifications])
        );
      });

      socket.on("chat_message", (message: any) => {
        if (selectedCompany && message.companyId === selectedCompany._id) {
          setChatMessages((prevMessages) => [...prevMessages, message]);
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("order_updated");
        socket.off("chat_message");
      }
    };
  }, [socket, notifications, selectedCompany]);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  const handleSendMessage = () => {
    if (selectedCompany && newMessage.trim()) {
      const messageData = {
        companyId: selectedCompany._id,
        content: newMessage,
        timestamp: new Date().toISOString(),
      };
      
    }
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
            <div>
              <p className="text-black ml-28 font-bai-medium underline underline-offset-4">
                Chat and Notification
              </p>
            </div>
            <button
              aria-label="close modal"
              className="focus:outline-none"
              onClick={toggleModal}
            >
              <FaTimes className="w-4 h-4 text-black" />
            </button>
          </div>

          <div className="flex mt-4 justify-center w-full">
            <button
              className={`px-4 py-2 border-b-2 ${
                activeSection === "notifications"
                  ? "border-red-900 text-red-900"
                  : "border-transparent text-gray-600"
              } w-full transition-colors duration-300`}
              onClick={() => setActiveSection("notifications")}
            >
              Notifications
            </button>
            <button
              className={`px-4 py-2 border-b-2 ${
                activeSection === "chat"
                  ? "border-red-900 text-red-900"
                  : "border-transparent text-gray-600"
              } w-full transition-colors duration-300`}
              onClick={() => setActiveSection("chat")}
            >
              Chat
            </button>
          </div>

          <div className="mt-8">
            {activeSection === "notifications" && (
              <>
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
                            {new Date(
                              notification.timestamp
                            ).toLocaleTimeString()}
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
                {notifications.length === 0 && !hasNotification && (
                  <p className="text-center text-gray-500">No notifications</p>
                )}
              </>
            )}

            {activeSection === "chat" && (
              <div>
                {selectedCompany ? (
                  <div className="max-w-4xl mx-auto bg-white shadow-md overflow-hidden">
                    <div className="flex flex-col h-full">
                      <div className="flex items-center px-4 py-2 bg-white border-b border-gray-200">
                        <span className="pr-4">
                          <IoArrowBackCircleOutline
                            className="text-3xl text-black"
                            onClick={() => setSelectedCompany(null)}
                          />
                        </span>

                        <img
                          src={selectedCompany.logo}
                          alt={`${selectedCompany.companyName} logo`}
                          className="w-16 h-16 object-cover rounded-full border border-gray-300"
                        />
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {selectedCompany.companyName}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">online</p>
                        </div>
                      </div>

                      <div className="flex-1 min-h-96 overflow-y-auto p-4 border-t border-gray-200">
                        {chatMessages.length > 0 ? (
                          chatMessages.map((msg, index) => (
                            <div key={index} className="mb-2 text-center">
                              <p className="text-sm text-gray-900">
                                {msg.content}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(msg.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-center text-gray-500">
                            No messages yet.
                          </p>
                        )}
                      </div>

                      <div className="flex items-center border-t border-gray-200 p-2 bg-white">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 p-2 border text-black border-gray-300 shadow-sm rounded-md"
                        />
                        <button
                          onClick={handleSendMessage}
                          className="ml-2 p-2 text-white transition-colors bg-[#ab0000] hover:bg-[#900000] rounded-md"
                        >
                          <BsSendFill size={25} />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-4xl mx-auto">
                    <div className="mb-4">
                      <input
                        type="text"
                        placeholder="Search companies..."
                        className="w-full p-2 border text-black border-gray-300 rounded-md shadow-sm"
                      />
                    </div>
                    <ul className="divide-y divide-gray-200 mt-4">
                      {data && data.length > 0 ? (
                        data.map((company) => (
                          <li
                            key={company._id}
                            className="flex items-center p-4 hover:bg-gray-100 cursor-pointer transition duration-200 ease-in-out"
                            onClick={() => setSelectedCompany(company)}
                          >
                            <div className="flex-shrink-0 mr-4">
                              <img
                                src={company.logo}
                                alt={`${company.companyName} logo`}
                                className="w-14 h-14 object-cover rounded-full"
                              />
                            </div>
                            <div className="flex-grow">
                              <h3 className="text-lg font-medium text-gray-900">
                                {company.companyName}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                Since {company.year}
                              </p>
                            </div>
                          </li>
                        ))
                      ) : (
                        <p className="text-center text-gray-500 mt-4">
                          No companies available
                        </p>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {hasNotification && activeSection === "notifications" && (
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
