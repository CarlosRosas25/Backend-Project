import config from "../config/config.js";
import ProductsFactoryDAO from "./daos/products/ProductsFactory.js";

class ProductsService {
  constructor() {
    this.productsDAO = ProductsFactoryDAO.get(config.PERSISTENCE);
  }

  async getProducts() {
    const products = await this.productsDAO.getProducts();
    return products;
  }

  async deleteProduct(id) {
    await this.productsDAO.deleteProduct(id);
  }

  async createProduct(product) {
    await this.productsDAO.createProduct(product);
  }

  async updateProduct(id, productToUpdate) {
    await this.productsDAO.updateProduct(id, productToUpdate);
  }

  async getProduct(id) {
    const product = await this.productsDAO.getProduct(id);
    return product;
  }
}

export default ProductsService;
