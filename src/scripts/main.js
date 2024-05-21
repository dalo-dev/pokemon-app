import { getPokemonList, getPokemonInfo } from "./api";

getPokemonList();

document.querySelector(".main").addEventListener("scroll", function (e) {
  e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight &&
    getPokemonList();
});

const mainContainerElm = document.querySelector(".main__container");

mainContainerElm.addEventListener("click", (e) => {
  if (e.target.classList.contains("pokemon-img")) {
    getPokemonInfo(e.target.closest(".pokemon-card").dataset.pokemonid);
  }
});
