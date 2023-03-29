import { Router } from "express";
import ProductManager from "../productManager.js";

const productsRoutes = Router();

const productManager = new ProductManager("./products.json");

productsRoutes.get("/", async (request, response) => {
  try {
    let products = await productManager.getProducts();

    let limit = request.query.limit;
    if (!limit || limit > products.length) return response.send({ products });

    let limitedProducts = products.slice(0, parseInt(limit));
    response.send({ limitedProducts });
  } catch (error) {
    throw Error(`Error finding the products. Error detail: ${error}`);
  }
});

productsRoutes.get("/:pid", async (request, response) => {
  try {
    let productId = request.params.pid;
    let productById = await productManager.getProductById(parseInt(productId));

    if (!productById) return response.send({ error: "Product not found" });

    response.send({ productById });
  } catch (error) {
    throw Error(`Error finding the product. Error detail: ${error}`);
  }
});

productsRoutes.post("/", async (request, response) => {
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

productsRoutes.put("/:pid", async (request, response) => {
  try {
    let productId = parseInt(request.params.pid);
    let productToUpdate = request.body;

    await productManager.updateProduct(productId, productToUpdate);
    response.send({ status: "Success", message: "Product updated." });
  } catch (error) {
    throw Error(`Error updating the product. Error detail: ${error}`);
  }
});

productsRoutes.delete("/:pid", async (request, response) => {
  try {
    let productId = request.params.pid;
    await productManager.deleteProduct(productId);
    response.send({ status: "Success", message: "Product deleted." });
  } catch (error) {
    throw Error(`Error deleting the product. Error detail: ${error}`);
  }
});

export default productsRoutes;
