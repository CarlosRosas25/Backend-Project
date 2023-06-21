import { Router } from "express";
import MockingProductsController from "../controllers/Mocks.js";

const mocksProductsRoutes = Router();

class MockingProductsRouter {
  constructor() {
    this.mockingProductsController = new MockingProductsController();
  }

  start() {
    mocksProductsRoutes.get("/", this.mockingProductsController.getProducts);

    return mocksProductsRoutes;
  }
}

export default MockingProductsRouter;
