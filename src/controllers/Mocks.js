import { generateProduct } from "../../utils.js";

class MockingProductsController {
  getProducts = async (request, response) => {
    try {
      let products = [];
      for (let i = 0; i < 100; i++) {
        products.push(generateProduct());
      }
      request.logger.info("Successful request!");
      response.send({ status: "success", payload: products });
    } catch (error) {
      request.logger.error("Couldn't get the products: " + error);
      response
        .status(500)
        .send({ error: error, message: "Couldn't get the products." });
    }
  };
}

export default MockingProductsController;
