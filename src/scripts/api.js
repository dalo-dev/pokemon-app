import { getPokemonCard, getPokemonModal } from "./html-builder";

const loaderElm = document.querySelector(".overlay");
const pokemonModal = document.getElementById("pokemon-modal");
let offset = 0;

const removeLoader = function () {
  loaderElm.classList.add("hidden");
};

const showLoader = function () {
  loaderElm.classList.remove("hidden");
};

const showModal = function () {
  pokemonModal.classList.remove("hidden");
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
  showLoader();
  const [pokemonResponse, speciesResponse] = await Promise.all([
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`),
    fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`),
  ]);

  const pokemonData = await pokemonResponse.json();
  const speciesData = await speciesResponse.json();

  const pokedexDesc = speciesData.flavor_text_entries
    .filter((entry) => entry.language.name === "en")
    .at(-1);

  const data = { ...pokemonData, pokedexDesc };

  getPokemonModal(data);
  showModal();
  removeLoader();
};
