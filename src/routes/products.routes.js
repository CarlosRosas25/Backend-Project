import { Router } from "express";
import ProductManager from "../productManager.js";

const productsRoutes = Router();

const productManager = new ProductManager("./products.json");

let products = [];

productsRoutes.get("/", async (request, response) => {
  products = await productManager.getProducts();

  let limit = request.query.limit;
  if (!limit || limit > products.length) return response.send({ products });

  let limitedProducts = products.slice(0, parseInt(limit));
  response.send({ limitedProducts });
});

productsRoutes.get("/:pid", async (request, response) => {
  let productId = request.params.pid;
  let productById = await productManager.getProductById(parseInt(productId));

  if (!productById) return response.send({ error: "Product not found" });

  response.send({ productById });
});

productsRoutes.post("/", async (request, response) => {
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
});

productsRoutes.put("/:pid", async (request, response) => {
  let productId = parseInt(request.params.pid);
  let productToUpdate = request.body;

  await productManager.updateProduct(productId, productToUpdate);
  response.send({ status: "Success", message: "Product updated." });
});

productsRoutes.delete("/:pid", async (request, response) => {
  let productId = request.params.pid;
  await productManager.deleteProduct(productId);
  response.send({ status: "Success", message: "Product deleted." });
});

export default productsRoutes;
