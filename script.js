/* eslint-disable no-console */

function Cell() {
  const value = 0;

  const getValue = () => value;

  return { getValue };
}

function Gameboard() {
  const gameboard = [];
  const rows = 3;
  const columns = 3;

  // Generate 3x3 array grid.
  for (let i = 0; i < rows; i += 1) {
    gameboard[i] = [];

    for (let j = 0; j < columns; j += 1) {
      gameboard[i].push(Cell());
    }
  }

  const displayBoard = () => {
    const board = gameboard.map((row) => row.map((cell) => cell.getValue()));
    console.log(board);
  };

  return { displayBoard };
}

const game = Gameboard();
game.displayBoard();
