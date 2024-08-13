import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { ServiceRepository } from "../../../repositories/implementation";
const serviceRepository = new ServiceRepository();
const PROTO_PATH = path.resolve(__dirname, "../protos/companyIds.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const bookingProto = grpc.loadPackageDefinition(packageDefinition).idservice;

const getCompanyIds = async (call: any, callback: any) => {
  const { companyId } = call.request;
  console.log("get id from here", companyId);

  try {
    const ids = await serviceRepository.getGeneralServiceIdsByCompanyId(
      companyId
    );
    callback(null, { ids });
  } catch (error: any) {
    console.log(error, "error in ggrrppc");

    callback({
      code: grpc.status.INTERNAL,
      message: error.message,
    });
  }
};

const server = new grpc.Server();
server.addService((bookingProto as any).IdService.service, {
  GetIds: getCompanyIds,
});
export const startCompanyIdsGrpcServer = () => {
  server.bindAsync(
    "0.0.0.0:6003",
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
