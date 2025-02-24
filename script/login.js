const form = document.getElementById("login-form");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", (e) => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "admin") {
    errorMessage.style.display = "none";
  } else {
    e.preventDefault();
    errorMessage.style.display = "block";
  }
});
