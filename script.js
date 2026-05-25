// PRODUCT DATA
const products = [
  { id: 1, name: "RTX 4070", price: 599 },
  { id: 2, name: "Gaming Mouse", price: 49 },
  { id: 3, name: "Keyboard", price: 129 },
];

// CART
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// SAVE CART
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// UPDATE CART COUNT
function updateCartCount() {
  const count = document.getElementById("cart-count");
  if (count) count.innerText = cart.length;
}

// DISPLAY PRODUCTS
function displayProducts(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = products.map(p => `
    <div class="card">
      <img src="">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join("");
}

// ADD TO CART
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  saveCart();
  updateCartCount();
  alert("Added to cart!");
}

// DISPLAY CART
function displayCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("total-price");

  if (!container) return;

  let total = 0;

  container.innerHTML = cart.map((item, i) => {
    total += item.price;
    return `
      <div class="cart-item">
        <p>${item.name}</p>
        <p>$${item.price}</p>
        <button onclick="removeItem(${i})">X</button>
      </div>
    `;
  }).join("");

  if (totalEl) totalEl.innerText = total;
}

// REMOVE ITEM
function removeItem(index) {
  cart.splice(index, 1);
  saveCart();
  displayCart();
  updateCartCount();
}

// PRODUCT PAGE LOAD
function loadProduct() {
  const container = document.getElementById("product-detail");
  if (!container) return;

  const product = products[0];

  container.innerHTML = `
    <img src="">
    <div class="product-info">
      <h2>${product.name}</h2>
      <p class="price">$${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    </div>
  `;
}

// CHECKOUT
function loadCheckout() {
  const container = document.getElementById("checkout-items");
  if (!container) return;

  container.innerHTML = cart.map(item => `
    <p>${item.name} - $${item.price}</p>
  `).join("");
}

function placeOrder() {
  alert("Order placed!");
  cart = [];
  saveCart();
}

// RUN ON PAGE LOAD
updateCartCount();
displayProducts("featured-products");
displayProducts("shop-products");
displayCart();
loadProduct();
loadCheckout();