import mongoose from "mongoose";

//Collection name
const usersCollection = "users";

//Schema
const usersSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    age: {
      type: Number,
    },
    password: {
      type: String,
    },
    rol: {
      type: String,
    },
    loggedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const usersModel = mongoose.model(usersCollection, usersSchema);

export default usersModel;
