let signUpBtn = document.getElementById('sign');
let logInBtn = document.getElementById('create');
let mlogin=document.getElementById('mlogin');
let msignup=document.getElementById('msignup');

function logIn(){
    signUpBtn.style.zIndex="2";
    logInBtn.style.opacity="0";
    msignup.style.backgroundColor="#a3d8f4"

    logInBtn.style.zIndex="1";
    signUpBtn.style.opacity="1";
    mlogin.style.backgroundColor="#9ab3f5"
}
function signIn(){
    logInBtn.style.zIndex="2";
    signUpBtn.style.opacity="0";
    mlogin.style.backgroundColor="#a3d8f4"

    msignup.style.backgroundColor="#9ab3f5"
    signUpBtn.style.zIndex="1";
    logInBtn.style.opacity="1";
}