"use strict";

let offset = 0;

const loaderElm = document.querySelector(".overlay");
const mainContainerElm = document.querySelector(".main__container");
const pokemonCryElm = document.getElementById("pokemon-cry");

const removeLoader = function () {
  loaderElm.classList.add("hidden");
};

const showLoader = function () {
  loaderElm.classList.remove("hidden");
};

const getPokemon = async function () {
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

mainContainerElm.addEventListener("mouseover", (e) => {
  if (e.target.classList.contains("pokemon-img")) {
    const pokemonCard = e.target.closest(".pokemon-card");
    pokemonCryElm.src = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${pokemonCard.dataset.pokemonid}.ogg`;
    pokemonCryElm.closest("audio").load();
    pokemonCryElm.closest("audio").play();
  }
});

mainContainerElm.addEventListener("mouseout", (e) => {
  if (e.target.classList.contains("pokemon-img")) {
    pokemonCryElm.closest("audio").pause();
    pokemonCryElm.closest("audio").currentTime = 0;
  }
});

document.querySelector(".main").addEventListener("scroll", function (e) {
  e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight &&
    getPokemon();
});
