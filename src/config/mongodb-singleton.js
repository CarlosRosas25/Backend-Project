import mongoose from "mongoose";
import config from "./config.js";

export default class MongoSingleton {
  static #instance;

  constructor() {
    this.#connectMongoDB();
  }

  static getInstance() {
    if (this.#instance) {
      console.log("A connection to Mongo is already open");
    } else {
      this.#instance = new MongoSingleton();
    }
    return this.#instance;
  }

  #connectMongoDB = async () => {
    try {
      await mongoose.connect(config.mongoUrl);
      console.log("Successful connection to DB using Mongoose");
    } catch (error) {
      console.log("Error connecting to DB" + error);
      process.exit();
    }
  };
}
