import config from "../config/config.js";
import CartsFactoryDAO from "./daos/carts/CartsFactory.js";

class CartsService {
  constructor() {
    this.cartsDAO = CartsFactoryDAO.get(config.PERSISTENCE);
  }

  async getCarts() {
    const carts = await this.cartsDAO.getCarts();
    return carts;
  }

  async createCart(product) {
    await this.cartsDAO.createCart(product);
  }

  async getCart(id) {
    const cart = await this.cartsDAO.getCart(id);
    return cart;
  }

  async updateCart(id, productId, productQuantity) {
    await this.cartsDAO.updateCart(id, productId, productQuantity);
  }

  async addProductToCart(id, productId, productQuantity) {
    await this.cartsDAO.addProductToCart(id, productId, productQuantity);
  }

  async deleteProduct(id, productId) {
    await this.cartsDAO.deleteProduct(id, productId);
  }
}

export default CartsService;
