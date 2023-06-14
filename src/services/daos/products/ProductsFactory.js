import ProductsMongoDAO from "./ProductsMongoDao.js";

class ProductsFactoryDAO {
  static get(type) {
    switch (type) {
      case "mongodb":
        return new ProductsMongoDAO();

      default:
        console.error("Persistence provider not valid");
        process.exit();
    }
  }
}

export default ProductsFactoryDAO;
