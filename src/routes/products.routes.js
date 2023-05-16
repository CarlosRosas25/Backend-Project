import { Router } from "express";
import productsModel from "../models/products.model.js";
//import { authToken } from "../../utils.js";
import { passportCall, authorization } from "../../utils.js";

const productsRoutes = Router();

productsRoutes.get(
  "/",
  passportCall("jwt"),
  authorization("user") /* authToken */,
  async (request, response) => {
    try {
      let url = "http://localhost:8080/api/products?";

      let limit = parseInt(request.query.limit);
      if (!limit || limit === 0) {
        limit = 8;
        url = url.concat(`&limit=${limit}`);
      } else {
        url = url.concat(`&limit=${limit}`);
      }

      let page = parseInt(request.query.page);
      if (!page || page === 0) {
        page = 1;
      }

      let category = request.query.category;
      let stock = parseInt(request.query.stock);
      let sort = request.query.sort;
      let filter = {};

      if (category) {
        filter = { category: category };
        url = url.concat(`&category=${category}`);
      }

      if (stock && stock > 0) {
        filter = { stock: stock };
        url = url.concat(`&stock=${stock}`);
      }

      let result = await productsModel.paginate(filter, {
        page,
        limit: limit,
        lean: true,
      });

      if (sort === "desc") {
        result = await productsModel.aggregate([
          {
            $sort: { title: -1 },
          },
        ]);
        url = url.concat(`&sort=${sort}`);
      } else if (sort === "asc") {
        result = await productsModel.aggregate([
          {
            $sort: { title: 1 },
          },
        ]);
        url = url.concat(`&sort=${sort}`);
      }

      result.prevLink = result.hasPrevPage
        ? url.concat(`&page=${page - 1}`)
        : "";
      result.nextLink = result.hasNextPage
        ? url.concat(`&page=${page + 1}`)
        : "";

      response.render("products", {
        result: result,
        user: request.user /* request.session.user */,
      });

      //Este código es para visualizar los productos en formato JSON con la información requerida inicialmente.
      /* response.send({
      status: "success",
      payload: result,
    }); */
    } catch (error) {
      throw Error(`Error finding the products. Error detail: ${error}`);
    }
  }
);

/* productsRoutes.get("/:pid", async (request, response) => {
  try {
    let productId = request.params.pid;
    let productById = await productManager.getProductById(parseInt(productId));

    if (!productById) return response.send({ error: "Product not found" });

    response.send({ productById });
  } catch (error) {
    throw Error(`Error finding the product. Error detail: ${error}`);
  }
}); */

/* productsRoutes.post("/", async (request, response) => {
  try {
    let newProduct = request.body;
    //Using Mongo DB
    let {title, description, price, thumbnails, code, stock, status, category} = request.body;
    let newProduct = await productModel.create({title, description, price, thumbnails, code, stock, status, category}) 
    response.status(201).send(newProduct)

    await productManager.addProduct(
      newProduct.title,
      newProduct.description,
      newProduct.price,
      newProduct.thumbnails,
      newProduct.code,
      newProduct.stock,
      newProduct.status,
      newProduct.category
    );

    response.send({ status: "Success", message: "Product added." });
  } catch (error) {
    throw Error(`Error adding the product. Error detail: ${error}`);
  }
}); */

/* productsRoutes.put("/:pid", async (request, response) => {
  try {
    let productId = parseInt(request.params.pid);
    let productToUpdate = request.body;

    //Using Mongo DB
    let productToUpdate = request.body;
    let product = await productModel.updateOne({_id: request.params.pid}, productToUpdate) 
    response.status(202).send(product)

    await productManager.updateProduct(productId, productToUpdate);
    response.send({ status: "Success", message: "Product updated." });
  } catch (error) {
    throw Error(`Error updating the product. Error detail: ${error}`);
  }
}); */

/* productsRoutes.delete("/:pid", async (request, response) => {
  try {
    let productId = request.params.pid;
    await productManager.deleteProduct(productId);
    response.send({ status: "Success", message: "Product deleted." });
  } catch (error) {
    throw Error(`Error deleting the product. Error detail: ${error}`);
  }
}); */

export default productsRoutes;
