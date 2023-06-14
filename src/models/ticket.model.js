import mongoose from "mongoose";

const ticketsCollection = "tickets";

const ticketsSchema = new mongoose.Schema(
  {
    code: String,
    amount: Number,
    purchaser: String,
  },
  { timestamps: true }
);

const ticketsModel = mongoose.model(ticketsCollection, ticketsSchema);

export default ticketsModel;
