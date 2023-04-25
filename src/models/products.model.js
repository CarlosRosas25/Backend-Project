import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

//Collection name
const productsCollection = "products";

//Schema
const productsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      maxlength: [15, "Write a shorter title for the product."],
    },
    description: {
      type: String,
      required: true,
      maxlength: [120, "Write a shorter description for the product."],
    },
    price: {
      type: Number,
      required: true,
      min: 1,
    },
    code: {
      type: String,
      required: true,
      unique: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

productsSchema.plugin(mongoosePaginate);

const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;
