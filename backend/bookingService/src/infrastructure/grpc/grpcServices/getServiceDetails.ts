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
    client.GetPackage(
      { serviceId, typeOfPackage },
      (error: any, response: any) => {
        if (error) {
          throw new BadRequestError("error in grpc" + error);
        }

        resolve(response);
      }
    );
  });
};
