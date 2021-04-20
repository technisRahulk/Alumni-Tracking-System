let sec1=document.getElementById("sec1");
let sec2=document.getElementById("sec2");
let sec3=document.getElementById("sec3");
let createBlog=document.getElementById("tab1");
let thumbsUp=document.getElementById("thumbs");
let bookmark=document.getElementById("bookmark");


window.addEventListener("resize", checksize);
if(screen.width < 960)
  {
  sec2.classList.remove("disp2_off","margin");
  sec2.classList.add("disp2_on");
  sec1.classList.add("disp2_off");
  sec3.classList.add("disp2_off");
  sec1.classList.remove("margin");
  sec3.classList.remove("margin");
  createBlog.classList.add("disp2_off");
}
let pw=screen.width;
function checksize(){
  if(screen.width < 960)
  {
	sec2.classList.remove("disp2_off","margin");
	sec2.classList.add("disp2_on");
	sec1.classList.add("disp2_off");
	sec3.classList.add("disp2_off");
  sec1.classList.remove("margin");
  sec3.classList.remove("margin");
  createBlog.style.display="none";
  document.querySelectorAll('.btn').forEach(el => el.classList.remove("active"));
  document.getElementById("btn2").classList.add("active");
  }
  else
  {
  sec1.classList.remove("disp2_off");
  sec2.classList.remove("disp2_off");
  sec3.classList.remove("disp2_off");
  sec1.classList.add("margin");
  sec2.classList.add("margin");
  sec3.classList.add("margin");
  createBlog.style.display="block";
  }
  pw=screen.width;
}

thumbsUp.addEventListener("click", function()
{
  if(this.children[0].style.color=="black")
    this.children[0].style.color="#4169e1";
  else
  this.children[0].style.color="black";
})

bookmark.addEventListener("click", function()
{
  if(this.children[0].style.color=="black")
    this.children[0].style.color="#4169e1";
  else
  this.children[0].style.color="black";
})

function btn2(){
	sec2.classList.remove("disp2_off");
	sec2.classList.add("disp2_on");
	sec1.classList.add("disp2_off");
	sec3.classList.add("disp2_off");
  document.querySelectorAll('.btn').forEach(el => el.classList.remove("active"));
  document.getElementById("btn2").classList.add("active");
}
function btn3(){
  sec1.classList.remove("disp2_off");
  sec1.classList.add("disp2_on");
	sec2.classList.add("disp2_off");
  sec3.classList.add("disp2_off");
  document.querySelectorAll('.btn').forEach(el => el.classList.remove("active"));
  document.getElementById("btn3").classList.add("active");
}
function btn4(){
	sec1.classList.add("disp2_off");
  sec2.classList.add("disp2_off");
  sec3.classList.remove("disp2_off");
  sec3.classList.add("disp2_on");
  document.querySelectorAll('.btn').forEach(el => el.classList.remove("active"));
  document.getElementById("btn4").classList.add("active");
}

// $(function() {
//   $( "i" ).click(function() {
//     $( "i" ).toggleClass( "press", 1000 );
//   });
// });