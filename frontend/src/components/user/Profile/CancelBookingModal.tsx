import { useState } from "react";

const CancelBookingModal = ({ onCancel, setShowCancelModal }) => {
  const [cancelReason, setCancelReason] = useState("");
  const [error, setError] = useState("");

  const handleCancel = () => {
    if (!cancelReason.trim()) {
      setError("Please provide a reason for cancellation.");
      return;
    }

    onCancel(cancelReason);
    setCancelReason("");
    setError("");
  };

  return (
    <div className="fixed inset-0 font-bai-regular bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6  shadow-lg max-w-sm w-full">
        <h2 className="text-xl text-center font-bai-bold  mb-4 text-gray-800">
          Cancel Reason
        </h2>
        <textarea
          className="w-full border border-gray-600 p-2 outline-none"
          rows={4}
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
          placeholder="Write your reason here..."
        ></textarea>
        {error && (
          <p className="text-red-500 font-bai-regular lowercase text-xs">
            {error}
          </p>
        )}
        <div className="flex justify-between mt-2">
          <button
            className="px-4 py-2 bg-gray-900 text-white  hover:bg-gray-800 transition duration-200"
            onClick={() => setShowCancelModal(false)}
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-[#ab0000] text-white  hover:bg-[#7f0e0e] transition duration-200"
            onClick={handleCancel}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;
