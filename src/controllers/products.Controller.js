import { obtainProducts } from "../services/product.Services.js";

export const getProductsControllers = async (request, response) => {
  let products = await obtainProducts();

  let result = products.map((item) => {
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
