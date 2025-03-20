import "./header.js";
import "./hamburger.js";
import "./checkout.js";
import "./footer.js";

const fetchApi = fetch("https://fakestoreapi.com/products");

fetchApi.then(res => {
    return res.json();
}).then(json => {
    sameItem(json)
}).catch(err => console.error(err));

const productInfoPage = document.querySelector(".product-info-page");
let cart = JSON.parse(localStorage.getItem("data")) || [];
const cartCountDisplay = document.querySelector(".cart-count");

let cartCount = () => {
    let count = 0;
  
    let quantity = cart.map((item) => {
      return item.quantity;
    });
  
    quantity.forEach((item) => {
      return (count += item);
    });
  
    cart === undefined
      ? (cartCountDisplay.innerHTML = 0)
      : (cartCountDisplay.innerHTML = count);
  };
  cartCount();

const sameItem = (data) => {
    //console.log(data)
    const url = window.location.search;
    const usp = new URLSearchParams(url);
    //console.log(usp.get("data").toString())
    const itemInfo = data.filter(item => {
        //console.log(item.title)
        if (usp.get("data") == item.id) {
            //console.log(item)
            return item;
        }
    })
    itemDisplay(itemInfo, data);
}

const itemDisplay = (itemInfo, data) => {
    //console.log(itemInfo)
    productInfoPage.innerHTML = `
        <div class="info-page-product-container">
            <div class="info-page-img-container">
                <img class="info-page-img" src="${itemInfo[0].image}">
            </div>
            <div class="product-detail-container">
                <h1>${itemInfo[0].title}</h1>
                <h1>$${itemInfo[0].price}</h1>
                <div class="quantity-count-box">
                    <button class="decrement" data-id="${itemInfo[0].id}">-</button>
                    <p class="quantity-count">0</p>
                    <button class="increment" data-id="${itemInfo[0].id}">+</button>
                </div>
                <div class="product-info-page-btns">
                    <button id="add-to-cart" class="info-page-btn" data-id="${itemInfo[0].id}">Add to cart</button>
                    <button id="buy-now" class="info-page-btn">Buy now</button>
                </div>
                <h5>Description:</h5>
                <p>${itemInfo[0].description}</p>
            </div>
        </div>
    `;
    const incrementItem = document.querySelector(".increment");
    const decrementItem = document.querySelector(".decrement");
    const quantityCount = document.querySelector(".quantity-count");
    const addToCartBtn = document.getElementById("add-to-cart");
    incrementQty(incrementItem, quantityCount);
    decrementQty(decrementItem, quantityCount);
    addToCart(addToCartBtn, quantityCount, data);
}

let count = 0;

const decrementQty = (decrementItem, quantityCount) => {
    decrementItem.addEventListener("click", (e) => {
        const decrementBtn = e.target.dataset.id;
        if (quantityCount.textContent == 0) {
            return;
        } else {
            count--;
            quantityCount.textContent = count;
        }
    })
}

const incrementQty = (incrementItem, quantityCount) => {
    incrementItem.addEventListener("click", (e) => {
        const incrementBtn = e.target.dataset.id;
        count++;
        quantityCount.textContent = count;
    })
}

const addToCart = (addToCartBtn, quantityCount, data) => {
    console.log(data)
    addToCartBtn.addEventListener("click", (e) => {
        const addToCartBtnId = e.target.dataset.id;
        const qtyCount = parseInt(quantityCount.textContent);
        let sameItem;
        const dataItem = data.filter(item => {
            if (addToCartBtnId == item.id) {
                return item;
            }
        })
        cart.forEach(item => {
            if (addToCartBtnId == item.productId) {
                sameItem = item;
            }
        })
        //console.log(sameItem)
        if (qtyCount === 0) {
            return;
        }
        if (sameItem) {
            sameItem.quantity += qtyCount;
        } else {
            cart.push({
                productId: dataItem[0].id,
                img: dataItem[0].image,
                title: dataItem[0].title,
                price: dataItem[0].price,
                quantity: qtyCount,
            })
        }
        localStorage.setItem("data", JSON.stringify(cart));
        cartCount();
    })
}

console.log(cart)