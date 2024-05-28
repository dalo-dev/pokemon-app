(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const c of t)if(c.type==="childList")for(const r of c.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function n(t){const c={};return t.integrity&&(c.integrity=t.integrity),t.referrerPolicy&&(c.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?c.credentials="include":t.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(t){if(t.ep)return;t.ep=!0;const c=n(t);fetch(t.href,c)}})();const f={hp:"Hp",attack:"Atk",defense:"Def","special-attack":"Sp. atk","special-defense":"Sp. def",speed:"Spd"},g=function(o){let e="";return o.forEach(n=>{e+=`<span style="background-color: var(--${n.type.name});"
    >${n.type.name}</span
  >`}),e},y=function(o){let e="";return o.forEach(n=>{e+=`<tr>
    <td>
      <span>${f[n.stat.name]}:</span>
    </td>
    <td>
      <span>${n.base_stat}</span>
    </td>
    <td style="width: 50%">
      <div
        class="bar"
        style="
          width: ${100*n.base_stat/255}%;
          height: 15px;
          border-radius: 1rem;
          background-color: #7ac74c;
        "
      ></div>
    </td>
  </tr>`}),e},k=function(o){const e=document.querySelector(".main__container"),n=`<div class="pokemon-card" data-pokemonId = "${o+1}">
        <img
        class="pokemon-img pixel"
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${o+1}.png"
        alt="Pokemon"
        />
       </div>`;e.insertAdjacentHTML("beforeend",n)},h=function(o){const{types:e,stats:n,pokedexDesc:s}=o,t=document.querySelector(".pokemon-info"),c=`<figure class="pokemon-art">
  <img
    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${o.id}.png"
    alt="Pokemon-art"
  />
</figure>
<div class="pokemon-description">
  <h2>#${o.id} - <span class="pokemon-name">${o.name}</span></h2>
  <div class="pokemon-types">
    ${g(e)}
  </div>
  <div class="pokemon-desc">
    <p>
      ${s.flavor_text}
      <button id="cry-btn">&#9658;</button>
    </p>
  </div>
  <div>
    <table>
      <tbody>
        ${y(n)}
      </tbody>
    </table>
  </div>
  <audio id="pokemon-cry">
    <source src="https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${o.id}.ogg" type="audio/ogg" />
    Your browser does not support the audio tag.
  </audio>
</div>`;t.innerHTML=c,document.getElementById("cry-btn").addEventListener("click",()=>{document.getElementById("pokemon-cry").pause(),document.getElementById("pokemon-cry").currentTime=0,document.getElementById("pokemon-cry").play()})},d=document.querySelector(".overlay"),i=document.getElementById("pokemon-modal");let a=0;const l=function(){d.classList.add("hidden")},p=function(){d.classList.remove("hidden")},v=function(){i.querySelector("img").addEventListener("load",()=>{i.classList.remove("hidden"),l()})},m=async function(){if(a<=1025){p();const e=await(await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${a}&limit=${a+50>1025?50-(1025-a):50}`)).json(),{results:n}=e;n.forEach((s,t)=>{k(t+a)}),a+=50,l()}},L=async function(o){p();const[e,n]=await Promise.all([fetch(`https://pokeapi.co/api/v2/pokemon/${o}`),fetch(`https://pokeapi.co/api/v2/pokemon-species/${o}`)]),s=await e.json(),c=(await n.json()).flavor_text_entries.filter(u=>u.language.name==="en").at(-1),r={...s,pokedexDesc:c};h(r),v()},E=function(){const o=document.querySelector(".main__container"),e=document.getElementById("pokemon-modal"),n=document.querySelector(".close-modal");document.querySelector(".main").addEventListener("scroll",function(s){s.target.scrollTop+s.target.offsetHeight>=s.target.scrollHeight&&m()}),o.addEventListener("click",s=>{s.target.classList.contains("pokemon-img")&&L(s.target.closest(".pokemon-card").dataset.pokemonid)}),n.addEventListener("click",()=>{e.classList.add("hidden")}),e.addEventListener("click",s=>{s.target.classList.contains("overlay")&&e.classList.add("hidden")})};E();m();
