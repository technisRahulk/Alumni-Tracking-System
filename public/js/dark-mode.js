// dark mode
const darkMode = document.querySelector("#dark-mode-cbox");


darkMode.addEventListener("click", () => {
    const body = document.querySelector("body");
    body.classList.toggle("dark-mode");
});
// dark mode ends