import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { UserRepository, CarRepository } from "../../../repositories";
const userRepository = new UserRepository();
const carRepository = new CarRepository();
const PROTO_PATH = path.resolve(__dirname, "../protos/user.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const bookingProto = grpc.loadPackageDefinition(packageDefinition).users;

const getUsersDetails = async (call: any, callback: any) => {
  const { userId, carId } = call.request;
  console.log("reached request here", userId,carId);

  try {
    const data1 = await userRepository.getUserDetails(userId);
    const data2 = await carRepository.getOne(carId);

    console.log({...data1,...data2},'data to service');
    
    callback(null, { userDetails: { ...data1, ...data2 } });
  } catch (error: any) {
    console.log(error, "error in ggrrppc");

    callback({
      code: grpc.status.INTERNAL,
      message: error.message,
    });
  }
};

const server = new grpc.Server();
server.addService((bookingProto as any).UserService.service, {
  getUsersDetails,
});
export const startGrpcServer = () => {
  server.bindAsync(
    "0.0.0.0:6000",
    grpc.ServerCredentials.createInsecure(),
    (error, port) => {
      if (error) {
        console.error(`Error binding server: ${error}`);
        return;
      }
      console.log(`gRPC server running at http://127.0.0.1:${port}`);
    }
  );
};
