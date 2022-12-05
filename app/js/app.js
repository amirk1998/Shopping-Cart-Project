//TODO : Episode 100
// APP JS
const cartBtn = document.querySelector('.cart-btn');
const cartModal = document.querySelector('.cart');
const backDrop = document.querySelector('.backdrop');
const closeModal = document.querySelector('.cart-item-confirm');

const productsDOM = document.querySelector('.products-center');

import { productsData } from './products.js';
let cart = [];

// get products
class Products {
  //
  getProduct() {
    return productsData;
  }
}

// display products
class UI {
  displayProducts(products) {
    let result = '';
    products.forEach((item) => {
      result += `<div class="product">
      <div class="img-container">
        <img
          src= ${item.imageUrl}
          class="product-img"
          alt="product-1"
        />
      </div>
      <div class="product-desc">
        <p class="product-price">$ ${item.price}</p>
        <p class="product-title">${item.title}</p>
      </div>
      <button class="btn add-to-cart" data-id= ${item.id} >
        <i class="fas fa-shopping-cart"></i>
        add to cart
      </button>
    </div>`;
      productsDOM.innerHTML = result;
    });
  }

  getAddToCartBtn() {
    //create NodeList
    const addToCartBtns = document.querySelectorAll('.add-to-cart');
    //convert NodeList to Array
    const buttons = [...addToCartBtns];
    // console.log(buttons);
    buttons.forEach((btn) => {
      const id = btn.dataset.id;
      // check if the product id is in cart or not
      const isInCart = cart.find((item) => item.id === parseInt(id));

      if (isInCart) {
        btn.innerText = 'In Cart';
        btn.disabled = true;
      }

      btn.addEventListener('click', (event) => {
        //
        event.target.innerText = 'In Cart';
        event.target.disabled = true;
        console.log(event.target.dataset.id);
        //get product from product
        const addedProducts = Storage.getProduct(id);
        //add to cart

        cart = [...cart, { ...addedProducts, quantity: 1 }];
        //save cart to local storage
        Storage.saveCart(cart);
        //update cart value
        //add to cart item
      });
    });
  }
}

// Storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
  }

  static getProduct(id) {
    const _products = JSON.parse(localStorage.getItem('products'));
    return _products.find((item) => item.id === parseInt(id));
  }

  static saveCart(cart) {
    //
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // console.log('loaded');
  const products = new Products();
  const productsData = products.getProduct();
  // console.log(productsData);
  const ui = new UI();
  ui.displayProducts(productsData);

  ui.getAddToCartBtn();
  Storage.saveProducts(productsData);
});

// Cart item Functions
function showModalFunction() {
  backDrop.style.display = 'block';
  cartModal.style.opacity = '1';
  cartModal.style.top = '20%';
}

function closeModalFunction() {
  backDrop.style.display = 'none';
  cartModal.style.opacity = '0';
  cartModal.style.top = '-100%';
}

cartBtn.addEventListener('click', showModalFunction);
closeModal.addEventListener('click', closeModalFunction);
backDrop.addEventListener('click', closeModalFunction);
