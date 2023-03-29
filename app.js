import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import productsRoutes from "./src/routes/products.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";
import viewsRoutes from "./src/routes/views.routes.js";

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
app.use("/", viewsRoutes);

const httpServer = app.listen(PORT, () =>
  console.log(`Server running on Port: ${PORT}`)
);

export const socketServer = new Server(httpServer);
