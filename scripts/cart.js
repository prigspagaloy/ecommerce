import "./header.js";
import { styling } from "./checkout.js";
import "./footer.js";

const headerSection = document.querySelector(".header-section");
let cart = JSON.parse(localStorage.getItem("data")) || [];
const cartCountDisplay = document.querySelector(".cart-count");
let cartProducts = document.querySelector(".cart-display");

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

window.onload = () => {
  cartDisplay();
}

const cartDisplay = () => {
  if (cart.length === 0) {
    cartProducts.innerHTML = `
        <h1 class="cart-empty">YOUR CART IS EMPTY</h1>
    `;
  } else {
    cartProducts.innerHTML = `<h1 class="cart-title">Shopping Cart</h1>`;
    cartProducts.innerHTML += cart
      .map((items) => {
        return `
            <div class="cart-product-container">
              <div class="cart-product-img-container">
                    <img class="cart-product-img" src="${items.img}">
              </div>
              <div class="cart-product-info-box">
                <div class="cart-product-info">
                  <div class="price-container">
                    <h4 class="cart-product-name">${items.title}</h4>
                    <span><h1 class="subtotal-price">$${items.price.toFixed(2)}</h1></span>
                  </div>
                  <div class="quantity-container">
                    <div class="quantity-count">
                      <button data-id="${items.productId}" class="cart-decrease-quantity">-</button>
                      <h3 id="${items.productId}" class="cart-product-quantity">${items.quantity}</h3>
                      <button data-id="${items.productId}" class="cart-increase-quantity">+</button>
                    </div>
                        <span data-id="${items.productId}" class="delete-item">DELETE</span>
                  </div>
                </div>
              </div>
            </div>
        `;
      })
      .join("");
  }
  // const productContainer = document.querySelectorAll(".cart-product-container");
  const decreaseQty = document.querySelectorAll(".cart-decrease-quantity");
  let quantityCount = document.querySelectorAll(".cart-product-quantity");
  const increaseQty = document.querySelectorAll(".cart-increase-quantity");
  const deleteItems = document.querySelectorAll(".delete-item");

  decrement(decreaseQty, quantityCount);
  increment(increaseQty, quantityCount);
  deleteItem(deleteItems, quantityCount);
};

const decrement = (decreaseQty, quantityCount) => {
  decreaseQty.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const decreaseBtn = e.target.dataset.id;
      const cartFilter = cart.filter((items) => {
        if (decreaseBtn == items.productId) {
          return items;
        }
      });
      quantityCount.forEach((item) => {
        if (item.id === decreaseBtn) {
          cartFilter[0].quantity -= 1;
          item.textContent = cartFilter[0].quantity;
        }
      });
      cart = cart.filter((item) => item.quantity != 0);
      cartCount();
      cartDisplay();
      totalPrice();

      localStorage.setItem("data", JSON.stringify(cart));
    });
  });
};

const deleteItem = (deleteItems) => {
  deleteItems.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      cart = cart.filter((item) => item.productId != e.target.dataset.id);
      cartDisplay();
      cartCount();
      totalPrice();

      localStorage.setItem("data", JSON.stringify(cart));
    });
  });
};

const increment = (increaseQty, quantityCount) => {
  increaseQty.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const increaseBtn = e.target.dataset.id;
      const cartFilter = cart.filter((items) => {
        if (increaseBtn == items.productId) {
          //items.quantity += 1;
          return items;
        }
      });
      quantityCount.forEach((item) => {
        if (item.id === increaseBtn) {
          cartFilter[0].quantity += 1;
          item.innerHTML = cartFilter[0].quantity;
        }
      });
      cartCount();
      cartDisplay();
      totalPrice();
      localStorage.setItem("data", JSON.stringify(cart));
    });
  });
};

cartDisplay();
const totalPrice = () => {
  const itemSubtotal = document.createElement("h1");
  itemSubtotal.setAttribute("class", "subtotal");
  cartProducts.appendChild(itemSubtotal);
  let itemTotal;
  let subtotal = 0;
  for (let i = 0; i < cart.length; i++) {
    itemTotal = cart[i].price * cart[i].quantity;
    subtotal += itemTotal;
  }
  if (cart.length >= 1) {
    itemSubtotal.innerHTML = `Subtotal(${
      cart.length > 1
        ? cartCountDisplay.innerHTML + " items"
        : cartCountDisplay.innerHTML + " item"
    }): $${subtotal.toFixed(2)}`;
  }
  checkoutBox(itemSubtotal);
};

const checkoutBox = (itemSubtotal) => {
  const checkoutSection = document.querySelector(".checkout-section");
  const checkoutContainer = document.querySelector(".checkout-container");
  const checkoutSubtotal = document.querySelector(".checkout-subtotal");
  const checkoutBtn = document.querySelector(".checkout-btn");
  if (cart.length >= 1) {
    checkoutSubtotal.innerHTML = itemSubtotal.innerHTML;
  } else {
    checkoutBtn.style.display = "none";
  }
  if (cart.length !== 0) {
    checkoutSection.style.display = "block";
  } else {
    checkoutSection.style.display = "none";
  }

  const checkoutContainerEvent = () => {
    if (scrollY > 144) {
      checkoutContainer.classList.add("sticky");
      checkoutContainer.style.width = `${checkoutSection.offsetWidth}px`;
    } else {
      checkoutContainer.classList.remove("sticky");
    }
  }
  window.addEventListener("scroll", checkoutContainerEvent);
  console.log(checkoutContainer.getBoundingClientRect().top)
  console.log(checkoutContainer.offsetTop)
  console.log(window.scrollY)
  console.log(screen.width)
};
totalPrice();
