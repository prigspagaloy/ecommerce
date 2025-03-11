import "./header.js";
// import { sampleProducts } from "./main.js";
import "./checkout.js";
import "./footer.js";

// fetch("https://fakestoreapi.com/products")

const fetchApi = fetch("https://fakestoreapi.com/products");

fetchApi.then(res => {
    return res.json();
}).then(json => {
    console.log(json)
}).catch(err => console.error(err));

const productInfoPage = document.querySelector(".product-info-page");