import { Router } from "express";
import { authMiddleware } from "tune-up-library";
import Stripe from "stripe";
import { BookingController } from "../../adapters/bookingController";
import { BookingUseCase } from "../../usecases";
import { BookingRepository } from "../../repositories";
import { StripeService } from "../services";
import { UpdateBookingStatusUseCase } from "../../usecases/updateBookingUseCase";
const stripe = new Stripe(
  "sk_test_51Piw5m09257pZrXUKk2nim4wMxF9Jvi5d4DdO9OqPD4zuWhBxmJpXMOI52GsRxrJkJnr63J0mj3jTMKf01dQtTM000kWJUkdVz"
);

const bookingRepository = new BookingRepository()
const stripeService = new StripeService()
const updateBookingStatusUseCase = new UpdateBookingStatusUseCase(bookingRepository)
const bookingUseCase = new BookingUseCase(bookingRepository,stripeService)
const bookingController = new BookingController(bookingUseCase,updateBookingStatusUseCase)

const router = Router();

router.post("/booking",authMiddleware(['user']), (req, res, next) =>
  bookingController.signup(req,res,next)
);
router.post("/update-booking",authMiddleware(['user']), (req, res, next) =>
  bookingController.updateStatus(req,res,next)
);
export default router;
