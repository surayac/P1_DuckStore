
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
      <button>Añadir al carrito</button>
      <button>Comprar</button>
    `;
    duckContainer.appendChild(article);
  }); }


  import { duckContainer } from "./Data.js";
  export {showDucks}
