const socket = io();

const listHTML = document.getElementById("productList");

socket.on("list", (data) => {
  let productsHTML = "";
  data.products.forEach((product) => {
    productsHTML += `<li>${product.title} ----- id:${product.id}</li>`;
  });
  listHTML.innerHTML = productsHTML;
});
