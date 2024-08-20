import { Router } from "express";
import {
  CompanyController,
  RatingController,
  ServiceController,
} from "../../adapters/controllers";
import {
  RegisterUseCase,
  LoginUseCase,
  GetApprovalUseCase,
  UpdateStatusUseCase,
  GetByIdUseCase,
  AddServiceUseCase,
  ServiceStatusUseCase,
  GetServiceUseCase,
  DeleteServiceUseCase,
  GetAllServicesUseCase,
  GetSignleServicesUseCase,
  GetApprovedCompanyUseCase,
  GetRatingsUseCase,
  UpdateRatingUseCase,
  GetDashboardUseCase,
} from "../../usecases";
import {
  CompanyRepository,
  RatingRepository,
  ServiceRepository,
} from "../../repositories/implementation";
import { S3Service } from "../../infrastructure/services";
import multer from "multer";
import { authMiddleware } from "tune-up-library";
const upload = multer();

const companyRepository = new CompanyRepository();
const serviceRepository = new ServiceRepository();
const ratingRepository = new RatingRepository();
const s3Service = new S3Service();

const signupUseCase = new RegisterUseCase(companyRepository, s3Service);
const getServiceUseCase = new GetServiceUseCase(serviceRepository);
const getAllServiceUseCase = new GetAllServicesUseCase(serviceRepository);
const getSignleServicesUseCase = new GetSignleServicesUseCase(
  serviceRepository
);
const serviceStatusUseCase = new ServiceStatusUseCase(serviceRepository);
const loginupUseCase = new LoginUseCase(companyRepository);
const getApprovalUseCase = new GetApprovalUseCase(companyRepository);
const getDashboardUseCase = new GetDashboardUseCase(companyRepository,serviceRepository);
const getByIdUseCase = new GetByIdUseCase(companyRepository);
const getApprovedCompany = new GetApprovedCompanyUseCase(companyRepository);
const addServiceUseCase = new AddServiceUseCase(s3Service, serviceRepository);
const updateStatusUseCase = new UpdateStatusUseCase(companyRepository);
const deleteServiceUseCase = new DeleteServiceUseCase(serviceRepository);
const getRatingsUseCase = new GetRatingsUseCase(ratingRepository);
const updateRatingUseCase = new UpdateRatingUseCase(ratingRepository);
const companyController = new CompanyController(
  signupUseCase,
  loginupUseCase,
  getApprovalUseCase,
  getByIdUseCase,
  updateStatusUseCase,
  getApprovedCompany,
  getDashboardUseCase
);
const serviceController = new ServiceController(
  addServiceUseCase,
  serviceStatusUseCase,
  getServiceUseCase,
  deleteServiceUseCase,
  getAllServiceUseCase,
  getSignleServicesUseCase
);
const ratingController = new RatingController(
  getRatingsUseCase,
  updateRatingUseCase
);

const router = Router();

router.post("/login", (req, res, next) =>
  companyController.login(req, res, next)
);

router.post("/register", upload.array("image", 3), (req, res, next) =>
  companyController.signup(req, res, next)
);
router.get("/get-approvals", (req, res, next) =>
  companyController.getApprovels(req, res, next)
);
router.get("/get-company/:id", (req, res, next) =>
  companyController.getById(req, res, next)
);
router.get("/get-approved-company", (req, res, next) =>
  companyController.getApproved(req, res, next)
);
router.patch(
  "/company-status/:id",
  authMiddleware(["admin"]),
  (req, res, next) => companyController.updateCompanyStatus(req, res, next)
);
router.post(
  "/add-service",
  authMiddleware(["company"]),
  upload.array("images"),
  (req, res, next) => serviceController.addService(req, res, next)
);
router.get("/get-services/:id", authMiddleware(["company"]), (req, res, next) =>
  serviceController.getService(req, res, next)
);
router.get("/get-dashboard", authMiddleware(["admin"]), (req, res, next) =>
  companyController.getDashboard(req, res, next)
);
router.get("/get-all-services", (req, res, next) =>
  serviceController.getAllServices(req, res, next)
);
router.get("/get-single-service/:id", (req, res, next) =>
  serviceController.getSingleServices(req, res, next)
);
router.get("/get-ratings/:id", (req, res, next) =>
  ratingController.getRatings(req, res, next)
);
router.post("/update-rating", (req, res, next) =>
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
