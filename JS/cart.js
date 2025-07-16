import { actualizarContador } from "./cartLogic.js";

document.addEventListener("DOMContentLoaded", () => {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contenedor = document.getElementById("carrito-contenedor");
  const transaction = document.getElementById("transaction");

  if (carrito.length === 0) {
    contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
    return;
  }

  let subtotal = 0;

  carrito.forEach(producto => {
    const item = document.createElement("div");
    item.classList.add("item-carrito");
    item.setAttribute("data-id", producto.id);

    item.innerHTML = `
      <div class="pato_grande">
        <img class="pato_grande" src="${producto.image}" alt="${producto.firstname}">
        <div class="info">
          <h4>${producto.firstname}</h4>
          <p class="precio">Total: <span class="total-producto">${(producto.price * producto.cantidad).toFixed(2)}</span> €</p>
          <p>Entrega GRATIS en pedidos de más de 20€</p>
          <div class="buttons">
            <button class="btn-sub" data-id="${producto.id}">-</button>
            <button class ="cantidad"><span class="cantidad-num">${producto.cantidad}</span></button>
            <button class="button-stock btn-add" data-id="${producto.id}">+</button>
          </div>
        </div>
      </div>
    `;

    contenedor.appendChild(item);
    subtotal += producto.price * producto.cantidad;
  });

  const totalFinal = document.createElement("p");
  totalFinal.innerHTML = `
    <strong>Subtotal: <span id="subtotal">${subtotal.toFixed(2)}</span> €</strong>
    <button id="btn-details-buy">Tramitar Pedido</button>
  `;
  totalFinal.style.marginTop = "20px";
  totalFinal.style.fontSize = "18px";
  transaction.appendChild(totalFinal);

  actualizarContador();
});

document.body.addEventListener("click", (e) => {
  const id = e.target.getAttribute("data-id");

  if (e.target.classList.contains("btn-sub")) {
    restarCantidadProducto(id);
  }
  if (e.target.classList.contains("btn-add")) {
    aumentarCantidadProducto(id);
  }
});

function aumentarCantidadProducto(id) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const producto = carrito.find(p => p.id == id);
  if (!producto) return;

  producto.cantidad += 1;
  localStorage.setItem("carrito", JSON.stringify(carrito));

  const item = document.querySelector(`.item-carrito[data-id="${id}"]`);
  if (item) {
    item.querySelector(".cantidad-num").textContent = producto.cantidad;
    const nuevoTotal = (producto.price * producto.cantidad).toFixed(2);
    item.querySelector(".total-producto").textContent = nuevoTotal;
  }

  actualizarContador();
  actualizarSubtotal();
}


function actualizarSubtotal() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const subtotal = carrito.reduce((total, p) => total + p.price * p.cantidad, 0);
  const subtotalElement = document.getElementById("subtotal");
  if (subtotalElement) {
    subtotalElement.textContent = subtotal.toFixed(2);
  }
}

function restarCantidadProducto(id) {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const index = carrito.findIndex(item => item.id == id);
  if (index === -1) return; 

  const producto = carrito[index];

  if (producto.cantidad > 1) {
    carrito[index].cantidad -= 1;

    const item = document.querySelector(`.item-carrito[data-id="${id}"]`);
    if (item) {
      item.querySelector(".cantidad-num").textContent = carrito[index].cantidad;
      item.querySelector(".total-producto").textContent = (producto.price * producto.cantidad).toFixed(2);
    }

  } else {
    carrito = carrito.filter(item => item.id != id);

    const item = document.querySelector(`.item-carrito[data-id="${id}"]`);
    if (item) item.remove();
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
  actualizarSubtotal();

  if (carrito.length === 0) {
    document.getElementById("carrito-contenedor").innerHTML = "<p>Tu carrito está vacío.</p>";
    const subtotal = document.getElementById("subtotal");
    if (subtotal) subtotal.textContent = "0.00";
  }
};