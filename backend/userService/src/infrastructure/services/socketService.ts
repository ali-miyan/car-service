import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";

export function setupSocketServer(server: HttpServer): Server {
  const io = new Server(server, {
    path: "/api/user/socket.io",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    allowEIO3: true,
  });

  io.on("connection", (socket: Socket) => {
    socket.on("send_message", (data: any) => {
      io.emit("receive_message", data);
    });
  });

  return io;
}
