import Stripe from "stripe";
import { BadRequestError } from "tune-up-library";
import { compressObject } from "../../utils/compressObject";
require("dotenv").config();

const stripe = new Stripe(process.env.STRIPE_API as string, {
  apiVersion: "2024-06-20",
});

export class StripeService {
  async createCheckoutSession(
    totalPrice: number,
    booking: any,
    refund?: boolean
  ): Promise<string> {
    let orderData: any;

    if (refund) {
      orderData = JSON.stringify({ booking, refund, totalPrice });
    } else {
      orderData = compressObject(booking) || "";
    }

    console.log(orderData, "first order data");

    const items = [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: refund ? "REFUND PAYMENT" : "BOOK YOUR SERVICE",
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
      ? `https://furbar.shop/company/order-details/${booking.orderId}`
      : `https://furbar.shop/checkout-success`;

    const cancelUrl = refund
      ? `https://furbar.shop/checkout-failure`
      : `https://furbar.shop/company/checkout-failure`;

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        metadata: { orderData },
        line_items: items,
        mode: "payment",
        success_url: successUrl,
        cancel_url: cancelUrl,
      });

      return session.id;
    } catch (error) {
      console.error("Error in stripe payment:", error);
      throw new BadRequestError(
        "Error creating Stripe checkout session: " + error
      );
    }
  }
}
