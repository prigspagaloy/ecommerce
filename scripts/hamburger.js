import { hamburger } from "./header.js";
import { burgerLine } from "./header.js";
import { menuSection } from "./header.js";

hamburger.addEventListener("click", () => {
    burgerLine.classList.toggle("active");
    menuSection.classList.toggle("show");
  })