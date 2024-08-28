import { Router } from "express";
import { authMiddleware } from "tune-up-library";
import { setupDependencies } from "../../adapters/controllers";
import multer from "multer";
const upload = multer();

const router = Router();
const { adminController, serviceController } = setupDependencies();

router.post("/login",
  (req, res, next) =>
  adminController.signup(req, res, next)
);

router.post(
  "/add-service",
  authMiddleware(["admin"]),
  upload.single("image"),
  (req, res, next) =>
  serviceController.addService(req, res, next)
);

router.get("/get-service",
  (req, res, next) =>
  serviceController.getService(req, res, next)
);

router.delete(
  "/delete-service/:id",
  authMiddleware(["admin"]),
  (req, res, next) =>
  serviceController.deleteService(req, res, next)
);

router.patch(
  "/services-status/:id",
  authMiddleware(["admin"]),
  (req, res, next) =>
  serviceController.updateStatus(req, res, next)
);

export default router;
