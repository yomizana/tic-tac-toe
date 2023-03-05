/* eslint-disable no-console */

function Player(name, token) {
  return { name, token };
}

function Cell() {
  let value = 0;

  const addToken = (token) => {
    value = token;
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
  const placeToken = (row, column, token) => {
    if (board[row][column].getValue() === 0) {
      board[row][column].addToken(token);
      return true;
    }

    throw new Error("Cell already contains a value!");
  };

  // Displays the board on the console
  const getValueBoard = () => {
    const valueBoard = board.map((row) => row.map((cell) => cell.getValue()));
    return valueBoard;
  };

  return { getBoard, placeToken, getValueBoard };
}

function checkForWin(board, token) {
  let count = 0;

  // Horizontal Check
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (board[i][j] === token) {
        count += 1;
        if (count === 3) return true;
      } else {
        count = 0;
      }
    }
  }

  // Vertical Check
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (board[j][i] === token) {
        count += 1;
        if (count === 3) return true;
      } else {
        count = 0;
      }
    }
  }

  // Diagonal Check #1
  for (let i = 0; i < 3; i += 1) {
    if (board[i][i] === token) {
      count += 1;
      if (count === 3) return true;
    } else {
      count = 0;
    }
  }

  // Diagonal Check #2
  let column = 2;
  for (let i = 0; i < 3; i += 1) {
    if (board[i][column] === token) {
      count += 1;
      column -= 1;
      if (count === 3) return true;
    } else {
      count = 0;
    }
  }

  return false;
}

function gameController() {
  const playerOne = Player("Player One", "X");
  const playerTwo = Player("Player Two", "O");
  let turn = 1;

  let activePlayer = playerOne;
  const board = Gameboard();

  const switchActivePlayer = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };

  const newRound = () => {
    console.log({ turn });
    console.log(board.getValueBoard());
    console.log(
      `%cCurrent active player: ${activePlayer.name}. Your Token is: ${activePlayer.token}`,
      "color: white; background-color: black; font-size: larger"
    );
  };

  const playRound = (row, column) => {
    try {
      board.placeToken(row, column, activePlayer.token);

      console.log(checkForWin(board.getValueBoard(), activePlayer.token));
      switchActivePlayer();

      turn += 1;

      if (turn === 10) console.log("The game is TIED.");

      newRound();
    } catch (e) {
      console.error(
        `%c${e.message}`,
        "color: red; background-color: black; font-size: larger"
      );
    }
  };

  newRound();

  console.log(
    "%cYou can play using the game.playRound() function! \n",
    "color: white; background-color: black; font-size: larger"
  );

  return { playRound };
}

const game = gameController();
