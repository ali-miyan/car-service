import { Router } from "express";
import { authMiddleware } from "tune-up-library";
import Stripe from "stripe";
import { BookingController } from "../../adapters/bookingController";
import { BookingUseCase } from "../../usecases";
import { BookingRepository } from "../../repositories";
const stripe = new Stripe(
  "sk_test_51Piw5m09257pZrXUKk2nim4wMxF9Jvi5d4DdO9OqPD4zuWhBxmJpXMOI52GsRxrJkJnr63J0mj3jTMKf01dQtTM000kWJUkdVz"
);

const bookingRepository = new BookingRepository()
const bookingUseCase = new BookingUseCase(bookingRepository)
const bookingController = new BookingController(bookingUseCase)

const router = Router();

router.post("/booking", async (req, res) => {
  console.log("hi");
  const items = [
    {
      price_data: {
        currency: "usd",
        product_data: {
          name: "ali",
          images: ["image.jpg"],
        },
        unit_amount: 3000,
      },
      quantity: 3,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items,
    mode: "payment",
    success_url: "https://your-domain.com/success",
    cancel_url: "https://your-domain.com/success",
  });
  res.json({ id: session.id });
});

router.post("/booking",authMiddleware(['user']), (req, res, next) =>
  bookingController.signup(req,res,next)
);
export default router;
