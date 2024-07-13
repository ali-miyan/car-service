import { Router } from "express";
import { CompanyController } from "../../adapters/controllers";
import { RegisterUseCase, LoginUseCase, GetApprovalUseCase,UpdateStatusUseCase, GetByIdUseCase } from "../../usecases";
import { CompanyRepository } from "../../repositories/implementation";
import { S3Service } from "../../infrastructure/services";
import multer from "multer";
const upload = multer();

const companyRepository = new CompanyRepository();
const s3Service = new S3Service();

const signupUseCase = new RegisterUseCase(companyRepository, s3Service);
const loginupUseCase = new LoginUseCase(companyRepository);
const getApprovalUseCase = new GetApprovalUseCase(companyRepository);
const getByIdUseCase = new GetByIdUseCase(companyRepository);
const updateStatusUseCase = new UpdateStatusUseCase(companyRepository);
const userController = new CompanyController(signupUseCase, loginupUseCase,getApprovalUseCase,getByIdUseCase,updateStatusUseCase);

const router = Router();

router.post("/login", (req, res, next) => userController.login(req, res, next));

router.post("/register", upload.array("image", 3), (req, res, next) =>
  userController.signup(req, res, next)
);
router.get("/get-approvals", (req, res, next) =>
  userController.getApprovels(req, res, next)
);
router.get("/get-company/:id", (req, res, next) =>
  userController.getById(req, res, next)
);
router.patch("/services-status/:id", (req, res, next) =>
  userController.updateServiceStatus(req, res, next)
);


export default router;
