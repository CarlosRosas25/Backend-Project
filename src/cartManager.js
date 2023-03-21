import fs from "fs";

class CartManager {
  constructor(path) {
    this.path = path;
    this.cartOrder = [];
  }

  addCart = async (products) => {
    try {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, "[]");
      }
      if (products.length === 0) {
        console.log("You didn't add products to your order.");
      } else {
        let orders = await fs.promises.readFile(this.path, "utf-8");
        this.cartOrder = JSON.parse(orders);
        this.cartOrder.push({
          id: Date.now(),
          products: products,
        });
        await fs.promises.writeFile(this.path, JSON.stringify(this.cartOrder));
      }
    } catch (error) {
      throw Error(`Error creating the cart. Error detail: ${error}`);
    }
  };

  getCartOrderById = async (id) => {
    try {
      let orders = await fs.promises.readFile(this.path, "utf-8");
      this.cartOrder = JSON.parse(orders);

      let cartOrderFound = this.cartOrder.find((e) => e.id === id);

      if (cartOrderFound) {
        return cartOrderFound.products;
      } else {
        console.log("Cart order not found");
      }
    } catch (error) {
      throw Error(
        `Error reading the specific cart order. Error detail: ${error}`
      );
    }
  };

  addProductToCart = async (cartId, productId, product) => {
    try {
      let orders = await fs.promises.readFile(this.path, "utf-8");
      this.cartOrder = JSON.parse(orders);

      const cartOrderPosition = this.cartOrder.findIndex(
        (e) => e.id === cartId
      );

      if (cartOrderPosition >= 0) {
        console.log(this.cartOrder[cartOrderPosition]);
        let productToAdd = this.cartOrder[cartOrderPosition].products.find(
          (e) => e.id === productId
        );
        if (productToAdd) {
          productToAdd.quantity = productToAdd.quantity + product.quantity;
        } else {
          this.cartOrder[cartOrderPosition].products.push(product);
        }
        await fs.promises.writeFile(this.path, JSON.stringify(this.cartOrder));
      }
    } catch (error) {
      throw Error(
        `Error adding the product to the cart. Error detail: ${error}`
      );
    }
  };
}

export default CartManager;
