let signUpBtn = document.getElementById('sign');
let logInBtn = document.getElementById('create');
let mlogin=document.getElementById('mlogin');
let msignup=document.getElementById('msignup');
let togglePassword=document.getElementsByClassName('togglePassword');
let password=document.getElementsByClassName('password');

let signup_btn=document.getElementById('signup_btn')
let login_btn=document.getElementById('login_btn')


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

for(let i=0;i<togglePassword.length;i++)
{
		togglePassword[i].addEventListener('click',function(e){
		const type=password[i].getAttribute('type') === 'password' ?'text':'password';
		password[i].setAttribute('type',type);
		this.classList.toggle('fa-eye-slash');
	})
}


function check()
{
	let email = document.getElementById('login_email');
	let password = document.getElementById('login_pass');
	let semail=document.getElementById('signup_email');
	let spassword=document.getElementById('signup_pass');
	let username=document.getElementById('username');
		if((email.value.length!=''&&password.value!=''))
		{
			login_btn.disabled=false;
			login_btn.style.opacity=1;
		}
		else
		{
			login_btn.disabled=true;
			login_btn.style.opacity=0.5;
			}
		if(semail.value.length!=''&&spassword.value.length!=''&&username.value.length!='')
		{
			signup_btn.style.opacity=1;
			signup_btn.disabled=false;
		}
		else
		{
			signup_btn.style.opacity=0.5;
			signup_btn.disabled=true;
		}
}

