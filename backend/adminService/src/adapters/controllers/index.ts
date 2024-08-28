import { AdminController } from "./adminController";
import { ServiceController } from "./serviceController";
import { S3Service } from "../../infrastructure";
import {
  DeleteServiceUseCase,
  GetServiceUseCase,
  RegisterUseCase,
  ServiceUseCase,
  UpdateServiceUseCase,
} from "../../usecases";
import { ConfigService, ServiceRepository } from "../../repositories";

export function setupDependencies() {
  const serviceRepository = new ServiceRepository();
  const configRepository = new ConfigService();
  const s3Service = new S3Service();

  const signupUseCase = new RegisterUseCase(configRepository);
  const updateStatusUseCase = new UpdateServiceUseCase(serviceRepository);
  const getServiceUseCase = new GetServiceUseCase(serviceRepository);
  const deleteServiceUseCase = new DeleteServiceUseCase(serviceRepository);
  const serviceUseCase = new ServiceUseCase(s3Service, serviceRepository);

  const adminController = new AdminController(signupUseCase);
  const serviceController = new ServiceController(
    serviceUseCase,
    getServiceUseCase,
    deleteServiceUseCase,
    updateStatusUseCase
  );

  return {
    adminController,
    serviceController,
  };
}
