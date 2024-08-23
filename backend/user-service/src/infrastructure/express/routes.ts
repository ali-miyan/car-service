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
  EditUserUseCase,
  GetCarByIdUseCase,
  DeleteCarUseCase,
  UpadtePasswordUseCase,
  AddCarUseCase,
  GetOneCarUseCase,
  AddRatingUseCase,
  GetAllUsersUseCase,
} from "../../usecases";
import { RedisOtpRepository, UserRepository } from "../../repositories";
import { OtpService, S3Service } from "../../infrastructure/services";
import { authMiddleware } from "tune-up-library";
import multer from "multer";
import { CarRepository } from "../../repositories/implementaion/carRepository";
import { ProducerService } from "../rabbitMQ";
import { KafkaService } from "../kafka";
const upload = multer();

const userRepository = new UserRepository();
const otpRepository = new OtpService();
const redisRepository = new RedisOtpRepository();
const s3Service = new S3Service();
const kafkaService = new KafkaService();
const loginUseCase = new LoginUseCase(userRepository);
const upadtePasswordUseCase = new UpadtePasswordUseCase(userRepository);
const editUSerUseCase = new EditUserUseCase(
  userRepository,
  s3Service,
  kafkaService
);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
const googleRepositry = new GoogleUseCase(userRepository);
const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
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
const rabbitMQService = new ProducerService();
const carRepository = new CarRepository();
const addCarUseCase = new AddCarUseCase(carRepository);
const addRatingUseCase = new AddRatingUseCase(userRepository, rabbitMQService);
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
  editUSerUseCase,
  upadtePasswordUseCase,
  addRatingUseCase,
  getAllUsersUseCase
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
router.get("/get-dashboard", authMiddleware(["admin"]), (req, res, next) =>
  userController.getDashboard(req, res, next)
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
  "/edit-user",
  upload.single("image"),
  authMiddleware(["user"]),
  (req, res, next) => userController.editUser(req, res, next)
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
router.patch("/update-password", authMiddleware(["user"]), (req, res, next) =>
  userController.updatePassword(req, res, next)
);
router.post("/add-rating", authMiddleware(["user"]), (req, res, next) =>
  userController.addRating(req, res, next)
);

export default router;
