import { getPokemonCard } from "./html-builder";

const loaderElm = document.querySelector(".overlay");
let offset = 0;

const removeLoader = function () {
  loaderElm.classList.add("hidden");
};

const showLoader = function () {
  loaderElm.classList.remove("hidden");
};

export const getPokemonList = async function () {
  if (offset <= 1025) {
    showLoader();
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${
        offset + 50 > 1025 ? 50 - (1025 - offset) : 50
      }`
    );
    const data = await response.json();
    const { results } = data;
    results.forEach((_, id) => {
      getPokemonCard(id + offset);
    });
    offset += 50;
    removeLoader();
  }
};

export const getPokemonInfo = async function (pokemonId) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );
  const data = await response.json();
  console.log(data);
};
