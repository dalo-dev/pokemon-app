import { getPokemonInfo, getPokemonList } from "./api";

export const setupEventListeners = function () {
  const mainContainerElm = document.querySelector(".main__container");
  const pokemonModal = document.getElementById("pokemon-modal");
  const closeModalBtn = document.querySelector(".close-modal");

  document.querySelector(".main").addEventListener("scroll", function (e) {
    e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight &&
      getPokemonList();
  });
  mainContainerElm.addEventListener("click", (e) => {
    if (e.target.classList.contains("pokemon-img")) {
      getPokemonInfo(e.target.closest(".pokemon-card").dataset.pokemonid);
    }
  });
  closeModalBtn.addEventListener("click", () => {
    pokemonModal.classList.add("hidden");
  });
  pokemonModal.addEventListener("click", (e) => {
    e.target.classList.contains("overlay") &&
      pokemonModal.classList.add("hidden");
  });
};
