import { Router } from "express";
import { AdminController } from "../../adapters/controllers/adminController";
import { RegisterUseCase } from "../../usecases/adminUseCase";
// import { AdminRepository } from "../../repositories/implementation/adminRepository";
import { ConfigService } from "../../repositories/implementation/validateRepository";


// const userRepository = new AdminRepository();
const configRepository = new ConfigService();
const signupUseCase = new RegisterUseCase(configRepository);
const adminController = new AdminController(signupUseCase);

const router = Router();

router.post("/login", (req, res, next) =>
  adminController.signup(req, res, next)
);

export default router;
