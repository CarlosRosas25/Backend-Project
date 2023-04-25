import express from "express";
import handlebars from "express-handlebars";
//import { Server } from "socket.io";
import mongoose from "mongoose";
import __dirname from "./utils.js";
import productsRoutes from "./src/routes/products.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/src/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/src/public"));

app.use("/api/products", productsRoutes);
app.use("/api/carts", cartRoutes);

app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`));

//export const socketServer = new Server(httpServer);

const DB =
  "mongodb+srv://admin:3V8rAx1pGMRJArL3@cluster0.cythgpt.mongodb.net/test";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(DB);
    console.log("Successful connection to DB using Mongoose");
  } catch (error) {
    console.log("Error connecting to DB" + error);
    process.exit();
  }
};

connectMongoDB();
