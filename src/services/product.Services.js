import productsModel from "../models/products.model.js";

export const obtainProducts = async () => {
  try {
    let result = await productsModel.find();
    return result;
  } catch (error) {
    throw Error(`Error finding the products. Error detail: ${error}`);
  }
};

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
