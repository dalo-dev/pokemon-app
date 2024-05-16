"use strict";

const mainContainerElm = document.querySelector(".main__container");

const getPokemon = async function () {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=250`);
  const data = await response.json();

  const { results } = data;
  results.forEach((_, id) => {
    getPokemonCard(id);
  });
};

const getPokemonCard = function (pokemonId) {
  const html = `<div class="pokemon-card">
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
