import productsModel from "../../../models/products.model.js";

class ProductsMongoDAO {
  constructor() {
    this.collection = productsModel;
  }

  getProducts = async () => {
    const products = await this.collection.find();
    return products;
  };

  deleteProduct = async (id) => {
    await this.collection.deleteOne({ _id: id });
  };

  createProduct = async (product) => {
    let { title, description, price, thumbnail, code, stock, category } =
      product;
    await productsModel.create({
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category,
    });
  };

  updateProduct = async (id, product) => {
    await this.collection.updateOne({ _id: id }, product);
  };

  getProduct = async (id) => {
    const product = await this.collection.findOne({ _id: id });
    return product;
  };
}

export default ProductsMongoDAO;
