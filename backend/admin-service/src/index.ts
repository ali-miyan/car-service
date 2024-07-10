import express ,{Request,Response} from "express";
import compnayRoute from "./infrastructure/express/routes";
import connectDB from "./infrastructure/db/mongoConfig";
import { errorHandler } from "tune-up-library";
import cookieParser from 'cookie-parser';

const PORT = 3002;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/admin", compnayRoute);

app.use(errorHandler)

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
