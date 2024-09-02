import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { BadRequestError } from "tune-up-library";
import path from "path";

const PROTO_PATH = path.resolve(__dirname, "../protos/companyIds.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const idServiceProto = grpc.loadPackageDefinition(packageDefinition).idservice;

const client = new (idServiceProto as any).IdService(
  "company-service:6003",
  grpc.credentials.createInsecure()
);

export const getCompanyIds = (companyId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    client.GetIds({ companyId }, (error: any, response: any) => {
      if (error) {
        throw new BadRequestError("error in grpc" + error);
      }

      resolve(response);
    });
  });
};
