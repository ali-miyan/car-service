import { Router } from "express";
import { CompanyController } from "../../adapters/controllers";
import { RegisterUseCase, LoginUseCase } from "../../usecases";
import { CompanyRepository } from "../../repositories/implementation";
import { S3Service } from "../../infrastructure/services";
import multer from "multer";
const upload = multer();

const userRepository = new CompanyRepository();
const s3Service = new S3Service();

const signupUseCase = new RegisterUseCase(userRepository, s3Service);
const loginupUseCase = new LoginUseCase(userRepository);
const userController = new CompanyController(signupUseCase, loginupUseCase);

const router = Router();

router.post("/register", upload.array("image", 3), (req, res, next) =>
  userController.signup(req, res, next)
);
router.post("/login", (req, res, next) => userController.login(req, res, next));

export default router;
