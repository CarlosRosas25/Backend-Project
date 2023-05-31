import { Router } from "express";
import { passportCall, authorization } from "../../utils.js";
import { getProductsControllers } from "../controllers/products.Controller.js";

const productsRoutes = Router();

productsRoutes.get(
  "/",
  passportCall("jwt"),
  authorization("user"),
  getProductsControllers
);

export default productsRoutes;

/* productsRoutes.get("/:pid", async (request, response) => {
  try {
    let productId = request.params.pid;
    let productById = await productManager.getProductById(parseInt(productId));

    if (!productById) return response.send({ error: "Product not found" });

    response.send({ productById });
  } catch (error) {
    throw Error(`Error finding the product. Error detail: ${error}`);
  }
}); */

/* productsRoutes.post("/", async (request, response) => {
  try {
    let newProduct = request.body;
    //Using Mongo DB
    let {title, description, price, thumbnails, code, stock, status, category} = request.body;
    let newProduct = await productModel.create({title, description, price, thumbnails, code, stock, status, category}) 
    response.status(201).send(newProduct)

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
}); */

/* productsRoutes.put("/:pid", async (request, response) => {
  try {
    let productId = parseInt(request.params.pid);
    let productToUpdate = request.body;

    //Using Mongo DB
    let productToUpdate = request.body;
    let product = await productModel.updateOne({_id: request.params.pid}, productToUpdate) 
    response.status(202).send(product)

    await productManager.updateProduct(productId, productToUpdate);
    response.send({ status: "Success", message: "Product updated." });
  } catch (error) {
    throw Error(`Error updating the product. Error detail: ${error}`);
  }
}); */

/* productsRoutes.delete("/:pid", async (request, response) => {
  try {
    let productId = request.params.pid;
    await productManager.deleteProduct(productId);
    response.send({ status: "Success", message: "Product deleted." });
  } catch (error) {
    throw Error(`Error deleting the product. Error detail: ${error}`);
  }
}); */
