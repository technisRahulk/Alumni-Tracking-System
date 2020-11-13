let signUpBtn = document.getElementById('sign');
let logInBtn = document.getElementById('create');

function logIn(){
    signUpBtn.style.zIndex="2";
    logInBtn.style.opacity="0";

    logInBtn.style.zIndex="1";
    signUpBtn.style.opacity="1";
}
function signIn(){
    logInBtn.style.zIndex="2";
    signUpBtn.style.opacity="0";

    signUpBtn.style.zIndex="1";
    logInBtn.style.opacity="1";
}