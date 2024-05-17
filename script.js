"use strict";

const loaderElm = document.querySelector(".pokemon");
const mainContainerElm = document.querySelector(".main__container");

const removeLoader = function () {
  loaderElm.classList.add("hidden");
  mainContainerElm.classList.remove("hidden");
};

const showLoader = function () {
  loaderElm.classList.remove("hidden");
  mainContainerElm.classList.add("hidden");
};

const getPokemon = async function () {
  showLoader();
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=50`);
  const data = await response.json();

  const { results } = data;
  results.forEach((_, id) => {
    getPokemonCard(id);
  });
  removeLoader();
};

const getPokemonCard = function (pokemonId) {
  const html = `<div class="pokemon-card" data-pokemonId = "${pokemonId + 1}">
    <img
    class="pokemon-img"
    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      pokemonId + 1
    }.png"
    alt="Pokemon"
    />
   </div>`;
  mainContainerElm.insertAdjacentHTML("beforeend", html);
};

getPokemon();
