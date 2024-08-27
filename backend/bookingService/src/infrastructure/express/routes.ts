import { Router } from "express";
import { authMiddleware } from "tune-up-library";
import Stripe from "stripe";
import { BookingController } from "../../adapters/bookingController";
import {
  BookingUseCase,
  GetBookingUseCase,
  GetLiveLocationUseCase,
  GetDashboardUseCase,
  GetSingleBookingUseCase,
  GetUsersBookingUseCase,
  UpdateDriverLocationUseCase,
  UpdateStatusUseCase,
  CancelBookingUseCase,
  HandleStripeUseCase,
  RefundUseCase,
} from "../../usecases";
import {
  BookingRepository,
  RedisOtpRepository,
  UserRepository,
} from "../../repositories";
import { StripeService } from "../services";
import { RabbitMQService } from "../rabbitMQ/rabbitMQConfig";

const bookingRepository = new BookingRepository();
const redisRepository = new RedisOtpRepository();
const userRepository = new UserRepository();
const stripeService = new StripeService();

const updateDriverLocationUseCase = new UpdateDriverLocationUseCase(
  redisRepository
);
const updateStatusUseCase = new UpdateStatusUseCase(bookingRepository);
const getBookingUseCase = new GetBookingUseCase(bookingRepository);
const cancelBookingUseCase = new CancelBookingUseCase(bookingRepository);
const getSingleBookingUseCase = new GetSingleBookingUseCase(
  bookingRepository,
  userRepository
);
const getLiveLocationUseCase = new GetLiveLocationUseCase(redisRepository);
const getUsersBookingUseCase = new GetUsersBookingUseCase(bookingRepository);
const refundUseCase = new RefundUseCase(stripeService);
const getMonthlyRevenueUseCase = new GetDashboardUseCase(
  bookingRepository,
  userRepository
);
const rabbitMQService = new RabbitMQService();
const bookingUseCase = new BookingUseCase(
  bookingRepository,
  stripeService,
  rabbitMQService
);
const handleStripeUseCase = new HandleStripeUseCase(
  bookingRepository,
  rabbitMQService
);
const bookingController = new BookingController(
  bookingUseCase,
  getBookingUseCase,
  getSingleBookingUseCase,
  updateStatusUseCase,
  getUsersBookingUseCase,
  updateDriverLocationUseCase,
  getLiveLocationUseCase,
  getMonthlyRevenueUseCase,
  cancelBookingUseCase,
  handleStripeUseCase,
  refundUseCase
);

const router = Router();

router.get("/get-bookings/:id", authMiddleware(["company"]), (req, res, next) =>
  bookingController.getBookings(req, res, next)
);
router.get(
  "/get-single-order/:id",
  authMiddleware(["company", "user"]),
  (req, res, next) => bookingController.getSingleBooking(req, res, next)
);
router.get(
  "/get-users-order/:id",
  authMiddleware(["company", "user"]),
  (req, res, next) => bookingController.getUsersBooking(req, res, next)
);
router.post("/booking", (req, res, next) =>
  bookingController.signup(req, res, next)
);
router.post("/handle-stripe", (req, res, next) =>
  bookingController.handleStripe(req, res, next)
);
router.post("/refund", (req, res, next) =>
  bookingController.refundToUser(req, res, next)
);
router.post("/cancel-booking", (req, res, next) =>
  bookingController.cancelBooking(req, res, next)
);
router.post(
  "/update-booking-status",
  authMiddleware(["company"]),
  (req, res, next) => bookingController.updateStatus(req, res, next)
);
router.post(
  "/update-driver-location",
  authMiddleware(["company"]),
  (req, res, next) => bookingController.updateDriversLocation(req, res, next)
);
router.get(
  "/get-live-location/:id",
  authMiddleware(["user"]),
  (req, res, next) => bookingController.getLiveLocation(req, res, next)
);
router.get(
  "/get-monthly-revenue/:id",
  authMiddleware(["company"]),
  (req, res, next) => bookingController.getMonthlyRevenue(req, res, next)
);

export default router;
