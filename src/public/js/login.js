const form = document.getElementById("loginForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  fetch("/api/sessions/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => {
    console.log(result);
    if (result.status === 200) {
      window.location.replace("/api/products");
    } else if (result.status === 401) {
      alert("Invalid credentials");
      window.location.replace("/users/login");
    }
  });
});
