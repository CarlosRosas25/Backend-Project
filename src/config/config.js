import dotenv from "dotenv";
import program from "../../process.js";

const environment = program.opts().mode;
dotenv.config({
  path:
    environment === "production"
      ? "./src/config/.env.production"
      : "./src/config/.env.development",
});

export default {
  PORT: process.env.PORT || 8080,
  PERSISTENCE: program.opts().persist,
  mongoUrl: process.env.MONGO_URL,
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  environment: environment,
};
