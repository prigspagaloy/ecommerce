import "./header.js";
import "./hamburger.js";
import "./footer.js";

const footer = document.querySelector(".footer-section");
const webContent = document.querySelector(".web-content");

//console.log(screen.height - footer.offsetHeight)

const styling = () => {
    webContent.style.minHeight = `${screen.height - footer.offsetHeight}px`;
}
styling();