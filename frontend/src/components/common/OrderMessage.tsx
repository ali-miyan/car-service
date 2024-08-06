import React, { useEffect } from "react";
import { Link } from "react-router-dom";

interface OrderNOtificationProps {
  show: boolean;
  message: string;
  onClose: () => void;
  to : string
}

const OrderNOtification: React.FC<OrderNOtificationProps> = ({
  show,
  message,
  onClose,
  to
}) => {
    useEffect(() => {
      if (show) {
        const timer = setTimeout(() => {
          onClose();
        }, 10000);
        return () => clearTimeout(timer);
      }
    }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className="fixed top-4 left-1/2 z-50 transform -translate-x-1/2 w-full max-w-xs p-4 text-gray-500 bg-white rounded-lg shadow"
      role="alert"
    >
      <div className="flex">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-900 bg-red-100 rounded-lg">
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"
            />
          </svg>
          <span className="sr-only">Notification icon</span>
        </div>
        <div className="ms-3 text-sm font-normal">
          <span className="mb-1 text-sm font-semibold text-gray-900">
            Notification
          </span>
          <div className="mb-2 text-sm font-normal">{message}</div>
          <div className="w-full text-center">
            <Link to={to}><button className="px-4 py-1 mr-4 text-white bg-red-500 hover:bg-red-600">
              show
            </button>
            </Link>
            <button onClick={onClose} className="px-4 py-1  text-white bg-black hover:bg-gray-800">
              close
            </button>
          </div>
        </div>

        <button
          type="button"
          className="ms-auto -mx-1.5 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
          onClick={onClose}
          aria-label="Close"
        >
          <span className="sr-only">Close</span>
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default OrderNOtification;
