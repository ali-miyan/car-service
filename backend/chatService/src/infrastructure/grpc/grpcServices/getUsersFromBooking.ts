import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.resolve(__dirname, "../protos/users.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const usersProto = grpc.loadPackageDefinition(packageDefinition).users;

const client = new (usersProto as any).UserService(
  "booking:6004",
  grpc.credentials.createInsecure()
);

export const getUsersFromBooking = (
  companyId: string
): Promise<{ users:any }> => {
  return new Promise((resolve, reject) => {
    client.getUsersFromBooking({ companyId }, (error: any, response: any) => {
      if (error) {
        return reject(error);
      }
      resolve(response);
    });
  });
};
