export const getPokemonCard = function (pokemonId) {
  const mainContainerElm = document.querySelector(".main__container");
  const html = `<div class="pokemon-card" data-pokemonId = "${pokemonId + 1}">
        <img
        class="pokemon-img pixel"
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
          pokemonId + 1
        }.png"
        alt="Pokemon"
        />
       </div>`;
  mainContainerElm.insertAdjacentHTML("beforeend", html);
};
