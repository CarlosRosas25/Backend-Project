import ProductsService from "../services/Products.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/errors-enum.js";
import { generateProductCreationErrorInfo } from "../services/errors/messages/product-creation-error.message.js";

class ProductsController {
  constructor() {
    this.productsService = new ProductsService();
  }

  viewProducts = async (request, response) => {
    const products = await this.productsService.getProducts();

    const result = products.map((item) => {
      return {
        title: item.title,
        description: item.description,
        price: item.price,
        stock: item.stock,
      };
    });

    response.render("products", {
      result,
      user: request.user,
    });
  };

  deleteProduct = async (request, response) => {
    try {
      const productId = request.params.pid;
      await this.productsService.deleteProduct(productId);
      response.send({ status: "Success", message: "Product deleted." });
    } catch (error) {
      throw Error(`Error deleting the product. Error detail: ${error}`);
    }
  };

  createProduct = async (request, response) => {
    try {
      const newProduct = request.body;

      if (
        !newProduct.title ||
        !newProduct.description ||
        !newProduct.price ||
        !newProduct.stock
      ) {
        CustomError.createError({
          name: "Product Creation Error",
          cause: generateProductCreationErrorInfo({
            title: newProduct.title,
            description: newProduct.description,
            price: newProduct.price,
            stock: newProduct.stock,
          }),
          message: "Error creating new product",
          code: EErrors.INVALID_TYPES_ERROR,
        });
      }

      await this.productsService.createProduct(newProduct);
      response.send({ status: "Success", message: "Product added." });
    } catch (error) {
      response.status(500).send({ error: error.code, message: error.message });
    }
  };

  updateProduct = async (request, response) => {
    try {
      const productId = request.params.pid;
      const productToUpdate = request.body;
      await this.productsService.updateProduct(productId, productToUpdate);
      response.send({ status: "Success", message: "Product updated." });
    } catch (error) {
      throw Error(`Error updating the product. Error detail: ${error}`);
    }
  };
}

export default ProductsController;

/* let url = "http://localhost:8080/api/products?";

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

    result.prevLink = result.hasPrevPage ? url.concat(`&page=${page - 1}`) : "";
    result.nextLink = result.hasNextPage ? url.concat(`&page=${page + 1}`) : ""; */
