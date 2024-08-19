import express from "express";
import bookingRoute from "./infrastructure/express/routes";
import { connectDB, sequelize } from "./infrastructure/db";
import { errorHandler } from "tune-up-library";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import setupSocketServer from "./infrastructure/services/socketService";
import { createConsumerService } from "./infrastructure/rabbitMQ/rabbitMQServices";
import { startUsersGrpcServer } from "./infrastructure/grpc/grpcServices";
import Booking from "./infrastructure/db/models/bookingModel";

const PORT = 3003;

const app = express();

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use("/api/order", bookingRoute);
app.use(errorHandler);

app.get('/api/revenue', async (req, res) => {
  try {
    const result = await Booking.findAll({
      attributes: [
        [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'month'],
        [sequelize.fn('sum', sequelize.col('totalPrice')), 'totalRevenue'],
      ],
      group: [sequelize.fn('date_trunc', 'month', sequelize.col('createdAt'))],
      order: [[sequelize.fn('date_trunc', 'month', sequelize.col('createdAt')), 'ASC']],
    });

    const data = result.map((row:any) => ({
      month: row.getDataValue('month'),
      totalRevenue: row.getDataValue('totalRevenue'),
    }));

    res.json({result,data});
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});


const server = http.createServer(app);
const io = setupSocketServer(server);

const startServer = async () => {
  try {
    startUsersGrpcServer()
    createConsumerService();
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();
export { io };
