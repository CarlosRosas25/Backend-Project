const logout = document.getElementById("Logout");

logout.addEventListener("click", (event) => {
  event.preventDefault();
  fetch("/api/jwt/logout", {
    method: "GET",
  }).then((result) => {
    if (result.status === 201) {
      window.location.replace("/users/login");
    }
  });
});
