import cartsModel from "../../../models/carts.model.js";

class CartsMongoDAO {
  constructor() {
    this.collection = cartsModel;
  }

  getCarts = async () => {
    const carts = await this.collection.find();
    return carts;
  };

  createCart = async (product) => {
    const newCart = await this.collection.create({
      products: [{ product: product.id, quantity: product.quantity }],
    });
    await this.collection.findOne({ _id: newCart._id }).populate("products");
  };

  getCart = async (id) => {
    const cart = await this.collection.findOne({ _id: id });
    return cart;
  };

  updateCart = async (id, productId, productQuantity) => {
    await this.collection.updateOne(
      { _id: id, "products.product": productId },
      {
        $set: {
          "products.$.quantity": productQuantity,
        },
      }
    );
  };

  addProductToCart = async (id, productId, productQuantity) => {
    const cart = await this.collection.findOne({ _id: id });
    cart.products.push({
      product: productId,
      quantity: productQuantity,
    });

    await this.collection.updateOne({ _id: id }, cart);
  };

  deleteProduct = async (id, productId) => {
    await this.collection.updateOne(
      {
        _id: id,
      },
      {
        $pull: {
          products: {
            _id: productId,
          },
        },
      }
    );
  };
}

export default CartsMongoDAO;
