fetch("https://ipapi.co/json/")
.then((res) => res.json())
.then((json) => fetchCountry(json))
.catch((err) => console.error(err));

fetch("https://fakestoreapi.com/products")
.then((res) => res.json())
.then((json) => {
fetchProducts(json);
})
.catch((err) => console.error(err));

export const header = document.querySelector(".header-section");

header.innerHTML = `
    <section class="header">
      <img class="web-logo" src="${window.location.href == "/" ? "./Img/ecommercelogo.jpg" : "../Img/ecommercelogo.jpg"}" alt="logo...">
      <div class="delivery-location"></div>
      <div class="search-bar">
          <input type="search" id="search" name="search" placeholder="Search Product">
          <img class="search-img" src="${window.location.href == "/" ? "./Img/search.png" : "../Img/search.png"}" alt="search-button">
      </div>
      <div class="language">
          <label class="translate-label" for="translate">EN</label>
          <select name="translate" id="translate">
          </select>
      </div>
      <div class="cart-hamburger">
        <a href="${window.location.href == "/" ? "./pages/cart.html?data=product selected" : "../pages/cart.html?data=product selected"}">
            <div class="add-cart-box">
                <span class="cart-count"></span>
                <img class="cart-logo" src="${window.location.href == "/" ? "./Img/cart.png" : "../Img/cart.png"}" alt="cart-logo" style="width:2rem; height:1.7rem">
            </div>
        </a>
        <div class="hamburger-menu">
          <span class="hamburger-line"></span>
        </div>
      </div>
      <div class="sign-in">
          <p>Sign In</p>
      </div>
    </section>
    <section class="pages">
      <div class="categories">
          <div id="all-products">
              <div>
                  <h4 class="page category">Category<i class="fa fa-caret-down"></i></h4>
              </div>
              <div class="product-categories-box">
                  <ul id="categories-product" class="product-categories"></ul>
              </div>
          </div>
      </div>
      <h4 class="page">Top Deals</h4>
      <h4 class="page">Customer Service</h4>
      <h4 class="page">Gift Cards</h4>
      <h4 class="page">Sell</h4>
    </section>
    <div class="burger-menu-section"></div>
`;
// if (window.location.href == `${window.location.origin}/pages/cart.html`) {
//   const url = window.location.search;
//   const usp = new URLSearchParams(url);
//   usp.set("data", "product selected");
//   history.pushState({}, "", window.location.href + "?" + usp);
// }

const webLogo = document.querySelector(".web-logo");
const searchImg = document.querySelector(".search-img");
const cartLogo = document.querySelector(".cart-logo");
const hamburger = document.querySelector(".hamburger-menu");
export const burgerLine = document.querySelector(".hamburger-line");
const productCategory = document.querySelector(".category");
const productCategoriesBox = document.querySelector(".product-categories-box");
const productCategories = document.querySelector(".product-categories");
export const cartCountDisplay = document.querySelector(".cart-count");
const menuSection = document.querySelector(".burger-menu-section");

// if (window.location.href === `${window.location.origin}/ecommerce/`) {
//   webLogo.setAttribute("src", "./Img/ecommercelogo.jpg");
//   searchImg.setAttribute("src", "./Img/search.png");
//   cartLogo.setAttribute("src", "./Img/cart.png");
// } else {
//   webLogo.setAttribute("src", "../Img/ecommercelogo.jpg");
//   searchImg.setAttribute("src", "../Img/search.png");
//   cartLogo.setAttribute("src", "../Img/cart.png");
// }

webLogo.addEventListener("click", () => {
  window.location.href = "/";
});

const fetchCountry = (data) => {
    const countryName = document.querySelector(".delivery-location");
  
    countryName.innerHTML = `
      <p>Deliver to</p>
      <p>${data.country_name}</p>
    `;
};

const fetchProducts = (data) => {
  //console.log(data)
  const all = data.reduce(
    (values, item) => {
      //console.log(item)
      if (!values.includes(item.category)) {
        values.push(item.category);
      }
      return values;
    },
    ["All"]
  );
  productCategories.innerHTML = all
    .map((item) => {
      //console.log(item)
      return `
        <a href="${window.location.pathname == "/" ? `./pages/products.html?data=${item.replace(/\W+/g, "")}` : `../pages/products.html?data=${item.replace(/\W+/g, "")}`}">
          <li class="category-list" data-id="${item}">${item}</li>
        </a>
      `;
    })
    .join("");
    //categories(data);
  productCategory.addEventListener("click", () => {
    productCategoriesBox.classList.toggle("active");
  });
  document.addEventListener("click", (e) => {
    if (
      !productCategory.contains(e.target) &&
      !productCategoriesBox.contains(e.target)
    ) {
      productCategoriesBox.classList.remove("active");
    }
  });
};

export let cart = JSON.parse(localStorage.getItem("data")) || [];

export let cartCount = () => {
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

hamburger.addEventListener("click", () => {
  burgerLine.classList.toggle("active");
  menuSection.classList.toggle("show");
})