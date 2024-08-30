import express from "express";
import compnayRoute from "./infrastructure/express/routes";
import { connectDB } from "./infrastructure/db";
import { errorHandler, NotFoundError } from "tune-up-library";
import cookieParser from "cookie-parser";
import cors from "cors";

const PORT = 3002;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/admin", compnayRoute);

app.all("*", async (req, res, next) => {
  next(new NotFoundError("404 Not Found"));
});

app.use(errorHandler);

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`admin service is running on port ${PORT}`);
  });
};

startServer();
