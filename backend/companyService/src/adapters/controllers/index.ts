import {
  RegisterUseCase,
  LoginUseCase,
  GetApprovalUseCase,
  UpdateStatusUseCase,
  GetByIdUseCase,
  AddServiceUseCase,
  ServiceStatusUseCase,
  GetServiceUseCase,
  DeleteServiceUseCase,
  GetAllServicesUseCase,
  GetSingleServicesUseCase,
  GetApprovedCompanyUseCase,
  GetRatingsUseCase,
  UpdateRatingUseCase,
  GetDashboardUseCase,
} from "../../usecases";
import {
  CompanyRepository,
  RatingRepository,
  ServiceRepository,
} from "../../repositories/implementation";
import { S3Service } from "../../infrastructure/services";
import { CompanyController } from "./companyController";
import { ServiceController } from "./serviceController";
import { RatingController } from "./ratingsController";

const companyRepository = new CompanyRepository();
const serviceRepository = new ServiceRepository();
const ratingRepository = new RatingRepository();

const s3Service = new S3Service();

const signupUseCase = new RegisterUseCase(companyRepository, s3Service);
const loginUseCase = new LoginUseCase(companyRepository);
const getApprovalUseCase = new GetApprovalUseCase(companyRepository);
const updateStatusUseCase = new UpdateStatusUseCase(companyRepository);
const getByIdUseCase = new GetByIdUseCase(companyRepository);
const getApprovedCompanyUseCase = new GetApprovedCompanyUseCase(
  companyRepository
);
const getDashboardUseCase = new GetDashboardUseCase(
  companyRepository,
  serviceRepository
);

const addServiceUseCase = new AddServiceUseCase(s3Service, serviceRepository);
const serviceStatusUseCase = new ServiceStatusUseCase(serviceRepository);
const getServiceUseCase = new GetServiceUseCase(serviceRepository);
const deleteServiceUseCase = new DeleteServiceUseCase(serviceRepository);
const getAllServicesUseCase = new GetAllServicesUseCase(serviceRepository);
const getSignleServicesUseCase = new GetSingleServicesUseCase(
  serviceRepository
);

const getRatingsUseCase = new GetRatingsUseCase(ratingRepository);
const updateRatingUseCase = new UpdateRatingUseCase(ratingRepository);

const companyController = new CompanyController(
  signupUseCase,
  loginUseCase,
  getApprovalUseCase,
  getByIdUseCase,
  updateStatusUseCase,
  getApprovedCompanyUseCase,
  getDashboardUseCase
);

const serviceController = new ServiceController(
  addServiceUseCase,
  serviceStatusUseCase,
  getServiceUseCase,
  deleteServiceUseCase,
  getAllServicesUseCase,
  getSignleServicesUseCase
);

const ratingController = new RatingController(
  getRatingsUseCase,
  updateRatingUseCase
);

export { companyController, serviceController, ratingController };
