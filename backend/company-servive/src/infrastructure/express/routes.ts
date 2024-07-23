import { Router } from "express";
import {
  CompanyController,
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
} from "../../usecases";
import {
  CompanyRepository,
  ServiceRepository,
} from "../../repositories/implementation";
import { S3Service } from "../../infrastructure/services";
import multer from "multer";
import { authMiddleware } from "tune-up-library";
const upload = multer();

const companyRepository = new CompanyRepository();
const serviceRepository = new ServiceRepository();
const s3Service = new S3Service();

const signupUseCase = new RegisterUseCase(companyRepository, s3Service);
const getServiceUseCase = new GetServiceUseCase(serviceRepository);
const getAllServiceUseCase = new GetAllServicesUseCase(serviceRepository);
const serviceStatusUseCase = new ServiceStatusUseCase(serviceRepository);
const loginupUseCase = new LoginUseCase(companyRepository);
const getApprovalUseCase = new GetApprovalUseCase(companyRepository);
const getByIdUseCase = new GetByIdUseCase(companyRepository);
const addServiceUseCase = new AddServiceUseCase(s3Service, serviceRepository);
const updateStatusUseCase = new UpdateStatusUseCase(companyRepository);
const deleteServiceUseCase = new DeleteServiceUseCase(serviceRepository);
const companyController = new CompanyController(
  signupUseCase,
  loginupUseCase,
  getApprovalUseCase,
  getByIdUseCase,
  updateStatusUseCase
);
const serviceController = new ServiceController(
  addServiceUseCase,
  serviceStatusUseCase,
  getServiceUseCase,
  deleteServiceUseCase,
  getAllServiceUseCase
);

const router = Router();

router.post("/login", (req, res, next) =>
  companyController.login(req, res, next)
);

router.post("/register", upload.array("image", 3), (req, res, next) =>
  companyController.signup(req, res, next)
);
router.get(
  "/get-approvals",
  authMiddleware(["admin", "user"]),
  (req, res, next) => companyController.getApprovels(req, res, next)
);
router.get(
  "/get-company/:id",
  authMiddleware(["company", "admin"]),
  (req, res, next) => companyController.getById(req, res, next)
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
router.get("/get-all-services", (req, res, next) =>
  serviceController.getAllServices(req, res, next)
);
router.delete(
  "/delete-service/:id",
  authMiddleware(["admin"]),
  (req, res, next) => serviceController.deleteService(req, res, next)
);
router.patch(
  "/services-status/:id",
  authMiddleware(["company"]),
  (req, res, next) => serviceController.updateStatus(req, res, next)
);

export default router;
