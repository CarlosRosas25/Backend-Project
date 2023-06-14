import { Router } from "express";
import ProductsController from "../controllers/Products.js";
import { passportCall, authorization } from "../../utils.js";

const productsRoutes = Router();

class ProductsRouter {
  constructor() {
    this.productsController = new ProductsController();
  }

  start() {
    productsRoutes.get(
      "/",
      passportCall("jwt"),
      authorization(["user", "admin"]),
      this.productsController.viewProducts
    );

    productsRoutes.delete(
      "/:pid",
      passportCall("jwt"),
      authorization(["admin"]),
      this.productsController.deleteProduct
    );

    productsRoutes.post(
      "/",
      passportCall("jwt"),
      authorization(["admin"]),
      this.productsController.createProduct
    );

    productsRoutes.put(
      "/:pid",
      passportCall("jwt"),
      authorization(["admin"]),
      this.productsController.updateProduct
    );

    return productsRoutes;
  }
}

export default ProductsRouter;

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
