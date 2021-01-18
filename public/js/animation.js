
//**********************************************************//
const flightPath ={
        curviness:1.25,
        autoRotate: true,
        values: [
        { x: 1710, y: -730 }, 
        { x: 1730, y: -800 },
        { x: 1780, y: -830 },
        { x: 1800, y: -850 },
        {x:window.innerWidth,y:-1400}]
        
       }
      
const tween = new TimelineLite();
      
        tween.add(
        TweenLite.to(".paper-plane",1, {
            bezier:flightPath,
            ease:Power1.easeInOut,
            
        })
        );
     
    
const controller = new ScrollMagic.Controller();

const scene = new ScrollMagic.Scene({
        triggerElement: ".animation",
        duration:1500,
        triggerHook:0,

      })

      .setTween(tween)
      .setPin(".animation")
      .addTo(controller);


//animation of scrolling//


$(window).scroll(function(){ 
  
  if($(window).scrollTop() >= 840 ){ 
      $( "#pop1" ).css( "display", "block" ); 
 
  }
  else { 
      
     $( "#pop1" ).css( "display", "none" ); 
  } 
}); 
$(window).scroll(function(){ 
 
   if($(window).scrollTop() >= 965 ){ 
      $( "#pop2" ).css( "display", "block" ); 
 
 
  } 
  else { 
      
     $( "#pop2" ).css( "display", "none" ); 
  } 
  
});
$(window).scroll(function(){ 
  
  
  if($(window).scrollTop() >= 1030 ){ 
      $( "#pop3" ).css( "display", "block" ); 
 

  } 
  else { 
      
     $( "#pop3" ).css( "display", "none" ); 
  } 
});  
//*********************annimation javascript ends here***************************************//
