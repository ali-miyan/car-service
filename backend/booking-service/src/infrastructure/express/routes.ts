import { Router } from "express";
import { authMiddleware } from "tune-up-library";
import Stripe from "stripe";
import { BookingController } from "../../adapters/bookingController";
import { BookingUseCase, GetBookingUseCase, GetSingleBookingUseCase } from "../../usecases";
import { BookingRepository } from "../../repositories";
import { StripeService } from "../services";
import { UpdateBookingStatusUseCase } from "../../usecases/updateBookingUseCase";

const bookingRepository = new BookingRepository()
const stripeService = new StripeService()
const updateBookingStatusUseCase = new UpdateBookingStatusUseCase(bookingRepository)
const getBookingUseCase = new GetBookingUseCase(bookingRepository)
const getSingleBookingUseCase = new GetSingleBookingUseCase(bookingRepository)
const bookingUseCase = new BookingUseCase(bookingRepository,stripeService)
const bookingController = new BookingController(bookingUseCase,updateBookingStatusUseCase,getBookingUseCase,getSingleBookingUseCase)

const router = Router();

router.get("/get-bookings/:id",authMiddleware(['company']), (req, res, next) =>
  bookingController.getBookings(req,res,next)
);
router.get("/get-single-order/:id",authMiddleware(['company']), (req, res, next) =>
  bookingController.getSingleBooking(req,res,next)
);
router.post("/booking",authMiddleware(['user']), (req, res, next) =>
  bookingController.signup(req,res,next)
);
router.post("/update-booking",authMiddleware(['user']), (req, res, next) =>
  bookingController.updateStatus(req,res,next)
);
export default router;
