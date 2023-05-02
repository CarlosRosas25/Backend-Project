const logout = document.getElementById("Logout");

logout.addEventListener("click", (event) => {
  event.preventDefault();
  fetch("/api/sessions/logout", {
    method: "GET",
  }).then((result) => {
    if (result.status === 201) {
      window.location.replace("/users/login");
    }
  });
});
