import mongoose from "mongoose";

//Collection name
const usersCollection = "users";

//Schema
const usersSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: {
      type: String,
      unique: true,
    },
    age: Number,
    password: String,
    loggedBy: String,
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
  },
  { timestamps: true }
);

const usersModel = mongoose.model(usersCollection, usersSchema);

export default usersModel;
