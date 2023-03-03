/* eslint-disable no-alert */
/* eslint-disable no-console */

function Player(name, token) {
  return { name, token };
}

function Cell() {
  let value = 0;

  const addToken = (activePlayer) => {
    value = activePlayer.token;
  };

  const getValue = () => value;

  return { addToken, getValue };
}

function Gameboard() {
  const board = [];
  const rows = 3;
  const columns = 3;

  // Generates a 3x3 array grid with Cell objects
  for (let i = 0; i < rows; i += 1) {
    board[i] = [];

    for (let j = 0; j < columns; j += 1) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  // Places player.token in the provided coordinates
  const placeToken = (row, column, activePlayer) => {
    if (board[row][column].getValue() === 0) {
      board[row][column].addToken(activePlayer);
    }
  };

  // Displays the board on the console
  const displayBoard = () => {
    const valueBoard = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(valueBoard);
  };

  return { getBoard, placeToken, displayBoard };
}

function gameController() {
  const playerOne = Player("Player One", "X");
  const playerTwo = Player("Player Two", "O");

  let activePlayer = playerOne;
  const board = Gameboard();

  const switchActivePlayer = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };

  const newRound = () => {
    board.displayBoard();
    console.log(
      `%cCurrent active player: ${activePlayer.name}`,
      "color: white; background-color: black; font-size: larger"
    );
  };

  const playRound = (row, column) => {
    board.placeToken(row, column, activePlayer);
    switchActivePlayer();
    newRound();
  };

  newRound();

  console.log(
    "%cYou can play using the game.playRound() function! \n",
    "color: white; background-color: black; font-size: larger"
  );

  return { playRound };
}

const game = gameController();
