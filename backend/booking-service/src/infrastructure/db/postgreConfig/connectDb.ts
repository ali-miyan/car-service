import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: "car-app.cjkqgwquiz35.eu-north-1.rds.amazonaws.com",
  port: 5432,
  username: "postgres",
  password: "Aylanesa7",
  database: "booking",
  ssl: true,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to PostgreSQL.");
    const result = await sequelize.query("SELECT NOW()");
    console.log("Current time from database:", result[0][0]);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
