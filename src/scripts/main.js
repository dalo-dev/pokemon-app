"use strict";
import { getPokemon } from "./api";

getPokemon();

document.querySelector(".main").addEventListener("scroll", function (e) {
  e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight &&
    getPokemon();
});
