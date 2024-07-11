import { Router } from "express";
import { UserController } from "../../adapters/controllers";
import { VerifyOtpUseCase,LoginUseCase,SignupUseCase,GoogleUseCase } from "../../usecases";
import { RedisOtpRepository,UserRepository } from "../../repositories";
import { OtpService } from "../../infrastructure/services";
import { ResendOtpUseCase } from "../../usecases/resendOtpUseCase";
import { RequestPasswordUseCase } from "../../usecases/reqeustPasswordUseCase";
import { ResetPasswordUseCase } from "../../usecases/resetPasswordUseCase";

const userRepository = new UserRepository();
const otpRepository = new OtpService();
const redisRepository = new RedisOtpRepository();
const loginUseCase = new LoginUseCase(userRepository);
const googleRepositry = new GoogleUseCase(userRepository);
const verifyOtpUseCase = new VerifyOtpUseCase(redisRepository,userRepository);
const resendOtpUseCase = new ResendOtpUseCase(otpRepository,redisRepository);
const signupUseCase = new SignupUseCase(userRepository,otpRepository,redisRepository);
const requestPasswordUseCase = new RequestPasswordUseCase(userRepository,redisRepository,otpRepository);
const resetPasswordUseCase = new ResetPasswordUseCase(userRepository,redisRepository);
const userController = new UserController(signupUseCase, verifyOtpUseCase,loginUseCase,requestPasswordUseCase,googleRepositry,resendOtpUseCase,resetPasswordUseCase);

const router = Router();

router.post("/register", (req, res, next) =>
  userController.signup(req, res, next)
);
router.post("/resend-otp", (req, res, next) =>
  userController.resendOtp(req, res, next)
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
router.post("/reset-request", (req, res, next) =>
  userController.forgetPassword(req, res, next)
);
router.patch("/change-password", (req, res, next) =>
  userController.changePassword(req, res, next)
);

export default router;
