const form = document.getElementById("loginForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => {
    if (result.status === 200) {
      result.json().then((json) => {
        console.log(json);
        //localStorage.setItem("authToken", json.jwt);
        console.log("Cookies generadas:");
        console.log(document.cookie);
        alert("Successful login!");
        window.location.replace("/api/products");
      });
    } else if (result.status === 401) {
      alert("Invalid credentials");
      window.location.replace("/users/login");
    }
  });
});
