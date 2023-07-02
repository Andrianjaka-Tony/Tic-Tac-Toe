import { Game } from "../models/Game.js";
import { Bot } from "../models/Player.js";
import { renderGame } from "./Table.js";

export function renderForm() {
  document.body.classList.add("invisible");
  window.setTimeout(() => {
    document.body.innerHTML = `
      <div class="container">
        <div class="form">
          <h1 class="form_title">Tic Tac Toe</h1>
          <div class="form_section">
            <div class="form_section_title">Equipe</div>
            <div id="begin" class="form_section_container">
              <img begin="true" src="./image/tic-tac-toe-1.webp" class="selected" alt="" />
              <img begin="false" src="./image/tic-tac-toe-2.png" alt="" />
            </div>
          </div>
          <div class="form_section">
            <div class="form_section_title">Difficulte</div>
            <div id="depth" class="form_section_container">
              <div depth="3" class="active">Facile</div>
              <div depth="5" class="">Moyen</div>
              <div depth="10" class="">Dazai</div>
            </div>
          </div>
          <button class="form_btn">Jouer</button>
        </div>
      </div>
    `;
    document.body.classList.remove("invisible");

    document.querySelectorAll("#begin img").forEach((img) => {
      img.addEventListener("click", () => {
        document.querySelectorAll("#begin img").forEach((img1) => {
          img1.classList.remove("selected");
        });
        img.classList.add("selected");
      });
    });

    document.querySelectorAll("#depth div").forEach((div) => {
      div.addEventListener("click", () => {
        document.querySelectorAll("#depth div").forEach((div1) => {
          div1.classList.remove("active");
        });
        div.classList.add("active");
      });
    });

    document.querySelector(".form_btn").addEventListener("click", game);
  }, 300);
}

function game() {
  let begin = document.querySelector("#begin .selected").getAttribute("begin");
  let depth = document.querySelector("#depth .active").getAttribute("depth");
  console.log(begin);
  renderGame(new Game(), begin, new Bot("X", depth));
}

renderForm();
