const donutData = [
  {
    name: "Chocolate Chip Donuts",
    price: 25000,
    desc: "Soft and fluffy donuts filled with mini chocolate chips. Baked to perfection and coated in a sweet chocolate glaze. A delightful treat for every chocolate lover.",
    img: "Don-O-Donuts/images/donut1.jpg"
  },
  {
    name: "Funfetti Donuts",
    price: 24000,
    desc: "Vanilla donuts bursting with colorful sprinkles. Baked and topped with a simple vanilla glaze, they’re perfect for birthdays or brightening any day.",
    img: "Don-O-Donuts/images/donut2.jpg"
  },
  {
    name: "Baked Vanilla Cake Donuts",
    price: 24000,
    desc: "Light and tender vanilla cake donuts, baked instead of fried. Coated in chocolate glaze and decorated with sprinkles for a cheerful finish.",
    img: "Don-O-Donuts/images/donut3.jpg"
  },
  {
    name: "Orange Donuts",
    price: 26000,
    desc: "These donuts are infused with fresh orange flavor, offering a light and citrusy bite. Finished with a sweet orange glaze that’s bright and refreshing.",
    img: "Don-O-Donuts/images/donut4.jpg"
  },
  {
    name: "Red Velvet Donuts",
    price: 27000,
    desc: "Classic red velvet cake turned into a tender, baked donut. Rich in flavor and paired with a creamy, tangy cream cheese glaze.",
    img: "Don-O-Donuts/images/donut5.jpg"
  },
  {
    name: "4th of July Cake Donuts",
    price: 25000,
    desc: "Patriotic donuts decorated in red, white, and blue sprinkles. Perfectly baked with a vanilla base and glazed for an extra festive touch.",
    img: "Don-O-Donuts/images/donut6.jpg"
  },
  {
    name: "Carrot Cake Donuts",
    price: 26000,
    desc: "Inspired by classic carrot cake, these donuts are spiced and sweet. Made with fresh carrots and topped with smooth cream cheese glaze.",
    img: "Don-O-Donuts/images/donut7.jpg"
  },
  {
    name: "Lemon Blueberry Donuts",
    price: 28000,
    desc: "A fresh mix of tart lemon and sweet blueberries in one beautiful donut. Baked and drizzled with zesty lemon glaze that enhances every bite.",
    img: "Don-O-Donuts/images/donut8.jpg"
  },
  {
    name: "Apple Crumb Donuts",
    price: 27000,
    desc: "Tender donuts filled with apple flavor and topped with buttery cinnamon crumb. Baked and finished with a sweet vanilla glaze. It tastes like an apple pie in donut form.",
    img: "Don-O-Donuts/images/donut9.jpg"
  },
  {
    name: "Biscoff Donuts",
    price: 29000,
    desc: "Flavored with that iconic caramelized Biscoff cookie taste. These baked donuts are topped with creamy Biscoff spread and a soft crumb.",
    img: "Don-O-Donuts/images/donut10.jpg"
  },
  {
    name: "Oreo Donuts",
    price: 28000,
    desc: "Baked donuts packed with crushed Oreos, topped with vanilla glaze and more cookies. Creamy, crunchy, and absolutely irresistible.",
    img: "Don-O-Donuts/images/donut11.jpg"
  },
  {
    name: "Pumpkin Spice Donuts",
    price: 26000,
    desc: "Warm pumpkin flavor blended with cinnamon, nutmeg, and fall spices. Baked to golden perfection and dusted with sweet cinnamon sugar.",
    img: "Don-O-Donuts/images/donut12.jpg"
  }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

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
      <p><strong>Rp ${item.price.toLocaleString("id-ID")}</strong></p>
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
  alert(`${name} added to cart!`);
}
