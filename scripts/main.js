import { header } from "./header.js";
import "./hamburger.js";
import { footer } from "./footer.js";

fetch("https://fakestoreapi.com/products")
.then((res) => res.json())
.then((json) => {
pictureCollage(json);
productSliderSection(json);
})
.catch((err) => console.error(err));

export let contents = document.querySelector(".product-section");
const productSlider = document.querySelectorAll(".product-slider-img");
const imgSlider = document.querySelectorAll(".promotional-ad");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");
// const productBox = document.querySelector(".all-products-div-box");
const productImg = document.querySelector(".all-products-div-box-container");
// const freeShippingImg = document.querySelector(".free-shipping-img-box");
const techImg = document.querySelector(".tech-container");
const fashionImg = document.querySelector(".fashion-container");

const promoAd = () => {
  
  imgSlider.forEach((item, index) => {
    item.style.left = `${index * 100}%`;
  })

  let counter = 0;

  nextBtn.addEventListener("click", () => {
    counter++;
    if (counter === imgSlider.length) {
      counter = 0;
    }
    imgSlider.forEach(item => {
      item.style.transform = `translateX(-${counter * 100}%)`;
    })
  })
  prevBtn.addEventListener("click", () => {
    counter--;
    if (counter < 0) {
      counter = imgSlider.length - 1;
    }
    imgSlider.forEach(item => {
      item.style.transform = `translateX(-${counter * 100}%)`;
    })
  })
}
promoAd();

const pictureCollage = (data) => {
  productImg.innerHTML = `
    <div class="all-products-div-btn-img-box">
      <img class="all-products-div-btn-img" src="${data[0].image}">
    </div>
    <div class="all-products-div-btn-img-box">
      <img class="all-products-div-btn-img" src="${data[1].image}">
    </div>
    <div class="all-products-div-btn-img-box">
      <img class="all-products-div-btn-img" src="${data[4].image}">
    </div>
    <div class="all-products-div-btn-img-box">
      <img class="all-products-div-btn-img" src="${data[9].image}">
    </div>
  `;
  techImg.innerHTML = `
    <div class="all-products-div-btn-img-box">
      <img class="all-products-div-btn-img" src="${data[8].image}">
    </div>
    <div class="all-products-div-btn-img-box">
      <img class="all-products-div-btn-img" src="${data[9].image}">
    </div>
    <div class="all-products-div-btn-img-box">
      <img class="all-products-div-btn-img" src="${data[10].image}">
    </div>
    <div class="all-products-div-btn-img-box">
      <img class="all-products-div-btn-img" src="${data[11].image}">
    </div>
  `;
  fashionImg.innerHTML = `
    <div class="all-products-div-btn-img-box">
      <img class="all-products-div-btn-img" src="${data[1].image}">
    </div>
    <div class="all-products-div-btn-img-box">
      <img class="all-products-div-btn-img" src="${data[2].image}">
    </div>
    <div class="all-products-div-btn-img-box">
      <img class="all-products-div-btn-img" src="${data[18].image}">
    </div>
    <div class="all-products-div-btn-img-box">
      <img class="all-products-div-btn-img" src="${data[19].image}">
    </div>
  `;
};

const productSliderSection = (data) => {
  console.log(data)
  productSlider.forEach(item => {
    item.innerHTML = data.map(items => {
      return (`
      <img id="${items.title}" class="img-sample-slider" src="${items.image}" data-id="${items.id}">
      `);
    }).join("")
  })

  const imgBtn = document.querySelectorAll(".img-sample-slider");
  const imgSlider1 = document.getElementById("slider-img1");
  const imgSlider2 = document.getElementById("slider-img2");
  const nextSlider1 = document.getElementById("next1");
  const nextSlider2 = document.getElementById("next2");
  const prevSlider1 = document.getElementById("prev1");
  const prevSlider2 = document.getElementById("prev2");
  
  nextSlider1.addEventListener("click", () => {
    imgSlider1.scrollLeft += 100;
  })
  prevSlider1.addEventListener("click", () => {
    imgSlider1.scrollLeft -= 100;
  })
  nextSlider2.addEventListener("click", () => {
    imgSlider2.scrollLeft += 100;
  })
  prevSlider2.addEventListener("click", () => {
    imgSlider2.scrollLeft -= 100;
  })

  imgBtn.forEach(img => {
    img.addEventListener("click", (e) => {
      const itemTargetId = e.target.id;
      const itemTargetDataset = e.target.dataset.id;
      // console.log(itemTarget)
      if (e.target && window.location.pathname === "/ecommerce/") {
        window.location = `./pages/info.html?name=${itemTargetId}&data=${itemTargetDataset}`
      } else {
        window.location = `/pages/info.html?name=${itemTargetId}&data=${itemTargetDataset}`
      }
    })
  })
}

console.log(productImg.getBoundingClientRect().width)
console.log(productImg.clientWidth)
console.log(productImg.offsetWidth)

/* const categories = (data) => {
  productCategories.addEventListener("change", () => {
    const categorySelected = productCategories.value;
    const categoryDisplay = data.filter((type) => {
      if (type.category === categorySelected) {
        return type;
      }
    });
    if (categorySelected === "All") {
      productDisplay(data);
    } else {
      productDisplay(categoryDisplay);
    }
  });
} */

/* const productDisplay = (data) => {
  contents.innerHTML = data
    .map((items) => {
      //console.log(items)
      return `
        <div class="product-content">
            <img class="product-img" src="${items.image}">
            <div class="product-info"> 
              <div>
                <h4 class="product-name">${items.title}</h4>
                <h2>$${items.price}</h2>
              </div>
              <button class="add-to-cart" data-name="${items.title}">Add to cart</button>
            </div>
        </div>
    `;
    })
    .join("");
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
          quantity: 1,
        });
      }

      localStorage.setItem("data", JSON.stringify(cart));
      cartCount();
      //console.log(cart)
    });
  });
}; */

/* document.addEventListener("click", (e) => {
  const {target} = e;
  console.log(e.preventDefault())
}) */
