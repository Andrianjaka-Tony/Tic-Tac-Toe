import { Game } from "./Game.js";

export class Human {
  letter;

  constructor(letter) {
    this.letter = letter;
  }
}

class MinimaxObject {
  position;
  score;
}

export class Bot {
  letter;

  constructor(letter, depth = 10) {
    this.letter = letter;
    this.depth = depth;
  }

  /**
   *
   * @param {Game} game
   */
  make_move(game) {
    if (game.available_moves().length == 9) {
      let index = parseInt(Math.random() * 9);
      return index;
    } else {
      return this.minimax(game, this.letter).position;
    }
  }

  /**
   *
   * @param {Game} state
   * @param {letter} player
   * @returns {number}
   */
  evaluate(state, player) {
    let max_player = this.letter;
    let other_player = "O";
    if (player == "O") {
      other_player = "X";
    }

    if (state.current_winner == max_player) {
      return 1;
    } else if (state.current_winner == other_player) {
      return -1;
    } else {
      return 0;
    }
  }

  /**
   *
   * @param {Game} state
   * @param {string} player
   * @return {MinimaxObject}
   */
  minimax(state, player, depth = 0) {
    const max_player = this.letter;
    const other_player = player == "X" ? "O" : "X";

    if (state.current_winner == other_player) {
      return {
        position: null,
        score:
          (state.num_empty_squares() + 1) *
          (other_player == max_player
            ? 1
            : -1 * (state.num_empty_squares() + 1)),
      };
    } else if (!state.empty_squares()) {
      return { position: null, score: 0 };
    }

    if (depth == this.depth) {
      return { position: null, score: this.evaluate(state, player) };
    }

    if (player == max_player) {
      var best = { position: null, score: -Infinity };
    } else {
      var best = { position: null, score: Infinity };
    }

    for (var i = 0; i < state.available_moves().length; i++) {
      var possible_move = state.available_moves()[i];
      state.make_move(possible_move, player);
      var sim_score = this.minimax(state, other_player, depth + 1);

      state.board[possible_move] = " ";
      state.current_winner = null;
      sim_score.position = possible_move;

      if (player == max_player) {
        if (sim_score.score > best.score) {
          best = sim_score;
        }
      } else {
        if (sim_score.score < best.score) {
          best = sim_score;
        }
      }
    }

    return best;
  }
}
