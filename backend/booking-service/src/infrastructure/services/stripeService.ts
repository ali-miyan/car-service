import Stripe from "stripe";
import { BadRequestError } from "tune-up-library";

const stripe = new Stripe(
  "sk_test_51Piw5m09257pZrXUKk2nim4wMxF9Jvi5d4DdO9OqPD4zuWhBxmJpXMOI52GsRxrJkJnr63J0mj3jTMKf01dQtTM000kWJUkdVz"
);

export class StripeService {
  async createCheckoutSession(totalPrice: number,orderToken:string | number): Promise<string> {
    const items = [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "Booking Service",
            images: [
              "https://cdni.iconscout.com/illustration/premium/thumb/mechanics-repairing-car-in-service-station-2953459-2451647.png?f=webp",
            ],
          },
          unit_amount: totalPrice * 100,
        },
        quantity: 1,
      },
    ];

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: items,
        mode: "payment",
        success_url: `http://localhost:8080/checkout-success/${orderToken}`,
        cancel_url: "http://localhost:8080/checkout-failure",
      });

      return session.id;
    } catch (error) {
      console.log(error);
      throw new BadRequestError(
        "Error creating Stripe checkout session: " + error
      );
    }
  }
}
