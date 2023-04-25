import { Router } from "express";
import cartsModel from "../models/carts.model.js";
import productsModel from "../models/products.model.js";

const cartRoutes = Router();

cartRoutes.get("/", async (request, response) => {
  try {
    let carts = await cartsModel.find();
    response.send(carts);
  } catch (error) {
    throw Error(`Error reading the orders. Error detail: ${error}`);
  }
});

cartRoutes.get("/:cid", async (request, response) => {
  try {
    let cart = await cartsModel.findOne({ _id: request.params.cid }).lean();

    response.render("cart", cart);
    //Este código es para visualizar los productos del carrito en formato JSON
    //response.send(cart);
  } catch (error) {
    throw Error(`Error finding the cart. Error detail: ${error}`);
  }
});

cartRoutes.post("/:pid", async (request, response) => {
  try {
    let productToAdd = await productsModel.findOne({
      _id: request.params.pid,
    });

    let quantity = request.body.quantity;

    let newCart = await cartsModel.create({
      products: [{ product: productToAdd._id, quantity: quantity }],
    });

    await cartsModel.findOne({ _id: newCart._id }).populate("products");

    response.send({ status: "Success", message: "Cart created successfully." });
  } catch (error) {
    throw Error(`Error adding the order. Error detail: ${error}`);
  }
});

cartRoutes.post("/:cid/product/:pid", async (request, response) => {
  try {
    let cart = await cartsModel.findOne({ _id: request.params.cid });
    cart.products.push({
      product: request.params.pid,
      quantity: request.body.quantity,
    });

    await cartsModel.updateOne({ _id: cart._id }, cart);

    response.send({
      status: "Success",
      message: "Product added to cart order.",
    });
  } catch (error) {
    throw Error(`Error adding the order. Error detail: ${error}`);
  }
});

cartRoutes.delete("/:cid/product/:pid", async (request, response) => {
  try {
    await cartsModel.updateOne(
      {
        _id: request.params.cid,
      },
      {
        $pull: {
          products: {
            product: request.params.pid,
          },
        },
      }
    );

    response.send({
      status: "Success",
      message: "Product deleted from cart.",
    });
  } catch (error) {
    throw Error(`Error deleting the product. Error detail: ${error}`);
  }
});

cartRoutes.delete("/:cid", async (request, response) => {
  try {
    await cartsModel.updateOne(
      {
        _id: request.params.cid,
      },
      {
        $pull: {
          products: {},
        },
      }
    );

    response.send({
      status: "Success",
      message: "Products deleted from cart.",
    });
  } catch (error) {
    throw Error(
      `Error deleting all the products from selected cart. Error detail: ${error}`
    );
  }
});

cartRoutes.put("/:cid", async (request, response) => {
  try {
    let cartUpdated = request.body;
    await cartsModel.updateMany({ _id: request.params.cid }, cartUpdated);

    response.send({
      status: "Success",
      message: "Updated products from cart.",
    });
  } catch (error) {
    throw Error(
      `Error updating the products from selected cart. Error detail: ${error}`
    );
  }
});

cartRoutes.put("/:cid/product/:pid", async (request, response) => {
  try {
    await cartsModel.updateOne(
      { _id: request.params.cid, "products.product": request.params.pid },
      {
        $set: {
          "products.$.quantity": request.body.quantity,
        },
      }
    );

    response.send({
      status: "Success",
      message: "Updated product's quantity.",
    });
  } catch (error) {
    throw Error(
      `Error updating the products from selected cart. Error detail: ${error}`
    );
  }
});

export default cartRoutes;
