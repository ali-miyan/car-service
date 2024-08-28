import { Router } from "express";
import { authMiddleware } from "tune-up-library";
import { createBookingController } from "../../adapters";

const bookingController = createBookingController();

const router = Router();

router.get("/get-bookings/:id",
  authMiddleware(["company"]),
  (req, res, next) =>
  bookingController.getBookings(req, res, next)
);

router.get(
  "/get-single-order/:id",
  authMiddleware(["company", "user"]),
  (req, res, next) =>
  bookingController.getSingleBooking(req, res, next)
);

router.get(
  "/get-users-order/:id",
  authMiddleware(["company", "user"]),
  (req, res, next) =>
  bookingController.getUsersBooking(req, res, next)
);

router.post("/booking", 
  (req, res, next) =>
  bookingController.signup(req, res, next)
);

router.post("/handle-stripe",
  (req, res, next) =>
  bookingController.handleStripe(req, res, next)
);

router.post("/refund",
  (req, res, next) =>
  bookingController.refundToUser(req, res, next)
);

router.post("/cancel-booking",
  (req, res, next) =>
  bookingController.cancelBooking(req, res, next)
);

router.post(
  "/update-booking-status",
  authMiddleware(["company"]),
  (req, res, next) =>
  bookingController.updateStatus(req, res, next)
);

router.post(
  "/update-driver-location",
  authMiddleware(["company"]),
  (req, res, next) =>
  bookingController.updateDriversLocation(req, res, next)
);

router.get(
  "/get-live-location/:id",
  authMiddleware(["user"]),
  (req, res, next) =>
  bookingController.getLiveLocation(req, res, next)
);

router.get(
  "/get-monthly-revenue/:id",
  authMiddleware(["company"]),
  (req, res, next) =>
  bookingController.getMonthlyRevenue(req, res, next)
);

export default router;
