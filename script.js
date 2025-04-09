const donutData = [
  {
    name: "Chunky Chip Donuts",
    price: 25000,
    desc: "Soft and fluffy donuts filled with mini chocolate chips. Baked to perfection and coated in a sweet chocolate glaze. A delightful treat for every chocolate lover.",
    img: "images/donut1.jpg"
  },
  {
    name: "Rainbow Vanilla Donuts",
    price: 24000,
    desc: "Vanilla donuts bursting with colorful sprinkles. Baked and topped with a simple vanilla glaze, they’re perfect for birthdays or brightening any day.",
    img: "images/donut2.jpg"
  },
  {
    name: "Chocolate Glazed Donuts",
    price: 24000,
    desc: "Light and tender chocolate cake donuts, baked instead of fried. Coated in chocolate glaze and decorated with sprinkles for a cheerful finish.",
    img: "images/donut3.jpg"
  },
  {
    name: "Sunny Donuts",
    price: 26000,
    desc: "These donuts are infused with fresh orange flavor, offering a light and citrusy bite. Finished with a sweet orange glaze that’s bright and refreshing.",
    img: "images/donut4.jpg"
  },
  {
    name: "Velvet Rouge Donuts",
    price: 27000,
    desc: "Classic red velvet cake turned into a tender, baked donut. Rich in flavor and paired with a creamy, tangy cream cheese glaze.",
    img: "images/donut5.jpg"
  },
  {
    name: "Festive Donuts",
    price: 25000,
    desc: "Confetti donuts decorated in red, white, and blue sprinkles. Perfectly baked with a vanilla base and glazed for an extra festive touch.",
    img: "images/donut6.jpg"
  },
  {
    name: "Carrot Donuts",
    price: 26000,
    desc: "Inspired by classic carrot cake, these donuts are spiced and sweet. Made with fresh carrots and topped with smooth cream cheese glaze.",
    img: "images/donut7.jpg"
  },
  {
    name: "Citrus Berry Donuts",
    price: 28000,
    desc: "A fresh mix of tart lemon and sweet blueberries in one beautiful donut. Baked and drizzled with zesty lemon glaze that enhances every bite.",
    img: "images/donut8.jpg"
  },
  {
    name: "Apple Pie Donuts",
    price: 27000,
    desc: "Tender donuts filled with apple flavor and topped with buttery cinnamon crumb. Baked and finished with a sweet vanilla glaze. It tastes like an apple pie in donut form.",
    img: "images/donut9.jpg"
  },
  {
    name: "Biscoff Donuts",
    price: 29000,
    desc: "Flavored with that iconic caramelized Biscoff cookie taste. These baked donuts are topped with creamy Biscoff spread and a soft crumb.",
    img: "images/donut10.jpg"
  },
  {
    name: "Cookies n Cream Donuts",
    price: 28000,
    desc: "Baked donuts packed with crushed Oreos, topped with vanilla glaze and more cookies. Creamy, crunchy, and absolutely irresistible.",
    img: "images/donut11.jpg"
  },
  {
    name: "Amber Spice Donuts",
    price: 26000,
    desc: "Warm pumpkin flavor blended with cinnamon, nutmeg, and fall spices. Baked to golden perfection and dusted with sweet cinnamon sugar.",
    img: "images/donut12.jpg"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function formatRupiah(number) {
  return 'Rp ' + number.toLocaleString('id-ID');
}

function renderMenu() {
  const container = document.getElementById("donut-menu");
  container.innerHTML = "";
  donutData.forEach(item => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>${item.desc}</p>
      <p><strong>${formatRupiah(item.price)}</strong></p>
      <button onclick="addToCart('${item.name}', ${item.price})">🛒</button>
    `;
    container.appendChild(card);
  });
}

function addToCart(name, price) {
  const found = cart.find(item => item.name === name);
  if (found) {
    found.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} ditambahkan ke keranjang!`);
}

function renderCart(containerId, withControls = false) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  let total = 0;
  if (cart.length === 0) {
    container.innerHTML = "<p>Cart empty.</p>";
    return;
  }
  cart.forEach((item, i) => {
    const el = document.createElement("div");
    el.innerHTML = `
      <strong>${item.name}</strong> - ${formatRupiah(item.price)} × ${item.qty}
      ${withControls ? `
        <button onclick="changeQty(${i}, 1)">+</button>
        <button onclick="changeQty(${i}, -1)">-</button>
      ` : ""}
    `;
    total += item.price * item.qty;
    container.appendChild(el);
  });
  const totalEl = document.createElement("p");
  totalEl.innerHTML = `<strong>Total: ${formatRupiah(total)}</strong>`;
  container.appendChild(totalEl);
}

function changeQty(index, diff) {
  cart[index].qty += diff;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart("cart-list", true);
}

function submitOrder(e) {
  e.preventDefault();
  const name = document.getElementById("customer-name").value;
  const address = document.getElementById("customer-address").value;
  const phone = document.getElementById("customer-phone").value;
  if (!name || !address || !phone || cart.length === 0) {
    alert("Isi semua kolom dan pastikan keranjang tidak kosong.");
    return;
  }
  const order = {
    name,
    address,
    phone,
    items: [...cart],
    date: new Date().toLocaleString()
  };
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Terima kasih! Pesananmu telah dikirim.");
  window.location.href = "index.html";
}

function renderOrders(containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";
  if (orders.length === 0) {
    container.innerHTML = "<p>Belum ada pesanan.</p>";
    return;
  }
  orders.forEach(order => {
    const box = document.createElement("div");
    box.className = "order-box";
    box.innerHTML = `
      <h4>${order.name} - ${order.date}</h4>
      <p><strong>Alamat:</strong> ${order.address}<br>
         <strong>Telepon:</strong> ${order.phone}</p>
      <ul>
        ${order.items.map(i => `<li>${i.name} (${formatRupiah(i.price)} × ${i.qty})</li>`).join("")}
      </ul>
    `;
    container.appendChild(box);
  });
}

function adminLogin(e) {
  e.preventDefault();
  const username = document.getElementById("admin-username").value;
  const password = document.getElementById("admin-password").value;
  if (username === "admin" && password === "donut123") {
    renderOrders("admin-orders");
    document.getElementById("admin-orders").style.display = "block";
  } else {
    alert("Username atau password salah.");
  }
}