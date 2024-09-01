import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { ServiceRepository } from "../../../repositories/implementation";
import { BadRequestError } from "tune-up-library";

const serviceRepository = new ServiceRepository();

const PROTO_PATH = path.resolve(__dirname, "../protos/service.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const bookingProto = grpc.loadPackageDefinition(packageDefinition).services;

const getPackageStream = async (call: any) => {
  const { serviceId, typeOfPackage } = call.request;
  try {
    console.log(`Fetching package details for serviceId: ${serviceId}, typeOfPackage: ${typeOfPackage}`);
    const data = await serviceRepository.getPackageDetails(
      serviceId,
      typeOfPackage
    );
    
    console.log("Raw data from repository:", JSON.stringify(data, null, 2));

    // Send data in multiple chunks as received from the repository
    if (data.package && data.package.detail) {
      call.write({ package: { detail: data.package.detail } });
    }
    if (data.package && data.package.subServices) {
      call.write({ package: { subServices: data.package.subServices } });
    }
    if (data.company) {
      call.write({ company: data.company });
    }
    call.end();
  } catch (error: any) {
    console.error("Error in getPackageStream:", error);
    call.emit('error', {
      code: grpc.status.INTERNAL,
      message: "Internal server error: " + error.message,
    });
  }
};

const server = new grpc.Server();
server.addService((bookingProto as any).StandardService.service, {
  GetPackageStream: getPackageStream,
});

export const startServiceGrpcServer = () => {
  server.bindAsync(
    "0.0.0.0:6001",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error("Failed to bind gRPC server:", error);
        throw new BadRequestError("Error in gRPC server binding: " + error);
      }
      console.log(`gRPC server running at http://127.0.0.1:${port}`);
      server.start();
    }
  );
};