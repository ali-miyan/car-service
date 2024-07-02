import { Router } from "express";
import { UserController } from "../../adapters/controllers";
import { VerifyOtpUseCase,LoginUseCase,SignupUseCase } from "../../usecases";
import { RedisOtpRepository,OtpService,UserRepository } from "../../repositories/implementaion";

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
