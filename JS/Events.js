import { duck,duckContainer,filter } from "./Data.js";
import { showDucks } from "./DuckFunction.js";

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

