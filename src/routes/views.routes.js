import { Router } from "express";
import ProductManager from "../productManager.js";
import { socketServer } from "../../app.js";

const viewsRoutes = Router();

const productManager = new ProductManager("./products.json");

//Using Handlebars

viewsRoutes.get("/", async (request, response) => {
  try {
    let products = await productManager.getProducts();
    response.render("home", { products });
  } catch (error) {
    throw Error(`Error finding the products. Error detail: ${error}`);
  }
});

//Using Websockets

viewsRoutes.get("/realtimeproducts", async (request, response) => {
  try {
    let products = await productManager.getProducts();
    response.render("realTimeProducts");

    socketServer.on("connection", (socket) => {
      console.log("Cliente conectado");

      socket.emit("list", { products });
    });
  } catch (error) {
    throw Error(`Error finding the products. Error detail: ${error}`);
  }
});

viewsRoutes.post("/realtimeproducts", async (request, response) => {
  try {
    let newProduct = request.body;

    await productManager.addProduct(
      newProduct.title,
      newProduct.description,
      newProduct.price,
      newProduct.thumbnails,
      newProduct.code,
      newProduct.stock,
      newProduct.status,
      newProduct.category
    );
    response.send({ status: "Success", message: "Product added." });
  } catch (error) {
    throw Error(`Error adding the product. Error detail: ${error}`);
  }
});

viewsRoutes.delete("/realtimeproducts/:pid", async (request, response) => {
  try {
    let productId = request.params.pid;
    await productManager.deleteProduct(productId);
    response.send({ status: "Success", message: "Product deleted." });
  } catch (error) {
    throw Error(`Error deleting the product. Error detail: ${error}`);
  }
});

export default viewsRoutes;
