import mongoose from "mongoose";

//Collection name
const usersCollection = "users";

//Schema
const usersSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    age: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
    },
  },
  { timestamps: true }
);

const usersModel = mongoose.model(usersCollection, usersSchema);

export default usersModel;
