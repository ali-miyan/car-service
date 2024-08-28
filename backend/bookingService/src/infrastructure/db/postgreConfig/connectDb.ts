import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { BadRequestError } from "tune-up-library";

dotenv.config();

export const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.SQL_HOST,
  port: 5432,
  username:process.env.SQL_USERNAME,
  password:process.env.SQL_PASSWORD,
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
    await sequelize.sync();

    console.log('connected to sql server ...');
    
  } catch (error) {
    throw new BadRequestError('error connecting postgres' + error)
  }
};
