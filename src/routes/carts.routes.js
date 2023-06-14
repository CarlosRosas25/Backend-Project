import { Router } from "express";
import CartsController from "../controllers/Carts.js";
import { passportCall, authorization } from "../../utils.js";

const cartsRoutes = Router();

class CartsRoutes {
  constructor() {
    this.cartsController = new CartsController();
  }

  start() {
    cartsRoutes.get("/", this.cartsController.viewCarts);
    cartsRoutes.post(
      "/:pid",
      passportCall("jwt"),
      authorization(["user"]),
      this.cartsController.addProductToNewCart
    );
    cartsRoutes.post(
      "/:cid/product/:pid",
      passportCall("jwt"),
      authorization(["user"]),
      this.cartsController.addProductToExistingCart
    );
    cartsRoutes.post(
      "/:cid/purchase",
      passportCall("jwt"),
      authorization(["user"]),
      this.cartsController.purchase
    );

    return cartsRoutes;
  }
}

export default CartsRoutes;

/* 

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
}); */
