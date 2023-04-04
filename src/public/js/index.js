const socket = io();

const listHTML = document.getElementById("productList");
const addBox = document.getElementById("addBox");
const deleteBox = document.getElementById("deleteBox");

socket.on("list", (data) => {
  let productsHTML = "";
  data.products?.forEach((product) => {
    productsHTML += `<li>${product.title} ----- id:${product.id}</li>`;
  });
  listHTML.innerHTML = productsHTML;
});

addBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (addBox.value.trim().length > 0) {
      const productName = addBox.value.toString();
      socket.emit("newProduct", {
        title: productName.charAt(0).toUpperCase() + productName.slice(1),
        id: Date.now(),
      });
      addBox.value = "";
    }
  }
});

deleteBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (deleteBox.value.trim().length > 0) {
      socket.emit("deleteProduct", deleteBox.value);
      deleteBox.value = "";
    }
  }
});
