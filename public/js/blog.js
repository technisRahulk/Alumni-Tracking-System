let sec1=document.getElementById("sec1");
let sec2=document.getElementById("sec2");
let sec3=document.getElementById("sec3");



window.addEventListener("resize", checksize);
if(screen.width < 960)
  {
  sec2.classList.remove("disp2_off");
  sec2.classList.add("disp2_on");
  sec1.classList.add("disp2_off");
  sec3.classList.add("disp2_off");
}
let pw=screen.width;
function checksize(){
  if(pw!=screen.width&&screen.width < 960)
  {
	sec2.classList.remove("disp2_off");
	sec2.classList.add("disp2_on");
	sec1.classList.add("disp2_off");
	sec3.classList.add("disp2_off");
  document.querySelectorAll('.btn').forEach(el => el.classList.remove("active"));
  document.getElementById("btn1").classList.add("active");
  }
  else if(pw!=screen.width)
  {
  sec1.classList.remove("disp2_off");
  sec2.classList.remove("disp2_off");
  sec3.classList.remove("disp2_off");
  }
  pw=screen.width;
}
function btn1(){
	sec2.classList.remove("disp2_off");
	sec2.classList.add("disp2_on");
	sec1.classList.add("disp2_off");
	sec3.classList.add("disp2_off");
  document.querySelectorAll('.btn').forEach(el => el.classList.remove("active"));
  document.getElementById("btn1").classList.add("active");
}


function btn2(){
  sec1.classList.remove("disp2_off");
  	sec1.classList.add("disp2_on");
	sec2.classList.add("disp2_off");
  sec3.classList.add("disp2_off");
  document.querySelectorAll('.btn').forEach(el => el.classList.remove("active"));
  document.getElementById("btn2").classList.add("active");
}
function btn3(){
	sec1.classList.add("disp2_off");
  sec2.classList.add("disp2_off");
  sec3.classList.remove("disp2_off");
  sec3.classList.add("disp2_on");
  document.querySelectorAll('.btn').forEach(el => el.classList.remove("active"));
  document.getElementById("btn3").classList.add("active");
}