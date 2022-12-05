//TODO : E 101 => 17min
//FIX : Style of modal
// APP JS
const cartBtn = document.querySelector('.cart-btn');
const cartModal = document.querySelector('.cart');
const backDrop = document.querySelector('.backdrop');
const closeModal = document.querySelector('.cart-item-confirm');

const productsDOM = document.querySelector('.products-center');
const cartTotal = document.querySelector('.cart-total');
const cartItems = document.querySelector('.cart-items');
const cartContent = document.querySelector('.cart-content');

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
        const addedProducts = { ...Storage.getProduct(id), quantity: 1 };
        //add to cart

        cart = [...cart, addedProducts];
        // save cart to local storage
        Storage.saveCart(cart);
        // update cart value
        this.setCartValue(cart);
        // add to cart item
        this.addCartItem(addedProducts);
        // get cart items from local storage
      });
    });
  }

  setCartValue(cart) {
    //1.cart items
    //2.cart total price
    let tempCartItems = 0;
    const totalPrice = cart.reduce((acc, curr) => {
      tempCartItems += curr.quantity;
      return acc + curr.quantity * curr.price;
    }, 0);

    cartTotal.innerText = `total price : ${totalPrice.toFixed(2)} $`;
    cartItems.innerText = tempCartItems;
    // console.log(tempCartItems);
  }

  addCartItem(cartItem) {
    //
    const divItem = document.createElement('div');
    divItem.classList.add('cart-item');
    divItem.innerHTML = `<img class="cart-item-img" src=${cartItem.imageUrl} />
    <div class="cart-item-desc">
      <h4>${cartItem.title}</h4>
      <h5>$ ${cartItem.price}</h5>
    </div>
    <div class="cart-item-conteoller">
      <i class="fas fa-chevron-up"></i>
      <p>${cartItem.quantity}</p>
      <i class="fas fa-chevron-down"></i>
      </div>
      <i class="fa-regular fa-trash-can"></i>`;
    cartContent.appendChild(divItem);
  }

  setupApp() {
    // get cart from storage
    const cartStorage = Storage.getCart() || [];
    //add cart item
    cartStorage.forEach((cartItem) => this.addCartItem(cartItem));
    //set value : price and items
    this.setCartValue(cartStorage);
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

  static getCart() {
    return JSON.parse(localStorage.getItem('cart'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // console.log('loaded');
  const products = new Products();
  const productsData = products.getProduct();
  // console.log(productsData);
  const ui = new UI();
  //set up : get cart and set up app:
  ui.setupApp();
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
