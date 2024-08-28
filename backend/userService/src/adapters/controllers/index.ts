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
import { OtpService, S3Service } from "../../infrastructure";
import { CarRepository } from "../../repositories";
import { ProducerService } from "../../infrastructure";
import { KafkaService } from "../../infrastructure";
import { CarController } from "../controllers/carController";
import { UserController } from "../controllers/userController";

const userRepository = new UserRepository();
const carRepository = new CarRepository();

const otpRepository = new OtpService();
const redisRepository = new RedisOtpRepository();
const s3Service = new S3Service();
const kafkaService = new KafkaService();
const rabbitMQService = new ProducerService();

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

export { carController, userController };
