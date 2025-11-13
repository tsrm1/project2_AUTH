// Реализовать формы регистрации и логина.
// Данные зарегистрированных пользователей хранить в массиве объектов в localStorage.
// Для обеих форм сделать проверку на пустые поля при отправке.
// При вводе неверного логина или пароля выводить сообщение об ошибке.
// При успешном логине и регистрации выводит сообщение и очищать поля.

const registerForm = document.querySelector("#registerForm");
const users = JSON.parse(localStorage.getItem("users")) || [];

const nameAlert = document.querySelector("#name_alert");
const emailAlert = document.querySelector("#email_alert");
const phoneAlert = document.querySelector("#phone_alert");
const passAlert = document.querySelector("#pass_alert");
const signupInfo = document.querySelector("#signup_info");

// console.log(nameAlert, emailAlert, phoneAlert, passAlert, signupInfo);

function hasEmailInAList(email, list) {
  return list.some((user) => {
    return user.email === email;
  });
}

function checkStringLenght(text, min, max) {
  if (text.length >= min && text.length <= max) return true;
  return false;
}

function isDigit(str) {
  return /^[0-9]+$/.test(str);
}

function hasDigit(text) {
  for (let i = 0; i < text.length; i++) {
    if (text[i] >= "0" && text[i] <= "9") return true;
    // if (Number.isInteger(text[i] * 1)) return true;
    // if (text[i] * 1 || text[i] == 0) return true;
    // if (typeof (text[i] * 1) === "number") return true;
  }
  return false;
}

function isAlpha(str, lang = "en") {
  if (lang === "en") return /^[a-zA-Z]+$/.test(str);
  if (lang === "ru") return /^[а-яА-Я]+$/.test(str);
}
const specialSymbols = [
  // "-",
  ".",
  // "_",
  "!",
  // "+",
  // "@",
  // "#",
  // "%",
  // "^",
  "&",
  // "*",
  // "(",
  // ")",
  // "?",
  // "=",
  // "[",
  // "]",
  // "{",
  // "}",
  // "/",
  // "<",
  // ">",
];
function hasSpecialSymbols(text, symbols) {
  // console.log(text, symbols);
  if (!text || !symbols) return false;

  // for (let i = 0; i < text.length; i++) {
  //   for (let j = 0; j < symbols.length; j++)
  //     if (text[i] == symbols[j]) return true;
  // }
  // return false;

  return symbols.some((item) => text.includes(item));
}

