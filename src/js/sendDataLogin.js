"use strict";

const loader = document.querySelector(".loader");
const $btmEnter = document.querySelector(".btn-enter");
const $msgerror = document.querySelector(".msgerror");
const $msgsuccess = document.querySelector(".msgsuccess");
const urlLocal = "http://localhost:3000";
const urlRender = "https://api-cutelariacampos.onrender.com";
const urlBase = urlRender;
const urlNetlify = "https://login.carloscoding.dev.br";
let invalidFileld = "Campos Inválidos";
let $msg = "Erro";
let $token = "Token";
let $data = "Data User";

async function validForm() {
  showLoader();
  if (validEmail === true && validPassword === true) {
    let $emailValue = $email.value.toLowerCase();
    let $passwordValue = $password.value.replace(" ", "");

    let jsonDataCustomer = JSON.stringify({
      email: $emailValue,
      password: $passwordValue,
    });
    try {
      const response = await fetch(`${urlBase}/account/login`, {
        method: "POST",
        body: jsonDataCustomer,
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        $data = Object.values(data.data);
        localStorage.setItem("data_user", $data);
        $msg = data.message;
        msgSuccessText();
        msgSuccessStyle();
        saveHeaderToken();
      } else {
        $msg = data.message;
        msgErrorText();
        msgErrorStyle();
      }
    } catch (e) {
      $msg = "Falha Na Comunicação Com O Servidor!";
      msgErrorText();
      msgErrorStyle();
    }
  } else {
    $msg = invalidFileld;
    msgErrorStyle();
    msgErrorText();
  }
  hideLoader();
}

function colorsBadRequest() {
  $labelEmail.setAttribute("style", "color: var(--cor9)");
  $email.setAttribute("style", "border-bottom: 2px solid var(--cor9)");
  $labelPassword.setAttribute("style", "color: var(--cor9)");
  $password.setAttribute("style", "border-bottom: 2px solid var(--cor9)");
}

function colorsGoodRequest() {
  $labelEmail.setAttribute("style", "color: var(--cor7)");
  $email.setAttribute("style", "border-bottom: 2px solid var(--cor7)");
  $labelPassword.setAttribute("style", "color: var(--cor7)");
  $password.setAttribute("style", "border-bottom: 2px solid var(--cor7)");
}

function intervalNext() {
  setInterval((window.location.href = "urlHome"), 3000);
}

function msgSuccessText() {
  $msgsuccess.innerHTML = `<strong>${$msg}</strong>`;
}

function msgSuccessStyle() {
  $msgsuccess.setAttribute("style", "display: block");
  $msgerror.setAttribute("style", "display: none");
  $msgerror.innerHTML = "";
  colorsBadRequest();
  resetFilds();
}

function msgErrorText() {
  $msgerror.innerHTML = `<strong>${$msg}</strong>`;
}

function msgErrorStyle() {
  $msgsuccess.setAttribute("style", "display: none");
  $msgsuccess.innerHTML = "";
  $msgerror.setAttribute("style", "display: block");
  colorsBadRequest();
}

function showLoader() {
  loader.style.display = "flex";
}

function hideLoader() {
  loader.style.display = "none";
}

function hideMsg() {
  if ($msgerror || $msgsuccess.style.display == "block") {
    $msgerror.setAttribute("style", "display: none");
    $msgsuccess.setAttribute("style", "display: none");
    return;
  }
}

function resetFilds() {
  $email.value = "";
  disabledInputEmail();
  $password.value = "";
  disabledInputPassword();
}

async function saveHeaderToken() {
  const token = await localStorage.getItem("token");
  const patchHeader = {
    method: "GET",
    headers: {
      "x-access-token": token,
      "Content-Type": "application/json",
    },
  };
  await fetch(`${urlNetlify}`, patchHeader).catch((err) => console.log(err));
}

$btmEnter.addEventListener("click", () => {
  hideMsg();
  validForm();
});
