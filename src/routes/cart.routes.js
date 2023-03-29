import { Router } from "express";
import CartManager from "../cartManager.js";

const cartRoutes = Router();
const cartManager = new CartManager("./cart.json");

cartRoutes.post("/", async (request, response) => {
  try {
    let productsOrder = request.body;
    await cartManager.addCart(productsOrder);
    response.send({ status: "Success", message: "Order added." });
  } catch (error) {
    throw Error(`Error adding the order. Error detail: ${error}`);
  }
});

cartRoutes.get("/:cid", async (request, response) => {
  try {
    let cartId = parseInt(request.params.cid);
    let cartProductsById = await cartManager.getCartOrderById(cartId);

    if (!cartProductsById) return response.send({ error: "Cart not found." });

    response.send({ cartProductsById });
  } catch (error) {
    throw Error(`Error finding the cart. Error detail: ${error}`);
  }
});

cartRoutes.post("/:cid/product/:pid", async (request, response) => {
  try {
    let cartId = parseInt(request.params.cid);
    let productId = parseInt(request.params.pid);
    let product = request.body;

    await cartManager.addProductToCart(cartId, productId, product);

    response.send({
      status: "Success",
      message: "Product added to cart order.",
    });
  } catch (error) {
    throw Error(
      `Error adding the product to your order. Error detail: ${error}`
    );
  }
});

export default cartRoutes;
