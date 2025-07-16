import { duck, duckContainer, filter } from "./data.js";
import { showDucks } from "./duckFunction.js";

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

