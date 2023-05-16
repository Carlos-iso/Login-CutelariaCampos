'use strict';

//Selectors

const $email = document.querySelector(".email");
const $labelEmail = document.querySelector(".email-label");
let validEmail = false;

const $password = document.querySelector(".password");
const $labelPassword = document.querySelector(".password-label");
let validPassword = false;

//Functions Validate

const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+.)*\.\w+([-.]\w+)*$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

function validateEmail() {
  const $emailValue = $email.value.trim();
  if (emailRegex.test($emailValue)) {
    $labelEmail.setAttribute("style", "color: var(--cor7)");
    $labelEmail.innerHTML = "E-mail";
    $email.setAttribute("style", "border-bottom: 2px solid var(--cor7)");
    validEmail = true;
  } else {
    $labelEmail.setAttribute("style", "color: var(--cor9)");
    $labelEmail.innerHTML = "*E-mail Inválido*";
    $email.setAttribute("style", "border-bottom: 2px solid var(--cor9)");
    validEmail = false;
  }
}

function validatePassword() {
  const $passwordValue = $password.value.trim();
  if (passwordRegex.test($passwordValue)) {
    $labelPassword.setAttribute("style", "color: var(--cor7)");
    $labelPassword.innerHTML = "Senha";
    $password.setAttribute("style", "border-bottom: 2px solid var(--cor7)");
    validPassword = true;
  } else {
    $labelPassword.setAttribute("style", "color: var(--cor9)");
    $labelPassword.innerHTML = "*Senha Inválida*";
    $password.setAttribute("style", "border-bottom: 2px solid var(--cor9)");
    validPassword = false;
  }
}

//Blur Functions

function disabledInputEmail() {
  if ($email.value === "") {
    $labelEmail.setAttribute("style", "color: var(--cor0)");
    $labelEmail.innerHTML = "E-mail";
    $email.setAttribute("style", "border-bottom: 2px solid var(--cor0)");
    validEmail = false;
  }
}

function disabledInputPassword() {
  if ($password.value === "") {
    $labelPassword.setAttribute("style", "color: var(--cor0)");
    $labelPassword.innerHTML = "Senha";
    $password.setAttribute("style", "border-bottom: 2px solid var(--cor0)");
    validPassword = false;
  }
}

//Events Key

$email.addEventListener("input", validateEmail);
$email.addEventListener("blur", disabledInputEmail);
$password.addEventListener("input", validatePassword);
$password.addEventListener("blur", disabledInputPassword);