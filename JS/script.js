const duck= [
    { id:0,firstname: "dragon",price: 14,category:"fantasy",image: "/img/dragon.png"},
    { id:1,firstname: "Gato de la suerte",price: 14,category:"fantasy",image: "img/cat.png"},
    { id:2,firstname:"cantante",price: 14,category:"music",image:"img/singer.png"},
    { id:3,firstname: "fotografo",price: 14,category:"profession",image:"img/photo.png"},
    { id:4,firstname: "sellos de viaje",price: 14,category:"fantasy",image:"img/traveler.png"},
    { id:5,firstname: "rockero",price: 14,category:"music",image:"img/rocker.png"},
    ];

    const duckContainer = document.getElementById("duck-container");
    const filter= document.getElementById("filter-category");
    
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
      });
    }
    showDucks(duck);
    filter.addEventListener("change", () => {
      const selected = filter.value;
      if (selected === "all") {
        showDucks(duck);
      } else {
        const filtrados = duck.filter(d => d.category === selected);
        showDucks(filtrados);
      }
    });
     
    
    
    
    
    
    
    
    
    
    
    
    
    



    
  
    


    
    


