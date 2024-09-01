import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { BadRequestError } from "tune-up-library";

const PROTO_PATH = path.resolve(__dirname, "../protos/service.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const servicesProto = grpc.loadPackageDefinition(packageDefinition).services;

const client = new (servicesProto as any).StandardService(
  "company:6001",
  grpc.credentials.createInsecure()
);

export const getServiceDetails = (
  serviceId: string,
  typeOfPackage: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const call = client.GetPackageStream({ serviceId, typeOfPackage });
    let result: any = {
      package: {
        detail: null,
        subServices: []
      },
      company: null
    };

    call.on('data', (chunk: any) => {
      console.log("Received chunk:", JSON.stringify(chunk, null, 2));
      if (chunk.package) {
        if (chunk.package.detail) {
          result.package.detail = chunk.package.detail;
        }
        if (chunk.package.subServices) {
          result.package.subServices = chunk.package.subServices;
        }
      }
      if (chunk.company) {
        result.company = chunk.company;
      }
    });

    call.on('error', (error: any) => {
      console.error("gRPC stream error:", error);
      reject(new BadRequestError("Error in gRPC stream: " + error.message));
    });

    call.on('end', () => {
      console.log("Final result:", JSON.stringify(result, null, 2));
      resolve(result);
    });
  });
};