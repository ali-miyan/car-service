import { Router } from "express";
import { UserController } from "../../adapters/controllers";
import { VerifyOtpUseCase,LoginUseCase,SignupUseCase,GoogleUseCase } from "../../usecases";
import { RedisOtpRepository,OtpService,UserRepository } from "../../repositories/implementaion";
import { authMiddleware } from "tune-up-library";

const userRepository = new UserRepository();
const otpRepository = new OtpService();
const redisRepository = new RedisOtpRepository();
const loginUseCase = new LoginUseCase(userRepository);
const googleRepositry = new GoogleUseCase(userRepository);
const verifyOtpUseCase = new VerifyOtpUseCase(redisRepository,userRepository);
const signupUseCase = new SignupUseCase(userRepository,otpRepository,redisRepository);
const userController = new UserController(signupUseCase, verifyOtpUseCase,loginUseCase,googleRepositry);

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
router.post("/google-register", (req, res, next) =>
  userController.googleRegister(req, res, next)
);

export default router;
