/* eslint-disable no-console */

function Player(playerName, token) {
  return { playerName, token };
}

function Cell(player) {
  let value = 0;

  const addToken = () => {
    value = player.token;
  };

  const getValue = () => value;

  return { addToken, getValue };
}

function Gameboard() {
  const board = [];
  const rows = 3;
  const columns = 3;

  // Generates a 3x3 array grid with objects
  for (let i = 0; i < rows; i += 1) {
    board[i] = [];

    for (let j = 0; j < columns; j += 1) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  const placeToken = () => {};

  // Displays the board on the console
  const displayBoard = () => {
    const valueBoard = game.map((row) => row.map((cell) => cell.getValue()));
    console.log(valueBoard);
  };

  return { displayBoard };
}

function gameController() {
  const playerOne = Player("Yomi", "X");
  const playerTwo = Player("Alix", "O");

  let activePlayer = playerOne;
}

const game = Gameboard();
game.displayBoard();
