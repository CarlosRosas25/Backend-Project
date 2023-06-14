import mongoose from "mongoose";

const ticketsCollection = "tickets";

const ticketsSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      default: String(
        Date.now().toString(32) + Math.random().toString(16)
      ).replace(/\./g, ""),
    },
    amount: Number,
    purchaser: String,
  },
  { timestamps: true }
);

const ticketsModel = mongoose.model(ticketsCollection, ticketsSchema);

export default ticketsModel;
