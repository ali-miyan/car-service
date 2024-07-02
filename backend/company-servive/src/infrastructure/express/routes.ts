import { Router } from "express";
import { CompanyController } from "../../adapters/controllers/companyController";
import { RegisterUseCase } from "../../usecases/registerUseCase";
import { CompanyRepository } from "../../repositories/implementation/companyRepository";
import multer from "multer";
import { S3Service } from "../../repositories/implementation/s3Repository";
const upload = multer();

const userRepository = new CompanyRepository();
const s3Service = new S3Service();

const signupUseCase = new RegisterUseCase(userRepository, s3Service);
const userController = new CompanyController(signupUseCase);

const router = Router();

router.post("/register", upload.array("image", 3), (req, res, next) =>
  userController.signup(req, res, next)
);

export default router;
