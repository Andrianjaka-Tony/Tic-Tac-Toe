export class Game {
  board;
  current_winner;

  constructor() {
    this.board = Game.makeBoard();
    this.current_winner = undefined;
  }

  /**
   * @return {string[]}
   */
  static makeBoard() {
    let response = [];
    for (let i = 0; i < 9; i++) {
      response.push(" ");
    }
    return response;
  }

  /**
   *
   * @param {number} square
   * @param {string} letter
   * @return {boolean}
   */
  make_move(square, letter) {
    if (this.board[square] == " ") {
      this.board[square] = letter;
      if (this.winner(square, letter)) {
        this.current_winner = letter;
      }
      return true;
    }
    return false;
  }

  listenWinner() {
    if (this.current_winner != undefined) {
      alert(`${this.current_winner} remporte la victoire`);
      return;
    }
    if (!this.empty_squares()) {
      alert("Match nul");
    }
  }

  /**
   *
   * @param {number} square
   * @param {string} letter
   * @return {boolean}
   */
  row_winner(square, letter) {
    let i = parseInt(square / 3);
    i *= 3;
    if (
      this.board[i] == letter &&
      this.board[i + 1] == letter &&
      this.board[i + 2] == letter
    ) {
      return true;
    }
    return false;
  }

  /**
   *
   * @param {number} square
   * @param {string} letter
   * @return {boolean}
   */
  col_winner(square, letter) {
    let i = square % 3;
    if (
      this.board[i] == letter &&
      this.board[i + 3] == letter &&
      this.board[i + 6] == letter
    ) {
      return true;
    }
    return false;
  }

  /**
   *
   * @param {string} letter
   * @return {boolean}
   */
  diag_winner(letter) {
    if (
      (this.board[0] == letter &&
        this.board[4] == letter &&
        this.board[8] == letter) ||
      (this.board[2] == letter &&
        this.board[4] == letter &&
        this.board[6] == letter)
    ) {
      return true;
    }
    return false;
  }

  /**
   *
   * @param {number} square
   * @param {string} letter
   * @return {boolean}
   */
  winner(square, letter) {
    if (
      this.col_winner(square, letter) ||
      this.row_winner(square, letter) ||
      this.diag_winner(letter)
    ) {
      return true;
    }
    return false;
  }

  /**
   * @return {boolean}
   */
  empty_squares() {
    return this.board.includes(" ");
  }

  /**
   * @return {number}
   */
  num_empty_squares() {
    let array = this.board.filter((element) => element == " ");
    return array.length;
  }

  /**
   * @return {number[]}
   */
  available_moves() {
    let response = [];
    this.board.forEach((element, index) => {
      if (element == " ") {
        response.push(index);
      }
    });
    return response;
  }
}
