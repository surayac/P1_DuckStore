// JS/DuckFunction.js
import { duckContainer} from "./data.js";
import { agregarAlCarrito } from "./cartLogic.js";

function showDucks(lista) {
  duckContainer.innerHTML = "";

  lista.forEach(duck => {
    const article = document.createElement("article");
    article.classList.add("item");
    article.innerHTML = `
      <div class="duck">
        <img src="${duck.image}" alt="${duck.firstname}">
      </div>
      <h4>${duck.firstname}</h4>
      <p>${duck.price}€</p>
      <button class="btn-add">Añadir al carrito</button>
      `;
    const botonAdd = article.querySelector(".btn-add");
    botonAdd.addEventListener("click", () => agregarAlCarrito(duck));

    const imagen = article.querySelector("img");
    imagen.addEventListener("click", () => {
      window.location.href = `/HTML/details.html?id=${duck.id}`;
    });

    duckContainer.appendChild(article);
  });
}

export { showDucks };

