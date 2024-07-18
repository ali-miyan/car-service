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
const serviceStatusUseCase = new ServiceStatusUseCase(serviceRepository);
const loginupUseCase = new LoginUseCase(companyRepository);
const getApprovalUseCase = new GetApprovalUseCase(companyRepository);
const getByIdUseCase = new GetByIdUseCase(companyRepository);
const addServiceUseCase = new AddServiceUseCase(s3Service, serviceRepository);
const updateStatusUseCase = new UpdateStatusUseCase(companyRepository);
const deleteServiceUseCase = new DeleteServiceUseCase(serviceRepository);
const userController = new CompanyController(
  signupUseCase,
  loginupUseCase,
  getApprovalUseCase,
  getByIdUseCase,
  updateStatusUseCase
);
const serviceController = new ServiceController(addServiceUseCase,serviceStatusUseCase,getServiceUseCase,deleteServiceUseCase);

const router = Router();

router.post("/login", (req, res, next) => userController.login(req, res, next));

router.post("/register", upload.array("image", 3), (req, res, next) =>
  userController.signup(req, res, next)
);
router.get("/get-approvals", authMiddleware(["admin"]), (req, res, next) =>
  userController.getApprovels(req, res, next)
);
router.get(
  "/get-company/:id",
  authMiddleware(["admin", "company"]),
  (req, res, next) => userController.getById(req, res, next)
);
router.patch("/company-status/:id", (req, res, next) =>
  userController.updateCompanyStatus(req, res, next)
);
router.post("/add-service", upload.array("images"), (req, res, next) =>
  serviceController.addService(req, res, next)
);
router.get("/get-services", authMiddleware(["company"]), (req, res, next) =>
  serviceController.getService(req, res, next)
);
router.delete("/delete-service/:id",authMiddleware(['admin']), (req, res, next) =>
  serviceController.deleteService(req, res, next)
);
router.patch("/services-status/:id",authMiddleware(["company"]),(req, res, next) =>
   serviceController.updateStatus(req, res, next)
);

export default router;
