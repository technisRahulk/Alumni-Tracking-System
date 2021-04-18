
window.onload=function checkurl(){
  let path=window.location.pathname.toString();
  
  if(path=='/')
  {
  	document.getElementById("#home").className="active";
  }
  if(path=='/blog')
  {
  	document.getElementById("#blog").className="active";	
  }
  if(path=='/profile')
  {
  	document.getElementById("#profile").className="active";	
  }

  if(path=='/about')
  {
  	document.getElementById("#about").className="active";	
  }
}