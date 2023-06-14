const logout = document.getElementById("Logout");

logout.addEventListener("click", (event) => {
  event.preventDefault();
  fetch("/api/users/logout", {
    method: "GET",
  }).then((result) => {
    if (result.status === 201) {
      window.location.replace("/api/users/login");
    } else {
      alert("Couldn't logout");
    }
  });
});
