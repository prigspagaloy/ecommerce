import "./header.js";
import "./footer.js";

const footer = document.querySelector(".footer-section");
const webContent = document.querySelector(".web-content");

//console.log(screen.height - footer.offsetHeight)

export const styling = () => {
    webContent.style.minHeight = `${screen.height - footer.offsetHeight}px`;
}
styling();