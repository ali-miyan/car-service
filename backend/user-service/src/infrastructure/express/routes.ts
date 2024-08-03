import { Router } from "express";
import { CarController, UserController } from "../../adapters/controllers";
import {
  VerifyOtpUseCase,
  LoginUseCase,
  SignupUseCase,
  GoogleUseCase,
  GetUsersUseCase,
  RequestPasswordUseCase,
  ResendOtpUseCase,
  ResetPasswordUseCase,
  UpdateStatusUseCase,
  GetUserByIdUseCase,
  UserImageUseCase,
  EditUSerUseCase,
  GetCarByIdUseCase,
  DeleteCarUseCase,
  UpadtePasswordUseCase,
  AddCarUseCase,
  GetOneCarUseCase
} from "../../usecases";
import { RedisOtpRepository, UserRepository } from "../../repositories";
import { OtpService, S3Service } from "../../infrastructure/services";
import { authMiddleware } from "tune-up-library";
import multer from "multer";
import { CarRepository } from "../../repositories/implementaion/carRepository";
const upload = multer();

const userRepository = new UserRepository();
const otpRepository = new OtpService();
const redisRepository = new RedisOtpRepository();
const s3Service = new S3Service();
const loginUseCase = new LoginUseCase(userRepository);
const upadtePasswordUseCase = new UpadtePasswordUseCase(userRepository);
const editUSerUseCase = new EditUSerUseCase(userRepository);
const userUploadUseCase = new UserImageUseCase(userRepository, s3Service);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const googleRepositry = new GoogleUseCase(userRepository);
const verifyOtpUseCase = new VerifyOtpUseCase(redisRepository, userRepository);
const getUsersUseCase = new GetUsersUseCase(userRepository);
const updateStatusUseCase = new UpdateStatusUseCase(userRepository);
const resendOtpUseCase = new ResendOtpUseCase(otpRepository, redisRepository);
const signupUseCase = new SignupUseCase(
  userRepository,
  otpRepository,
  redisRepository
);
const requestPasswordUseCase = new RequestPasswordUseCase(
  userRepository,
  redisRepository,
  otpRepository
);
const resetPasswordUseCase = new ResetPasswordUseCase(
  userRepository,
  redisRepository
);
const carRepository = new CarRepository();
const addCarUseCase = new AddCarUseCase(carRepository);
const deleteCarUseCase = new DeleteCarUseCase(carRepository);
const getCarByIdUseCase = new GetCarByIdUseCase(carRepository);
const getOneCarUseCase = new GetOneCarUseCase(carRepository);
const carController = new CarController(
  addCarUseCase,
  getCarByIdUseCase,
  deleteCarUseCase,
  getOneCarUseCase
);
const userController = new UserController(
  signupUseCase,
  verifyOtpUseCase,
  loginUseCase,
  requestPasswordUseCase,
  googleRepositry,
  resendOtpUseCase,
  resetPasswordUseCase,
  getUsersUseCase,
  updateStatusUseCase,
  getUserByIdUseCase,
  userUploadUseCase,
  editUSerUseCase,
  upadtePasswordUseCase
);

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
router.post("/login", (req, res, next) => userController.login(req, res, next));
router.post("/google-register", (req, res, next) =>
  userController.googleRegister(req, res, next)
);
router.post("/reset-request", (req, res, next) =>
  userController.forgetPassword(req, res, next)
);
router.patch("/change-password", (req, res, next) =>
  userController.changePassword(req, res, next)
);
router.get("/get-users", authMiddleware(["admin"]), (req, res, next) =>
  userController.getUser(req, res, next)
);
router.get("/get-user/:id", authMiddleware(["user"]), (req, res, next) =>
  userController.getUserById(req, res, next)
);
router.patch(
  "/update-status/:id",
  authMiddleware(["admin"]),
  (req, res, next) => userController.updateUser(req, res, next)
);
router.post(
  "/upload-image",
  upload.single("image"),
  authMiddleware(["user"]),
  (req, res, next) => userController.uploadImage(req, res, next)
);
router.post("/edit-user", authMiddleware(["user"]), (req, res, next) =>
  userController.editUser(req, res, next)
);
router.post("/add-car", authMiddleware(["user"]), (req, res, next) =>
  carController.addCar(req, res, next)
);
router.get("/get-car/:id", authMiddleware(["user"]), (req, res, next) =>
  carController.getCar(req, res, next)
);
router.get("/get-one-car/:id", authMiddleware(["user"]), (req, res, next) =>
  carController.getOneCar(req, res, next)
);
router.delete("/delete-car/:id", authMiddleware(["user"]), (req, res, next) =>
  carController.deleteCar(req, res, next)
);
router.patch(
  "/update-password",
  authMiddleware(["user"]),
  (req, res, next) => userController.updatePassword(req, res, next)
);



export default router;
