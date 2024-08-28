import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { UserRepository } from "../../../repositories";
import { BadRequestError } from "tune-up-library";
const PROTO_PATH = path.resolve(__dirname, "../protos/users.proto");
const userRepository = new UserRepository();
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const usersProto = grpc.loadPackageDefinition(packageDefinition).users;

const getUsersFromBooking = async (call: any, callback: any) => {
  const { companyId } = call.request;

  try {
    const users = await userRepository.getAllBookedUsers(companyId);
    callback(null, { users });
  } catch (error: any) {
    callback({
      code: grpc.status.INTERNAL,
      message: error.message,
    });

    throw new BadRequestError("error in grpc" + error);
  }
};

const server = new grpc.Server();
server.addService((usersProto as any).UserService.service, {
  getUsersFromBooking,
});
export const startUsersGrpcServer = () => {
  server.bindAsync(
    "0.0.0.0:6004",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error(`Error binding server: ${error}`);
        throw new BadRequestError("Error binding server" + error);
      }
      console.log(`gRPC server running at http://127.0.0.1:${port}`);
    }
  );
};
