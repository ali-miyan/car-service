import { Router } from "express";
import { CompanyController } from "../../adapters/controllers";
import { RegisterUseCase } from "../../usecases";
import { CompanyRepository ,S3Service} from "../../repositories/implementation";
import multer from "multer";
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
