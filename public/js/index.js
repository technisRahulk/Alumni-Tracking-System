//toggle navbar
const toggleButton = document.getElementsByClassName('toggle-button')[0];
            const navbarLinks = document.getElementsByClassName('navbar-links')[0];

            toggleButton.addEventListener('click', () => {
                navbarLinks.classList.toggle('active');
            });

// Top slider
let slideIndex,
  slides = document.querySelectorAll(".image-container");

slideIndex = 0;
slides[slideIndex].style.opacity = 1;

function moveSlide() {

  let i, current, next;
  let n = slideIndex + 1;
  let moveSlideAnimeClass = {
    forCurrent: "",
    forNext: ""
  }

  if (n >= slides.length) { n = 0; }
  moveSlideAnimeClass.forCurrent = "moveLeftCurrentSlide";
  moveSlideAnimeClass.forNext = "moveLeftNextSlide";

  if (n != slideIndex) {
    next = slides[n];
    current = slides[slideIndex];
    for (i = 0; i < slides.length; i++) {
      slides[i].className = "image-container";
      slides[i].style.opacity = 0;
    }
    current.classList.add(moveSlideAnimeClass.forCurrent);
    next.classList.add(moveSlideAnimeClass.forNext);
    slideIndex = n;
  }
}
setInterval(function () {
  moveSlide();
}, 5000);
// top slider ends
