let signUpBtn = document.getElementById('sign');
let logInBtn = document.getElementById('create');
// const container = document.getElementById('container');

// signUpButton.addEventListener('click', () => {
// 	container.classList.add("right-panel-active");
// });

// signInButton.addEventListener('click', () => {
// 	container.classList.remove("right-panel-active");
// });


// signupBtn.onclick = (()=>{
//     loginForm.style.marginLeft = "-50%";
//     loginText.style.marginLeft = "-50%";
//   });
//   signinBtn.onclick = (()=>{
//     loginForm.style.marginLeft = "0%";
//     loginText.style.marginLeft = "0%";
//   });



// $('.tab a').on('click', function (e) {
  
//     e.preventDefault();
    
//     $(this).parent().addClass('active');
//     $(this).parent().siblings().removeClass('active');
    
//     target = $(this).attr('href');
  
//     $('.tab-content > div').not(target).hide();
    
//     $(target).fadeIn(600);
    
//   });

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