import { Router } from "express";
import { UserController } from "../../adapters/controllers/userController";
import { SignupUseCase } from "../../usecases/signupUseCase";
import { LoginUseCase } from "../../usecases/loginUseCase";
import { VerifyOtpUseCase } from "../../usecases/verifyOtpUseCase";
import { UserRepository } from "../../repositories/implementaion/userRepository";
import { OtpService } from "../../repositories/implementaion/otpRepository";
import { RedisOtpRepository } from "../../repositories/implementaion/redisRepository";

const userRepository = new UserRepository();
const otpRepository = new OtpService();
const redisRepository = new RedisOtpRepository();
const loginUseCase = new LoginUseCase(userRepository);
const verifyOtpUseCase = new VerifyOtpUseCase(redisRepository);
const signupUseCase = new SignupUseCase(userRepository,otpRepository,redisRepository);
const userController = new UserController(signupUseCase, verifyOtpUseCase,loginUseCase);

const router = Router();

router.post("/register", (req, res, next) =>
  userController.signup(req, res, next)
);
router.post("/verify-otp", (req, res, next) =>
  userController.verifyOtp(req, res, next)
);
router.post("/login", (req, res, next) =>
  userController.login(req, res, next)
);

export default router;
