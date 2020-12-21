const darkMode = document.querySelector(".dark-mode-btn");

darkMode.addEventListener("click", function () {
    const body = document.querySelector("body");

    body.classList.toggle("dark-mode");

    if (darkMode) {
        darkMode.innerText = body.classList.contains("dark-mode") ? "Light" : "Dark";
    }
});