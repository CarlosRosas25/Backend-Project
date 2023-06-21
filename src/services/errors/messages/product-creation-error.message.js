export const generateProductCreationErrorInfo = (product) => {
  return `Some data is imcomplete or isn't valid. Check the required fields:
      * title: needs to be a String, received: ${product.title}
      * description: needs to be a String, received: ${product.description}
      * price: needs to be a Number, received: ${product.price}
      * stock: needs to be a Number, received: ${product.stock}
      `;
};
