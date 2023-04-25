import mongoose from "mongoose";

//Collection name
const cartsCollection = "carts";

//Schema
const cartsSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    default: [],
  },
});

cartsSchema.pre("findOne", function () {
  this.populate("products.product");
});

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;
