import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";

function setupSocketServer(server: HttpServer): Server {
    const io = new Server(server, {
        cors: {
            origin: "http://localhost:8080",
            methods: ["GET", "POST"],
            credentials: true,
        },
    });

    io.on("connection", (socket: Socket) => {
        console.log("User connected ", socket.id);

        socket.on("send_message", (data: any) => {
            io.emit("receive_message", data);
        });
    });

    return io;
}

export default setupSocketServer;