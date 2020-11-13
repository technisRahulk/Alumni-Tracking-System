let slideIndex,
    slides = document.querySelectorAll(".image-container"),
    dots = [],
    dotsContainer = document.querySelector("#dots-container"),
    leftArrowClick = document.querySelector(".sOne-left-arrow"),
    rightArrowClick = document.querySelector(".sOne-right-arrow");

function initCarouselOne() {
    slideIndex = 0;
    slides[slideIndex].style.opacity = 1;

    for (let i = 0; i < slides.length; i++) {
        let dot = document.createElement("span");
        dot.classList.add("dots");
        dot.setAttribute("onclick", "moveSlide(" + i + ")");
        dotsContainer.append(dot);
        dots.push(dot);
    }
    dots[slideIndex].classList.add("active");

}


function adjecentSlides(n) {
    moveSlide(slideIndex + n);
}

function moveSlide(n) {

    let i, current, next;
    let moveSlideAnimeClass = {
        forCurrent: "",
        forNext: ""
    }
    if (n > slideIndex) {
        if (n >= slides.length) { n = 0; }
        moveSlideAnimeClass.forCurrent = "moveLeftCurrentSlide";
        moveSlideAnimeClass.forNext = "moveLeftNextSlide";
    }
    else if (n < slideIndex) {
        if (n < 0) { n = slides.length - 1; }
        moveSlideAnimeClass.forCurrent = "moveRightCurrentSlide";
        moveSlideAnimeClass.forNext = "moveRightNextSlide";

    }
    if (n != slideIndex) {
        next = slides[n];
        current = slides[slideIndex];
        for (i = 0; i < slides.length; i++) {
            slides[i].className = "image-container";
            slides[i].style.opacity = 0;
            dots[i].classList.remove("active");
        }
        current.classList.add(moveSlideAnimeClass.forCurrent);
        next.classList.add(moveSlideAnimeClass.forNext);
        dots[n].classList.add("active");
        slideIndex = n;
    }
}

let sOneTimer = setInterval(function () {
    adjecentSlides(1);
}, 5000);

// function calls
initCarouselOne();

leftArrowClick.addEventListener("click", function () {
    clearInterval(sOneTimer);
    sOneTimer = setInterval(function () {
        adjecentSlides(1);
    }, 5000);
    adjecentSlides(-1);
});

rightArrowClick.addEventListener("click", function () {
    clearInterval(sOneTimer);
    sOneTimer = setInterval(function () {
        adjecentSlides(1);
    }, 5000);
    adjecentSlides(1);
});