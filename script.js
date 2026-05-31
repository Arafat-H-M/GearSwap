let cart = JSON.parse(localStorage.getItem("cart")) || [];

const products = [
  { id: 1, name: "RTX 4090", price: 1599, category: "gpu" },
  { id: 2, name: "RTX 4080", price: 1199, category: "gpu" },
  { id: 3, name: "RTX 4070", price: 599, category: "gpu" },
  { id: 4, name: "RX 7900 XTX", price: 999, category: "gpu" },

  { id: 5, name: "Ryzen 9 7950X", price: 699, category: "cpu" },
  { id: 6, name: "Intel i9 13900K", price: 589, category: "cpu" },

  { id: 7, name: "32GB RAM", price: 149, category: "ram" },
  { id: 8, name: "16GB RAM", price: 89, category: "ram" },

  { id: 9, name: "1TB SSD", price: 99, category: "storage" },
  { id: 10, name: "2TB SSD", price: 179, category: "storage" },

  { id: 11, name: "Liquid Cooler", price: 129, category: "cooling" },

  { id: 12, name: "Gaming Mouse", price: 79, category: "accessory" },
  { id: 13, name: "Keyboard", price: 129, category: "accessory" }
];

function displayProducts(list) {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = list.map(p => `
    <div class="product">
      <img src="images/${p.id}.jpg">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join("");
}

displayProducts(products);

/* ADD TO CART */
function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);

  localStorage.setItem("cart", JSON.stringify(cart));

  alert(product.name + " added to cart!");

  updateCart();
}

function updateCart() {
  const count = document.getElementById("cart-count");
  if (count) count.innerText = cart.length;
}

updateCart();

/* CART PAGE */
function loadCart() {
  const list = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  if (!list) return;

  let total = 0;

  list.innerHTML = cart.map((item, i) => {
    total += item.price;
    return `
      <li>${item.name} - $${item.price}
        <button onclick="removeItem(${i})">X</button>
      </li>
    `;
  }).join("");

  totalEl.innerText = total;
}

function removeItem(i) {
  cart.splice(i, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCart();
}

loadCart();

/* FILTER */
function filterCategory(cat) {
  if (cat === "all") return displayProducts(products);

  const filtered = products.filter(p => p.category === cat);
  displayProducts(filtered);
}
