import { Router } from "express";
import { AdminController,ServiceController } from "../../adapters/controllers";
import { S3Service } from "../../infrastructure/services";
import { DeleteServiceUseCase, GetServiceUseCase, RegisterUseCase, ServiceUseCase, UpdateServiceUseCase } from "../../usecases";
import { ConfigService, ServiceRepository } from "../../repositories/implementation";
import multer from 'multer'
import { authMiddleware } from "tune-up-library";
const upload = multer()

const serviceRepository = new ServiceRepository()
const configRepository = new ConfigService();
const s3Service = new S3Service()
const signupUseCase = new RegisterUseCase(configRepository);
const updateStatusRepository = new UpdateServiceUseCase(serviceRepository);
const getServiceUseCase = new GetServiceUseCase(serviceRepository);
const deleteServiceUseCase = new DeleteServiceUseCase(serviceRepository);
const serviceUseCase = new ServiceUseCase(s3Service,serviceRepository);
const adminController = new AdminController(signupUseCase);
const serviceController = new ServiceController(serviceUseCase,getServiceUseCase,deleteServiceUseCase,updateStatusRepository);

const router = Router();

router.post("/login", (req, res, next) =>
  adminController.signup(req, res, next)
);
router.post("/add-service",authMiddleware(['admin']),upload.single("image"), (req, res, next) =>
  serviceController.addService(req, res, next)
);
router.get("/get-service",authMiddleware(['admin']), (req, res, next) =>
  serviceController.getService(req, res, next)
);
router.delete("/delete-service/:id",authMiddleware(['admin']), (req, res, next) =>
  serviceController.deleteService(req, res, next)
);
router.put("/services-status/:id",authMiddleware(['admin']), (req, res, next) =>
  serviceController.updateStatus(req, res, next)
);

export default router;
