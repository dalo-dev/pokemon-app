const statsAcronym = {
  hp: "Hp",
  attack: "Atk",
  defense: "Def",
  "special-attack": "Sp. atk",
  "special-defense": "Sp. def",
  speed: "Spd",
};

const getPokemonTypesElms = function (types) {
  let html = "";
  types.forEach((element) => {
    html += `<span style="background-color: var(--${element.type.name});"
    >${element.type.name}</span
  >`;
  });
  return html;
};

const getPokemonStatsElms = function (stats) {
  let html = "";
  stats.forEach((element) => {
    html += `<tr>
    <td>
      <span>${statsAcronym[element.stat.name]}:</span>
    </td>
    <td>
      <span>${element.base_stat}</span>
    </td>
    <td style="width: 50%">
      <div
        class="bar"
        style="
          width: ${(100 * element.base_stat) / 255}%;
          height: 15px;
          border-radius: 1rem;
          background-color: #7ac74c;
        "
      ></div>
    </td>
  </tr>`;
  });
  return html;
};

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

export const getPokemonModal = function (pokemon) {
  const { types, stats, pokedexDesc } = pokemon;
  const pokemonInfoElm = document.querySelector(".pokemon-info");
  const html = `<figure class="pokemon-art">
  <img
    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
      pokemon.id
    }.png"
    alt="Pokemon-art"
  />
</figure>
<div class="pokemon-description">
  <h2>#${pokemon.id} - <span class="pokemon-name">${pokemon.name}</span></h2>
  <div class="pokemon-types">
    ${getPokemonTypesElms(types)}
  </div>
  <div class="pokemon-desc">
    <p>
      ${pokedexDesc.flavor_text}
      <button id="cry-btn">&#9658;</button>
    </p>
  </div>
  <div>
    <table>
      <tbody>
        ${getPokemonStatsElms(stats)}
      </tbody>
    </table>
  </div>
  <audio id="pokemon-cry">
    <source src="https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${
      pokemon.id
    }.ogg" type="audio/ogg" />
    Your browser does not support the audio tag.
  </audio>
</div>`;
  pokemonInfoElm.innerHTML = html;

  document.getElementById("cry-btn").addEventListener("click", () => {
    document.getElementById("pokemon-cry").pause();
    document.getElementById("pokemon-cry").currentTime = 0;
    document.getElementById("pokemon-cry").play();
  });
};
