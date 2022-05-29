import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
envFound.error && new Error("Couldn't find .env file");

export default {
  port: Number(process.env.PORT),
  mongoUrl: process.env.MONGO_URL,
  criptoKey: process.env.CRIPTO_KEY,
};
