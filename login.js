const login = document.getElementById("loginForm");

login.addEventListener("submit", function(event) {

event.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

window.location.href = "menu.html";
});