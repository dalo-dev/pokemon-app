const mainContainerElm = document.querySelector(".main__container");
const loaderElm = document.querySelector(".overlay");
let offset = 0;

const removeLoader = function () {
  loaderElm.classList.add("hidden");
};

const showLoader = function () {
  loaderElm.classList.remove("hidden");
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

export const getPokemon = async function () {
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