// Имя {
//  Минимум 2 символа
//  Максимум 24 символа
//  Только буквы
// }
function validateName(name) {
  // console.log("validateName", name);
  let nameLengthFlag = checkStringLenght(name, 2, 24);
  let nameAlfaFlag = isAlpha(name);
  let totalFlag = nameLengthFlag && nameAlfaFlag;
  nameAlert.innerHTML = "";
  nameAlert.innerHTML += !nameLengthFlag
    ? `<li>Length 2 - 24 symbols</li>`
    : "";
  nameAlert.innerHTML += !nameAlfaFlag ? `<li>Only Alfabeth</li>` : "";
  console.log(
    `Name validation: Length: ${nameLengthFlag}, Alfabeth: ${nameAlfaFlag}`
  );
  if (!totalFlag) nameAlert.classList.remove("hidden");
  else nameAlert.classList.add("hidden");

  // checkStringLenght(name, 2, 24) && isAlpha(name)
  return totalFlag;
}
//  Эмейл {
//  Наличие символа@
//  Минимум 7 символов
// }
function validateEmail(email, users) {
  // console.log("validateEmail", email, users);
  let emailInListFlag = !hasEmailInAList(email, users);
  let emailLengthFlag = checkStringLenght(email, 7, 32);
  let emailSpecSymbolFlag = hasSpecialSymbols(email, ["@"]);

  let totalFlag = emailInListFlag && emailLengthFlag && emailSpecSymbolFlag;

  emailAlert.innerHTML = "";
  emailAlert.innerHTML += !emailLengthFlag
    ? `<li>Length 7 - 32 symbols</li>`
    : "";
  emailAlert.innerHTML += !emailInListFlag ? `<li>Emails is exsist</li>` : "";

  emailAlert.innerHTML += !emailSpecSymbolFlag
    ? `<li>Enter Special symbol</li>`
    : "";

  if (!totalFlag) emailAlert.classList.remove("hidden");
  else emailAlert.classList.add("hidden");

  console.log(
    `Email validation: Length: ${emailLengthFlag}, NewEmail: ${emailInListFlag}, HasSpesialSymbol: ${emailSpecSymbolFlag}`
  );
  return totalFlag;
  // emailInListFlag && emailLengthFlag && emailSpecSymbolFlag
  // !hasEmailInAList(email, users) &&
  // checkStringLenght(email, 7, 32) &&
  // hasSpecialSymbols(email, ["@"])
}
// Телефон {
//  Первый символ +
//  Максимум 12 чисел
//  Минимум 8 чисел
//  Только числа
// }
function validatePhone(phone) {
  // let plus = phone.shift();
  let plus = phone[0] || "";
  let tempPhone = phone.substring(1);
  // console.log(plus, tempPhone);
  let phoneLengthFlag = checkStringLenght(tempPhone, 7, 11);
  let phonePlusFlag = hasSpecialSymbols(plus, ["+"]);
  let phoneDigitsFlag = isDigit(tempPhone);

  let totalFlag = phoneLengthFlag && phonePlusFlag && phoneDigitsFlag;

  phoneAlert.innerHTML = "";
  phoneAlert.innerHTML += !phoneLengthFlag
    ? `<li>Length 7 - 11 digits</li>`
    : "";
  phoneAlert.innerHTML += !phonePlusFlag ? `<li>Enter +</li>` : "";

  phoneAlert.innerHTML += !phoneDigitsFlag ? `<li>Enter only digits</li>` : "";

  if (!totalFlag) phoneAlert.classList.remove("hidden");
  else phoneAlert.classList.add("hidden");

  console.log(
    `Phone validation: Length: ${phoneLengthFlag}, Plus: ${phonePlusFlag}, HasDigits: ${phoneDigitsFlag}`
  );

  return (
    phonePlusFlag && phoneLengthFlag && phoneDigitsFlag
    // hasSpecialSymbols(plus, ["+"]) &&
    // checkStringLenght(tempPhone, 7, 11) &&
    // isDigit(tempPhone)
  );
}
// Пароль {
//  Минимум 5 символов
//  максимум 26 символов
//  Спец символы ["!", ".", "&"]
// }
function validatePass(pass) {
  // console.log(pass);
  let passLengthFlag = checkStringLenght(pass, 5, 26);
  let passSpecSymbolFlag = hasSpecialSymbols(pass, specialSymbols);
  // let passSpecSymbolFlag = hasSpecialSymbols(pass, ["!", ".", "&"]);
  let passDigitFlag = hasDigit(pass);

  let totalFlag = passLengthFlag && passSpecSymbolFlag && passDigitFlag;

  passAlert.innerHTML = "";
  passAlert.innerHTML += !passLengthFlag
    ? `<li>Length 5 - 26 symbols</li>`
    : "";
  passAlert.innerHTML += !passSpecSymbolFlag
    ? `<li>Enter Special symbol</li>`
    : "";

  passAlert.innerHTML += !passDigitFlag ? `<li>Enter digit</li>` : "";

  if (!totalFlag) passAlert.classList.remove("hidden");
  else passAlert.classList.add("hidden");

  console.log(
    `Pass validation: Length: ${passLengthFlag}, HasSpesialSymbol: ${passSpecSymbolFlag}, HasDigit: ${passDigitFlag}`
  );

  return totalFlag;
  // passLengthFlag && passSpecSymbolFlag && passDigitFlag
  // checkStringLenght(pass, 5, 26) &&
  // // hasSpecialSymbols(pass, ["!", ".", "&"]) &&
  // hasSpecialSymbols(pass, specialSymbols) &&
  // hasDigit(pass)
}
function validateForm(name, email, phone, pass, users) {
  let nameFlag = validateName(name);
  let emailFlag = validateEmail(email, users);
  let phoneFlag = validatePhone(phone);
  let passFlag = validatePass(pass);
  console.log(
    `Form validation: ${nameFlag}, ${emailFlag}, ${phoneFlag}, ${passFlag}`
  );
  return (
    nameFlag && emailFlag && phoneFlag && passFlag
    // validateName(name) &&
    // validateEmail(email, users) &&
    // validatePhone(phone) &&
    // validatePass(pass)
  );
}
registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = event.target.elements["name"];
  const emailInput = event.target.elements["email"];
  const telephoneInput = event.target.elements["phone"];
  const passwordInput = event.target.elements["password"];

  let totalResult = validateForm(
    nameInput.value,
    emailInput.value,
    telephoneInput.value,
    passwordInput.value,
    users
  );
  if (totalResult) {
    const newUser = {
      name: nameInput.value,
      email: emailInput.value,
      phone: telephoneInput.value,
      password: passwordInput.value,
    };

    users.push(newUser);
    console.log(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    registerForm.reset();

    signupInfo.textContent = "Gratulation! Registerd.";
    signupInfo.classList.remove("hidden");
  } else signupInfo.classList.add("hidden");
});

// ******************************
// const newUser = {
//     login: loginInput.value,
//     password: passwordInput.value,
//   };
//   users.push(newUser);
//   console.log(newUser);

//   localStorage.setItem("users", JSON.stringify(users));
//   ********************************

// user with such email already has benn registered!

// 1) Валидация login: обязательное поле, от 2 - 16 символов, уникальное значение.
// 2) Валидация password: обязательное поле, от 8 символов, обязательное использование
// как минимум одного спец. символа("!", ".", "&")

// 2ое задание
// Имя {
//  Минимум 2 символа
//  Максимум 24 символа
//  Только буквы
// }
// Логин -> Эмейл {
//  Наличие символа@
//  Минимум 7 символов
// }
// Телефон {
//  Первый символ +
//  Максимум 12 чисел
//  Минимум 8 чисел
//  Только числа
// }
// Пароль {
//  Минимум 5 символов
//  максимум 26 символов
//  Спец символы ["!", ".", "&"]
// }

// для формы валидации
// Вход по имейл и пароль
