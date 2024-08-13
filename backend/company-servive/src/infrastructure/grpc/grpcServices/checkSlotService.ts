import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { ServiceRepository } from "../../../repositories/implementation";
const serviceRepository = new ServiceRepository();
const PROTO_PATH = path.resolve(__dirname, "../protos/booking.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const bookingProto = grpc.loadPackageDefinition(packageDefinition).booking;

const checkSlotAvailability = async (call: any, callback: any) => {
  const { serviceId } = call.request;
  console.log('reached request here', serviceId);
  
  try {
    const available = await serviceRepository.checkSlotAvailabilityInDb(
      serviceId
    );
    callback(null, { available });
  } catch (error:any) {
    console.log(error,'error in ggrrppc');
    
    callback({
      code: grpc.status.INTERNAL,
      message: error.message,
    });
  }
};

const server = new grpc.Server();
server.addService((bookingProto as any).BookingService.service, {
  checkSlotAvailability,
});
export const startSlotGrpcServer = () => {
  server.bindAsync(
    "0.0.0.0:6002",
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