import express from "express";
import userRoute from "./infrastructure/express/routes";
import connectDB from "./infrastructure/db/mongoConfig";
import { errorHandlingMiddleware } from "./infrastructure/express/middlewares/errorHandle";
import cors from 'cors'

const PORT = 3000;

const app = express();

app.use(express.json());
app.use("/api/user", userRoute);

app.use(errorHandlingMiddleware)

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();
