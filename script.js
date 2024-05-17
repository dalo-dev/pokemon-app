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
    <audio class="pokemon-cry hidden" controls>
      <source
        src="https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${
          pokemonId + 1
        }.ogg"
        type="audio/ogg"
        muted="muted"
      />
      Your browser does not support the audio tag.
    </audio>
   </div>`;
  mainContainerElm.insertAdjacentHTML("beforeend", html);
};

getPokemon();

mainContainerElm.addEventListener("mouseover", (e) => {
  if (e.target.closest(".pokemon-card")) {
    const pokemonCard = e.target.closest(".pokemon-card");
    const pokemonCry = pokemonCard.querySelector(".pokemon-cry");
    pokemonCry.play();
  }
});

mainContainerElm.addEventListener("mouseout", (e) => {
  if (e.target.closest(".pokemon-card")) {
    const pokemonCard = e.target.closest(".pokemon-card");
    const pokemonCry = pokemonCard.querySelector(".pokemon-cry");
    pokemonCry.pause();
    pokemonCry.currentTime = 0;
  }
});
