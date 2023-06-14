import CartsService from "../services/Carts.js";
import ProductsService from "../services/Products.js";
import TicketsService from "../services/Tickets.js";

class CartsController {
  constructor() {
    this.cartsService = new CartsService();
    this.productsService = new ProductsService();
    this.ticketsService = new TicketsService();
  }

  viewCarts = async (request, response) => {
    try {
      const carts = await this.cartsService.getCarts();
      response.send(carts);
    } catch (error) {
      throw Error(`Error reading the orders. Error detail: ${error}`);
    }
  };

  addProductToNewCart = async (request, response) => {
    try {
      const productId = request.params.pid;
      const product = await this.productsService.getProduct(productId);
      const productQuantity = request.body.quantity;

      if (product.stock < productQuantity) {
        response.send({
          status: "Error",
          message:
            "Your product quantity can't be higher than your product stock.",
        });
      } else {
        await this.cartsService.createCart({
          id: product._id,
          quantity: productQuantity,
        });
        response.send({
          status: "Success",
          message: "Cart created successfully.",
        });
      }
    } catch (error) {
      throw Error(`Error adding the order. Error detail: ${error}`);
    }
  };

  addProductToExistingCart = async (request, response) => {
    try {
      const cartId = request.params.cid;
      const productId = request.params.pid;
      const productQuantity = request.body.quantity;

      const cart = await this.cartsService.getCart(cartId);

      cart.products.find(async (product) => {
        if (product.product.id === productId) {
          await this.cartsService.updateCart(
            cartId,
            productId,
            productQuantity
          );
        } else {
          await this.cartsService.addProductToCart(
            cartId,
            productId,
            productQuantity
          );
        }
      });

      response.send({
        status: "Success",
        message: "Product added to cart order.",
      });
    } catch (error) {
      throw Error(`Error adding the product to cart. Error detail: ${error}`);
    }
  };

  purchase = async (request, response) => {
    try {
      const cartId = request.params.cid;
      const cart = await this.cartsService.getCart(cartId);

      let productsForTicket = [];

      cart.products.forEach(async (product) => {
        const productDB = await this.productsService.getProduct(
          product.product.id
        );
        if (productDB.stock > product.quantity) {
          productsForTicket.push(product);
          const newStock = productDB.stock - product.quantity;
          await this.productsService.updateProduct(productDB.id, {
            stock: newStock,
          });
          await this.cartsService.deleteProduct(cartId, product._id);
        }
      });

      setTimeout(async () => {
        await this.ticketsService.createTicket(productsForTicket, request.user);
      }, "2000");

      response.send({
        status: "Success",
        message: "Successful purchase.",
      });
    } catch (error) {
      throw Error(`Error purchasing the products. Error detail: ${error}`);
    }
  };
}

export default CartsController;
