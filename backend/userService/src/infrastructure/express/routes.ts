import { Router } from "express";
import { carController, userController } from "../../adapters/controllers";
import { authMiddleware } from "tune-up-library";
import multer from "multer";

const router = Router();
const upload = multer();

router.post("/register",
  (req, res, next) =>
  userController.signup(req, res, next)
);

router.post("/resend-otp",
  (req, res, next) =>
  userController.resendOtp(req, res, next)
);

router.post("/verify-otp",
  (req, res, next) =>
  userController.verifyOtp(req, res, next)
);

router.post("/login",
  (req, res, next) =>
  userController.login(req, res, next)
);

router.post("/google-register",
  (req, res, next) =>
  userController.googleRegister(req, res, next)
);

router.post("/reset-request",
  (req, res, next) =>
  userController.forgetPassword(req, res, next)
);

router.patch("/change-password",
  (req, res, next) =>
  userController.changePassword(req, res, next)
);

router.get("/get-users",
  authMiddleware(["admin"]), (req, res, next) =>
  userController.getUser(req, res, next)
);

router.get("/get-dashboard",
  authMiddleware(["admin"]),
  (req, res, next) =>
  userController.getDashboard(req, res, next)
);

router.get("/get-user/:id",
  authMiddleware(["user"]),
  (req, res, next) =>
  userController.getUserById(req, res, next)
);

router.patch(
  "/update-status/:id",
  authMiddleware(["admin"]),
  (req, res, next) => userController.updateUser(req, res, next)
);

router.post(
  "/edit-user",
  upload.single("image"),
  authMiddleware(["user"]),
  (req, res, next) => userController.editUser(req, res, next)
);

router.post("/add-car",
  authMiddleware(["user"]),
  (req, res, next) =>
  carController.addCar(req, res, next)
);

router.get("/get-car/:id",
  authMiddleware(["user"]),
  (req, res, next) =>
  carController.getCar(req, res, next)
);

router.get("/get-one-car/:id",
  authMiddleware(["user"]), 
  (req, res, next) =>
  carController.getOneCar(req, res, next)
);

router.delete("/delete-car/:id", 
  authMiddleware(["user"]), 
  (req, res, next) =>
  carController.deleteCar(req, res, next)
);

router.patch("/update-password", 
  authMiddleware(["user"]), 
  (req, res, next) =>
  userController.updatePassword(req, res, next)
);

router.post("/add-rating", 
  authMiddleware(["user"]), 
  (req, res, next) =>
  userController.addRating(req, res, next)
);

export default router;
