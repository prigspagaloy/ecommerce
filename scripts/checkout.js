import "./header.js";
import "./hamburger.js";
import "./footer.js";

const footer = document.querySelector(".footer-section");
const webContent = document.querySelector(".web-content");
let cart = JSON.parse(localStorage.getItem("data")) || [];

//console.log(screen.height - footer.offsetHeight)

const styling = () => {
    webContent.style.minHeight = `${screen.height - footer.offsetHeight}px`;
}
styling();

const checkoutProductInfo = document.querySelector(".checkout-product-info");

const checkoutDisplay = () => {
    checkoutProductInfo.innerHTML = cart.map(items => {
        //console.log(items)
        return `
            <div class="checkout-product-info-container">
                <div class="checkout-img-box">
                    <img class="checkout-img" src="${items.img}">
                </div>
                <div class="checkout-product-info">
                    <div class="checkout-title">
                        <p class="checkout-title-text">${items.title}<span class="checkout-quantity">x${items.quantity}</span></p>
                    </div>
                    <p class="total-items-price">$${(items.price * items.quantity).toFixed(2)}</p>
                </div>
            </div>
        `;
    }).join("");
    const totalPriceText = document.querySelector(".total-price-text");
    const itemsContainer = document.querySelectorAll(".checkout-product-info-container");
    //console.log(totalItemPrice)

    let checkoutTotal = 0;
    for (let i = 0; i < cart.length; i++) {
        let itemsTotal = cart[i].price * cart[i].quantity;
        checkoutTotal += itemsTotal;
    }
    totalPriceText.textContent = "Total price to pay: " + "$" + checkoutTotal.toFixed(2);
}
checkoutDisplay();