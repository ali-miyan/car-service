import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.resolve(__dirname, "../protos/booking.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const bookingProto = grpc.loadPackageDefinition(packageDefinition).booking;

const client = new (bookingProto as any).BookingService(
  "localhost:6002",
  grpc.credentials.createInsecure()
);

export const checkSlotAvailability = (
  serviceId: string
): Promise<{ available: boolean }> => {
  return new Promise((resolve, reject) => {
    client.CheckSlotAvailability({ serviceId }, (error: any, response: any) => {
      if (error) {
        return reject(error);
      }
      resolve(response);
    });
  });
};
