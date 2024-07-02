import { Router } from "express";
import { AdminController } from "../../adapters/controllers";
import { RegisterUseCase } from "../../usecases";
import { ConfigService } from "../../repositories/implementation";


const configRepository = new ConfigService();
const signupUseCase = new RegisterUseCase(configRepository);
const adminController = new AdminController(signupUseCase);

const router = Router();

router.post("/login", (req, res, next) =>
  adminController.signup(req, res, next)
);

export default router;
