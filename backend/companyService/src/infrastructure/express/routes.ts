import { Router } from "express";
import multer from "multer";
import { authMiddleware } from "tune-up-library";
import {
  companyController,
  serviceController,
  ratingController,
} from "../../adapters";

const upload = multer();
const router = Router();

router.post("/login",
  (req, res, next) =>
  companyController.login(req, res, next)
);

router.post("/register",
  upload.array("image", 3),
  (req, res, next) =>
  companyController.signup(req, res, next)
);

router.get("/get-approvals",
  (req, res, next) =>
  companyController.getApprovels(req, res, next)
);

router.get("/get-company/:id",
  (req, res, next) =>
  companyController.getById(req, res, next)
);

router.get("/get-approved-company",
  (req, res, next) =>
  companyController.getApproved(req, res, next)
);

router.patch(
  "/company-status/:id",
  authMiddleware(["admin"]),
  (req, res, next) =>
  companyController.updateCompanyStatus(req, res, next)
);

router.post(
  "/add-service",
  authMiddleware(["company"]),
  upload.array("images"),
  (req, res, next) => serviceController.addService(req, res, next)
);

router.get("/get-services/:id",
  authMiddleware(["company"]),
  (req, res, next) =>
  serviceController.getService(req, res, next)
);

router.get("/get-dashboard",
  authMiddleware(["admin"]),
  (req, res, next) =>
  companyController.getDashboard(req, res, next)
);

router.get("/get-all-services",
  (req, res, next) =>
  serviceController.getAllServices(req, res, next)
);

router.get("/get-single-service/:id",
  (req, res, next) =>
  serviceController.getSingleServices(req, res, next)
);

router.get("/get-ratings/:id",
  (req, res, next) =>
  ratingController.getRatings(req, res, next)
);

router.post("/update-rating",
  (req, res, next) =>
  ratingController.updateRating(req, res, next)
);

router.delete(
  "/delete-service/:id",
  authMiddleware(["company"]),
  (req, res, next) => serviceController.deleteService(req, res, next)
);

router.patch(
  "/services-status/:id",
  authMiddleware(["company"]),
  (req, res, next) => serviceController.updateStatus(req, res, next)
);

export default router;
