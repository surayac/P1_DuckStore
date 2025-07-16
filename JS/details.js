import { duck } from "./data.js";

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const pato = duck.find(p => p.id === id);

const container = document.getElementById("duck-container");

if (pato) {
  container.innerHTML = `
    <div class="pato_grande">
      <img src="${pato.image}" alt="${pato.firstname}">
    </div>
    <div class="info">
      <h1>${pato.firstname}</h1>
      <p class="price">${pato.price} €</p>
      <p>El Pato de Goma ${pato.firstname} está listo para divertirte. Cómpralo ahora para ti, para tus hijos o para regalar a alguien especial. </p>
      <div class="stock">
        <p>En stock</p>
       <button class="button-stock" id="btn-sub">-</button> <button class="button-stock" id ="quantity">0</button> <button class="button-stock" id="btn-add">+</button>
      </div>
      <div class="description">
        <h3>Descripción</h3>
        <p> ${pato.description} </p>
      </div>
      <p>Categoría: ${pato.category}</p>
    `;
} else {
  container.innerHTML = `<p>Pato no encontrado</p>`;
}


let quantity = 0;
const btnAdd = document.getElementById("btn-add");
const btnSub = document.getElementById("btn-sub");
const quantitySpan = document.getElementById("quantity");

btnAdd.addEventListener("click", () => {
  quantity++;
  quantitySpan.textContent = quantity;
});

btnSub.addEventListener("click", () => {
  if (quantity > 0) {
    quantity--;
    quantitySpan.textContent = quantity;
  }
 
});

function actualizarContador() {
    const contador = document.getElementById("contador-carrito");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    contador.textContent = total;
  };

// evento al boton + para sumar +1 (boton +)
document.getElementById("btn-add").addEventListener("click", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const existe = carrito.find(item => item.id === pato.id);
    if (existe) {
      existe.cantidad += 1;
    } else {
      carrito.push({ ...pato, cantidad: quantity });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
  });


  // evento para restar (boton -)
  document.getElementById("btn-sub").addEventListener("click", () => {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    const existe = carrito.find(item => item.id === pato.id);
    const position = carrito.findIndex(item => item.id === pato.id);
    //console.log(existe)
    //console.log(position)
    //console.log(carrito)
    if (existe.cantidad > 1) {
      carrito[position].cantidad -= 1;
    }  else {
      carrito = carrito.filter(item => item.id !== pato.id);
    }
    //console.log(carrito)
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContador();
  });

  actualizarContador();