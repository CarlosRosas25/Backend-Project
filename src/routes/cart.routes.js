import { Router } from "express";
import CartManager from "../cartManager.js";

const cartRoutes = Router();
const cartManager = new CartManager("./cart.json");

let cartProducts = [];

cartRoutes.post("/", async (request, response) => {
  let productsOrder = request.body;
  await cartManager.addCart(productsOrder);
  response.send({ status: "Success", message: "Order added." });
});

cartRoutes.get("/:cid", async (request, response) => {
  let cartId = parseInt(request.params.cid);
  let cartProductsById = await cartManager.getCartOrderById(cartId);

  if (!cartProductsById) return response.send({ error: "Cart not found." });

  response.send({ cartProductsById });
});

cartRoutes.post("/:cid/product/:pid", async (request, response) => {
  let cartId = parseInt(request.params.cid);
  let productId = parseInt(request.params.pid);
  let product = request.body;

  await cartManager.addProductToCart(cartId, productId, product);

  response.send({ status: "Success", message: "Product added to cart order." });
});

export default cartRoutes;
