const users = JSON.parse(localStorage.getItem("users")) || [];
const authToken = JSON.parse(localStorage.getItem("authToken")) || {};
const navHomeLink = document.querySelector(".nav-home");
const navRegisterLink = document.querySelector(".nav-register");
const navLoginLink = document.querySelector(".nav-login");
const navLogoutLink = document.querySelector(".nav-logout");
const navUsernameLink = document.querySelector(".nav-user");

function getUserByEmail(email, list) {
  for (let i = 0; i < list.length; i++) {
    if (email === list[i].email) return list[i];
  }
  return null;
}

function getUserByauthToken(token, list) {
  for (let i = 0; i < list.length; i++) {
    if (token === list[i].token) return list[i];
  }
  return null;
}

function setNavBarUserName(name) {
  console.log(`navUsernameLink: ${navUsernameLink}`);
  navUsernameLink.textContent = `Hi, ${name}`;
}

navLogoutLink.addEventListener("click", (event) => {
  event.preventDefault();
  localStorage.removeItem("authToken");
  location.pathname = "/";
});

document.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  console.log(`authToken.authToken: ${authToken.authToken}`);
  if (authToken.authToken) {
    let tempName = getUserByauthToken(authToken.authToken, users).name;
    if (tempName) {
      navRegisterLink.classList.add("hidden");
      navLoginLink.classList.add("hidden");
      navLogoutLink.classList.remove("hidden");
      navUsernameLink.classList.remove("hidden");
      setNavBarUserName(tempName);
    } else localStorage.removeItem("authToken");
  } else {
    navRegisterLink.classList.remove("hidden");
    navLoginLink.classList.remove("hidden");
    navLogoutLink.classList.add("hidden");
    navUsernameLink.classList.add("hidden");
    //setNavBarUserName("");
  }

  console.log(window.location.href);
  const path = window.location.href.split("/");
  let fileName = path[path.length - 1];
  console.log(fileName);
  if (fileName === "") navHomeLink.style.color = "yellow";
  if (fileName === "register.html") navRegisterLink.style.color = "yellow";
  if (fileName === "login.html") navLoginLink.style.color = "yellow";
});
// ************************************************************************************************
