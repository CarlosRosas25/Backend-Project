import { Router } from "express";
import ProductManager from "../productManager.js";

const viewsRoutes = Router();

const productManager = new ProductManager("./products.json");

export let products = [];

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
    products = await productManager.getProducts();
    response.render("realTimeProducts");
  } catch (error) {
    throw Error(`Error finding the products. Error detail: ${error}`);
  }
});

export default viewsRoutes;
