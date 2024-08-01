import { Client } from 'pg';
require('dotenv').config();

const connectionString = process.env.POSTGRES_URI;

const client = new Client({
  connectionString,
});

export const connectDB = async () => {
  try {
    await client.connect();
    console.log("PostgreSQL connected");
  } catch (error) {
    console.error("PostgreSQL connection error:", error);
    process.exit(1);
  }
};

export default client;
