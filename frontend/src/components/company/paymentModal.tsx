import { loadStripe } from "@stripe/stripe-js";
import { useRefundToUserMutation } from "../../store/slices/orderApiSlice";

const RefundModal = ({ setIsModalOpen, refundAmount, userId, orderId }:any) => {
  const [refundToUser] = useRefundToUserMutation({});

  const handleRefund = async () => {
    
    const stripe = await loadStripe(
      "pk_test_51Piw5m09257pZrXUfjcIjUSkygdRNTNDHFqlBmMhALAMzXeZIhrA9dUspnnBGWaIFg9rOsSuYVHcFMAO1qsiRvXu00FVZc6hg5"
    );

    const res = await refundToUser({ userId, orderId, refundAmount }).unwrap();

    console.log(res,'resss');
    

    stripe?.redirectToCheckout({
      sessionId: res,
    });


    console.log(res);
    if (res.success) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 font-bai-regular bg-black bg-opacity-40 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 shadow-lg max-w-sm w-full">
        <h2 className="text-xl text-center font-bai-bold mb-4 text-gray-800">
          Process Refund
        </h2>
        <p className="mb-4 text-center text-gray-600">
          You are about to refund <strong>₹{refundAmount}</strong> back to the
          users's wallet.
        </p>

        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 mr-4 bg-gray-900 text-white hover:bg-gray-800 transition duration-200"
            onClick={() => setIsModalOpen(false)}
          >
            Close
          </button>
          <button
            className="px-4 py-2 bg-[#ab0000] text-white hover:bg-[#7f0e0e] transition duration-200"
            onClick={handleRefund}
          >
            Confirm Refund
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefundModal;
