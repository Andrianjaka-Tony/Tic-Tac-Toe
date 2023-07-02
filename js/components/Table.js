import { Game } from "../models/Game.js";
import { renderForm } from "./Form.js";

/**
 *
 * @param {Game} game
 */
export function renderGame(game, begin, bot) {
  if (begin == "true") {
    bot.letter = "O";
  } else {
    bot.letter = "X";
  }
  document.body.classList.add("invisible");
  window.setTimeout(() => {
    document.body.innerHTML = `
      <div class="container">
        <div class="game">
          <div num="0" class="game_card"></div>
          <div num="1" class="game_card"></div>
          <div num="2" class="game_card"></div>
          <div num="3" class="game_card"></div>
          <div num="4" class="game_card"></div>
          <div num="5" class="game_card"></div>
          <div num="6" class="game_card"></div>
          <div num="7" class="game_card"></div>
          <div num="8" class="game_card"></div>
          <div
            style="top: 0px; left: 99px; width: 2px; height: 300px" class="game_line"
          ></div>
          <div
            style="top: 0px; left: 199px; width: 2px; height: 300px" class="game_line"
          ></div>
          <div
            style="top: 99px; left: 0px; width: 300px; height: 2px" class="game_line"
          ></div>
          <div
            style="top: 199px; left: 0px; width: 300px; height: 2px" class="game_line"
          ></div>
          <button class="replay btn">Rejouer</button>
        </div>
      </div>
    `;
    document.body.classList.remove("invisible");

    document.querySelector(".replay").addEventListener("click", () => {
      renderForm();
    });

    listenCards(game, begin, bot);
  }, 300);
}

/**
 * @param {Game} game
 * @param {boolean} begin
 * @return {void}
 */
function listenCards(game, begin, bot) {
  console.log(bot);
  let letter = "X";
  let letterBot = "O";
  if (begin == "false") {
    letterBot = "X";
    let move = bot.make_move(game, letterBot);
    game.make_move(move, letterBot);
    document
      .querySelector(`.game_card[num="${move}"]`)
      .classList.add(letterBot);
    game.listenWinner();

    letter = "O";
  }
  document.querySelectorAll(".game_card").forEach((card) => {
    card.addEventListener("click", () => {
      let index = parseInt(card.getAttribute("num"));
      let make = game.make_move(index, letter);
      game.listenWinner();
      if (make) {
        card.classList.add(letter);

        let move = bot.make_move(game, letterBot);
        game.make_move(move, letterBot);
        document
          .querySelector(`.game_card[num="${move}"]`)
          .classList.add(letterBot);
        game.listenWinner();
      }
    });
  });
}
