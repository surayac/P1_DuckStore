// Recuperar carrito desde localStorage o inicializar
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Elementos del DOM
const carritoLista = document.getElementById("carrito-lista");
const carritoTotal = document.getElementById("carrito-total");

// Añadir producto al carrito
function agregarAlCarrito(duck) {
  const existe = carrito.find(item => item.id === duck.id);

  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...duck, cantidad: 1 });
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
  actualizarContador();
}

// Mostrar productos del carrito (en menú o mini-carrito)
function mostrarCarrito() {
  if (!carritoLista || !carritoTotal) return; // 💥 Previene errores si no estás en esa página

  carritoLista.innerHTML = "";

  if (carrito.length === 0) {
    carritoLista.innerHTML = "<li>Tu carrito está vacío.</li>";
    carritoTotal.textContent = "Total: 0€";
    return;
  }

  let total = 0;

  carrito.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.firstname} x${item.cantidad} — ${item.price * item.cantidad}€`;
    carritoLista.appendChild(li);
    total += item.price * item.cantidad;
  });

  carritoTotal.textContent = `Total: ${total}€`;
}

// ✅ Actualizar contador visual del carrito
function actualizarContador() {
  const contador = document.getElementById("contador-carrito");
  if (!contador) return;

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const total = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  contador.textContent = total;
}

// ✅ Al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  actualizarContador();

  // 🔁 Botón carrito: redirige a cart.html
  const iconCarrito = document.getElementById("carrito-icono");
  if (iconCarrito) {
    iconCarrito.addEventListener("click", () => {
      window.location.href = "/HTML/cart.html";
    });
  }

  // Asegúrate de que `ducks` esté definido en el scope global
  if (typeof ducks !== "undefined") {
    document.querySelectorAll(".btn-add").forEach(btn => {
      btn.addEventListener("click", e => {
        const id = parseInt(btn.dataset.id);
        const pato = ducks.find(p => p.id === id);
        if (pato) agregarAlCarrito(pato);
      });
    });
  } else {
    console.warn("No se pueden añadir productos.");
  }
  actualizarContador();
});


export { agregarAlCarrito, mostrarCarrito, actualizarContador };