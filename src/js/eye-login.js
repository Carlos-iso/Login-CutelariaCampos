'use strict';

let eyeClass = document.querySelector('.eye');
let inputPassword = document.querySelector('.password');

function eyePasswordLogin(){

    if (inputPassword.getAttribute('type') == 'password') {
        inputPassword.setAttribute('type', 'text');       
    } else {
        inputPassword.setAttribute('type', 'password'); 
    };
     
    if (inputPassword.getAttribute('type') == 'text') {
        eyeClass.setAttribute('src', './src/icons/eye-close.svg');
    } else {
        eyeClass.setAttribute('src', './src/icons/eye-open.svg');
    };
}


eyeClass.addEventListener('click', eyePasswordLogin);