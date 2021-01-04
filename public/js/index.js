
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

// image gallery
const galleryContainer = document.querySelector('.gallery-container');
const galleryControlsContainer = document.querySelector('.gallery-controls');
const galleryControls = ['previous', 'next'];
const galleryItems = document.querySelectorAll('.gallery-item');

class Carousel {
  constructor(container, items, controls) {
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
  }
  setInitialState() {
    this.carouselArray[0].classList.add('gallery-item-first');
    this.carouselArray[1].classList.add('gallery-item-second');
    this.carouselArray[2].classList.add('gallery-item-previous');
    this.carouselArray[3].classList.add('gallery-item-selected');
    this.carouselArray[4].classList.add('gallery-item-next');
    this.carouselArray[5].classList.add('gallery-item-secondlast');
    this.carouselArray[6].classList.add('gallery-item-last');

    document.querySelector('.gallery-nav').childNodes[0].className = 'gallery-nav-item gallery-item-first';
    document.querySelector('.gallery-nav').childNodes[1].className = 'gallery-nav-item gallery-item-second';
    document.querySelector('.gallery-nav').childNodes[2].className = 'gallery-nav-item gallery-item-previous';
    document.querySelector('.gallery-nav').childNodes[3].className = 'gallery-nav-item gallery-item-selected';
    document.querySelector('.gallery-nav').childNodes[4].className = 'gallery-nav-item gallery-item-next';
    document.querySelector('.gallery-nav').childNodes[5].className = 'gallery-nav-item gallery-item-secondlast';
    document.querySelector('.gallery-nav').childNodes[6].className = 'gallery-nav-item gallery-item-last';
  }

  setCurrentState(target, selected, previous, next, second, secondlast, first, last) {
    selected.forEach(el => {
      el.classList.remove('gallery-item-selected');
      if (target.className == 'gallery-controls-previous') {
        el.classList.add('gallery-item-next');
      } else {
        el.classList.add('gallery-item-previous');
      }
    });
    previous.forEach(el => {
      el.classList.remove('gallery-item-previous');
      if (target.className == 'gallery-controls-previous') {
        el.classList.add('gallery-item-selected');
      } else {
        el.classList.add('gallery-item-second');
      }
    });
    next.forEach(el => {
      el.classList.remove('gallery-item-next');
      if (target.className == 'gallery-controls-previous') {
        el.classList.add('gallery-item-secondlast');
      } else {
        el.classList.add('gallery-item-selected');
      }
    });
    second.forEach(el => {
      el.classList.remove('gallery-item-second');
      if (target.className == 'gallery-controls-previous') {
        el.classList.add('gallery-item-previous');
      } else {
        el.classList.add('gallery-item-first');
      }
    });
    secondlast.forEach(el => {
      el.classList.remove('gallery-item-secondlast');
      if (target.className == 'gallery-controls-previous') {
        el.classList.add('gallery-item-last');
      } else {
        el.classList.add('gallery-item-next');
      }
    });
    first.forEach(el => {
      el.classList.remove('gallery-item-first');
      if (target.className == 'gallery-controls-previous') {
        el.classList.add('gallery-item-second');
      } else {
        el.classList.add('gallery-item-last');
      }
    });
    last.forEach(el => {
      el.classList.remove('gallery-item-last');
      if (target.className == 'gallery-controls-previous') {
        el.classList.add('gallery-item-first');
      } else {
        el.classList.add('gallery-item-secondlast');
      }
    });
  }
  setNav() {
    galleryContainer.appendChild(document.createElement('ul')).className = 'gallery-nav';

    this.carouselArray.forEach(item => {
      const nav = galleryContainer.lastElementChild;
      nav.appendChild(document.createElement('li'));
    });
  }

  setControls() {
    this.carouselControls.forEach(control => {
      galleryControlsContainer.appendChild(document.createElement('button')).className = `gallery-controls-${control}`;
    });

    !!galleryControlsContainer.childNodes[0] ? galleryControlsContainer.childNodes[0].innerHTML = this.carouselControls[0] : null;
    !!galleryControlsContainer.childNodes[1] ? galleryControlsContainer.childNodes[1].innerHTML = this.carouselControls[1] : null;
  }

  useControls() {
    const triggers = [...galleryControlsContainer.childNodes];
    triggers.forEach(control => {
      control.addEventListener('click', () => {
        const target = control;
        const selectedItem = document.querySelectorAll('.gallery-item-selected');
        const previousSelectedItem = document.querySelectorAll('.gallery-item-previous');
        const nextSelectedItem = document.querySelectorAll('.gallery-item-next');
        const secondCarouselItem = document.querySelectorAll('.gallery-item-second');
        const secondlastCarouselItem = document.querySelectorAll('.gallery-item-secondlast');
        const firstCarouselItem = document.querySelectorAll('.gallery-item-first');
        const lastCarouselItem = document.querySelectorAll('.gallery-item-last');
        this.setCurrentState(target, selectedItem, previousSelectedItem, nextSelectedItem, secondCarouselItem, secondlastCarouselItem, firstCarouselItem, lastCarouselItem);
      });
    });
  }


}

const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

exampleCarousel.setControls();
exampleCarousel.setNav();
exampleCarousel.setInitialState();
exampleCarousel.useControls();

// image gallery ends
