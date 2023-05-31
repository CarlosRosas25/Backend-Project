const form = document.getElementById("registerForm");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const obj = {};
  data.forEach((value, key) => (obj[key] = value));
  fetch("/api/jwt/register", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((result) => {
    if (result.status === 201) {
      result.json();
      alert("User created successfully!!!");
      window.location.replace("/users/login");
    } else if (result.status === 401) {
      alert("User already exists");
    }
  });
});
