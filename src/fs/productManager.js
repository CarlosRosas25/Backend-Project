import fs from "fs";

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  addProduct = async (
    title,
    description,
    price,
    thumbnails,
    code,
    stock,
    status,
    category
  ) => {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(products);

      if (this.products.find((e) => e.code === code)) {
        console.log("Error! Can't add an existing product.");
      } else {
        this.products.push({
          id: Date.now(),
          title: title,
          description: description,
          price: price,
          thumbnails: thumbnails,
          code: code,
          stock: stock,
          status: status,
          category: category,
        });
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
      }
    } catch (error) {
      throw Error(`Error adding a new product. Error detail: ${error}`);
    }
  };

  getProducts = async () => {
    try {
      if (!fs.existsSync(this.path)) {
        await fs.promises.writeFile(this.path, "[]");
      }

      let products = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(products);
      return this.products;
    } catch (error) {
      throw Error(`Error reading products. Error detail: ${error}`);
    }
  };

  getProductById = async (id) => {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(products);

      let productFound = this.products.find((e) => e.id === id);

      if (productFound) {
        return productFound;
      } else {
        console.log("Product not found");
      }
    } catch (error) {
      throw Error(`Error reading the specific product. Error detail: ${error}`);
    }
  };

  updateProduct = async (id, productToUpdate) => {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(products);

      const productPosition = this.products.findIndex(
        (e) => e.id === parseInt(id)
      );

      if (productPosition >= 0) {
        productToUpdate.id = this.products[productPosition].id;
        this.products[productPosition] = productToUpdate;
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
      } else {
        console.log("Couldn't find the product to update");
      }
    } catch (error) {
      throw Error(
        `Error updating the specific product. Error detail: ${error}`
      );
    }
  };

  deleteProduct = async (id) => {
    try {
      let products = await fs.promises.readFile(this.path, "utf-8");
      this.products = JSON.parse(products);

      const productPosition = this.products.findIndex(
        (e) => e.id === parseInt(id)
      );

      if (productPosition >= 0) {
        this.products.splice(productPosition, 1);
        await fs.promises.writeFile(this.path, JSON.stringify(this.products));
      } else {
        console.log("Couldn't find the product to delete");
      }
    } catch (error) {
      throw Error(
        `Error deleting the specific product. Error detail: ${error}`
      );
    }
  };
}

export default ProductManager;

/* 
[
  {
    "id": 1678737641621,
    "title": "Chemex",
    "description": "A pour-over method, which means that the water passes through a bed of coffee and a filter.",
    "price": 46,
    "thumbnail": "Sin imagen",
    "code": "coffeemaker1",
    "stock": 12
  },
  {
    "id": 1678737641622,
    "title": "French press",
    "description": "A manual coffee maker with a cylindrical carafe.",
    "price": 38,
    "thumbnail": "Sin imagen",
    "code": "coffeemaker2",
    "stock": 19
  },
  {
    "id": 1678737641623,
    "title": "Moka pot",
    "description": "A stovetop coffee maker used to make espresso-like coffee.",
    "price": 45,
    "thumbnail": "Sin imagen",
    "code": "coffeemaker3",
    "stock": 31
  },
  {
    "id": 1678737641624,
    "title": "AirScape coffee storage",
    "description": "Large food container patented airtight lid 2-way valve.",
    "price": 42,
    "thumbnail": "Sin imagen",
    "code": "accessories1",
    "stock": 23
  },
  {
    "id": 1678737641625,
    "title": "Coffee scale with timer",
    "description": "Black mirror basic PRO coffee scale with timer.",
    "price": 68,
    "thumbnail": "Sin imagen",
    "code": "accessories2",
    "stock": 14
  },
  {
    "id": 1678737641626,
    "title": "Knock box",
    "description": "Tap your portafilter against the knock bar and directly into the 650ml knock box.",
    "price": 18,
    "thumbnail": "Sin imagen",
    "code": "accessories3",
    "stock": 7
  },
  {
    "id": 1678737641627,
    "title": "Manual coffee grinder",
    "description": "Portable mill faster grinding efficiency espresso to coarse for italian coffee.",
    "price": 124,
    "thumbnail": "Sin imagen",
    "code": "accessories4",
    "stock": 7
  },
  {
    "id": 1678737641628,
    "title": "Eight O'Clock Ground Coffee",
    "description": "Medium roast ground coffee, 100% Arabica. The bag contains 36 ounce of The Original coffee.",
    "price": 15,
    "thumbnail": "Sin imagen",
    "code": "coffee1",
    "stock": 16
  },
  {
    "id": 1678737641629,
    "title": "San Francisco Bay Coffee DECAF",
    "description": "Medium roast swiss water processed decaffeinated coffee. The bag contains 32 ounce of DECAF Gourmet Blend.",
    "price": 25,
    "thumbnail": "Sin imagen",
    "code": "coffee2",
    "stock": 8
  },
  {
    "id": 1678737641630,
    "title": "Stumptown Coffee Roasters",
    "description": "Medium roast organic whole bean coffee. The bag contains 12 ounce of Holler Mountain coffee.",
    "price": 16,
    "thumbnail": "Sin imagen",
    "code": "coffee3",
    "stock": 22
  }
]
*/
