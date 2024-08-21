import Stripe from "stripe";
import { BadRequestError } from "tune-up-library";
import { compressObject } from "../../utils/compressObject";

const stripe = new Stripe(
  "sk_test_51Piw5m09257pZrXUKk2nim4wMxF9Jvi5d4DdO9OqPD4zuWhBxmJpXMOI52GsRxrJkJnr63J0mj3jTMKf01dQtTM000kWJUkdVz",{
    apiVersion:'2024-06-20'
  }
);

export class StripeService {
  async createCheckoutSession(
    totalPrice: number,
    booking: any,
    refund?: boolean
  ): Promise<string> {
    let orderData: any;

    if (refund) {
      orderData = JSON.stringify({booking,refund});
    } else {
      orderData = compressObject(booking) || "";
    }

    console.log(orderData,'first order data');
    

    const items = [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: refund ?  "REFUND PAYMENT" :"BOOK YOUR SERVICE" ,
            images: [
              "https://cdni.iconscout.com/illustration/premium/thumb/mechanics-repairing-car-in-service-station-2953459-2451647.png?f=webp",
            ],
          },
          unit_amount: totalPrice * 100,
        },
        quantity: 1,
      },
    ];

    const successUrl = refund
      ? `http://localhost:8080/company/order-details/${booking.orderId}`
      : `http://localhost:8080/checkout-success`;

    const cancelUrl = refund
      ? `http://localhost:8080/checkout-failure`
      : `http://localhost:8080/company/checkout-failure`;

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        metadata:{ orderData },
        line_items: items,
        mode: "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
      });

      return session.id;
    } catch (error) {
      console.error('Error creating Stripe checkout session:', error);
      throw new BadRequestError(
        "Error creating Stripe checkout session: " + error
      );
    }
  }
}
