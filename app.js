import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";
import productsRoutes from "./src/routes/products.routes.js";
import cartRoutes from "./src/routes/cart.routes.js";
import viewsRoutes from "./src/routes/views.routes.js";
import { products } from "./src/routes/views.routes.js";

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

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("Cliente conectado");

  socket.emit("list", { products });

  socket.on("newProduct", (product) => {
    products.push(product);
    socket.emit("list", { products });
  });

  socket.on("deleteProduct", (id) => {
    const productPosition = products.findIndex((e) => e.id === parseInt(id));

    if (productPosition >= 0) {
      products.splice(productPosition, 1);
      socket.emit("list", { products });
    } else {
      console.log("Couldn't find the product to delete");
    }
  });
});
