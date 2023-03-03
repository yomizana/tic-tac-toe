/* eslint-disable no-console */

function Player(playerName, token) {
  return { playerName, token };
}

function Cell(player) {
  let value = 0;

  const placeToken = () => {
    value = player.token;
  };

  const getValue = () => value;

  return { placeToken, getValue };
}

function Gameboard() {
  const gameboard = [];
  const rows = 3;
  const columns = 3;

  // Generates a 3x3 array grid with objects
  for (let i = 0; i < rows; i += 1) {
    gameboard[i] = [];

    for (let j = 0; j < columns; j += 1) {
      gameboard[i].push(Cell());
    }
  }

  // Displays the board on the console
  const displayBoard = () => {
    const board = gameboard.map((row) => row.map((cell) => cell.getValue()));
    console.log(board);
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
