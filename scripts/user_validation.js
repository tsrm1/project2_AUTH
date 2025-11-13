const validationForm = document.querySelector("#validationForm");
const registeredUsers = JSON.parse(localStorage.getItem("users")) || [];
const logInInfo = document.querySelector("#log_in_info");

validationForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const enteredEmail = event.target.elements["email"].value;
  const enteredPass = event.target.elements["password"].value;

  console.log(enteredEmail);
  console.log(enteredPass);
  console.log(registeredUsers);

  let isLoginAndPassValid = registeredUsers.some((user) => {
    console.log(user.email, user.password);
    return user.email === enteredEmail && user.password === enteredPass;
  });

  console.log(`Email & Password ${isLoginAndPassValid ? "valid" : "invalid"}`);
  validationForm.reset();
  if (isLoginAndPassValid) {
    logInInfo.textContent = "Log in OK.";
    logInInfo.classList.remove("hidden");
  } else {
    logInInfo.textContent = "Wrong Email&Password!";
    logInInfo.classList.remove("hidden");
  }
});
