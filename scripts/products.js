import { header, cart, cartCount } from "./header.js";
import "./checkout.js";
import { footer } from "./footer.js";

fetch("https://fakestoreapi.com/products")
.then((res) => res.json())
.then((json) => {
categories(json);
})

const urlSearch = window.location.search;
const urlParams = new URLSearchParams(urlSearch);
const categoryValue = urlParams.get("data");

const productList = document.querySelector(".product-display");

const productDisplay = (data) => {
    productList.innerHTML = data.map(items => {
        //console.log(items)
        return (`
            <div class="product-content">
                <div class="product-img-container">
                    <img class="product-img" src="${items.image}">
                </div>
                <div class="product-info"> 
                    <div class="product-text-info">
                        <h4 class="product-name">${items.title}</h4>
                        <h2>$${items.price}</h2>
                    </div>
                    <button class="add-to-cart" data-name="${items.title}">Add to cart</button>
                </div>
            </div>
        `);
    }).join("");
    const addToCartBtn = document.querySelectorAll(".add-to-cart");
    addToCartBtn.forEach((button, index) => {
        button.addEventListener("click", () => {
            let sameItem;
            cart.forEach((item) => {
                if (data[index].id === item.productId) {
                sameItem = item;
                //console.log(sameItem)
                }
            });

            if (sameItem) {
                sameItem.quantity += 1;
            } else {
                cart.push({
                productId: data[index].id,
                img: data[index].image,
                title: data[index].title,
                price: data[index].price,
                quantity: 1,
                });
            }
            
            localStorage.setItem("data", JSON.stringify(cart));
            cartCount();
        });
    });
}

const categories = (data) => {
    const categoryList = document.querySelectorAll(".category-list");
    //console.log(data)
    const categoryFilter = data.filter(type => {
        //console.log(type.category)
        if (type.category.replace(/\W+/g, "") === categoryValue) {
            return type;
        }
    });
    if (window.location.href === `${window.location.origin}/pages/products.html?data=All`) {
        productDisplay(data);
    } else if (window.location.href === `${window.location.origin}/ecommerce/pages/products.html?data=All`) {
        productDisplay(data);
    } else {
        productDisplay(categoryFilter);
    }
    /* for (const value of categoryList.values()) {
        value.addEventListener("click", (e) => {
        const categoryValue = e.target.dataset.id;
        const categoryFilter = data.filter(type => {
            if (type.category === categoryValue) {
                return type;
            }
        });
        if (window.location.href === `/pages/products.html?data=All}`) {
            productDisplay(data);
           if (categoryValue === "All") {
                productDisplay(data);
              } else {
                productDisplay(categoryFilter);
              }
        } else {
            productDisplay(categoryFilter);
        }
        //console.log(window.location)
        })
    } */
}
//console.log(cart)