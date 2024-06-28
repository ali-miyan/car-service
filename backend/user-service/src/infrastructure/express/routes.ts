import { Router } from "express";
import { UserController } from "../../adapters/controllers/userController";
import { SignupUseCase } from "../../usecases/registerUseCase";
import { UserRepository } from "../../adapters/repositories/implementaion/userRepository";

const userRepository = new UserRepository();
const signupUseCase = new SignupUseCase(userRepository);
const userController = new UserController(signupUseCase);

const router = Router();

router.post("/register", (req, res, next) =>
  userController.signup(req, res, next)
);

export default router;
