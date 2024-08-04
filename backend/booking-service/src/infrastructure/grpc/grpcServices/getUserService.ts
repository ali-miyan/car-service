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
  "localhost:6000",
  grpc.credentials.createInsecure()
);

export const getUsersDetails = (userId: string,carId:string): Promise<any> => {
  
  return new Promise((resolve, reject) => {
    client.GetUsersDetails({ userId , carId}, (error: any, response: any) => {
      if (error) {
        return reject(error);
      }
      resolve(response);
    });
  });
};