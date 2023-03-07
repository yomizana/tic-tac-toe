/* eslint-disable no-console */

function Player(name, token) {
  return { name, token };
}

function Gameboard() {
  const board = [];
  const rows = 3;
  const columns = 3;

  // Generates a 3x3 array grid filled with 0s
  for (let i = 0; i < rows; i += 1) {
    board[i] = [];
    for (let j = 0; j < columns; j += 1) {
      board[i].push(0);
    }
  }

  const getBoard = () => board;

  // Places player.mark in the provided coordinates
  const placeMark = (row, column, mark) => {
    if (board[row][column].getValue() === 0) {
      board[row][column] = mark;
      return true;
    }

    throw new Error("This position already contains a value!");
  };

  // Displays the board on the console
  const displayBoard = () => console.log(board);

  return { getBoard, placeMark, displayBoard };
}

function checkForWin(board, token) {
  let count = 0;

  // Horizontal Check
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (board[i][j] === token) {
        count += 1;
        if (count === 3) return true;
      }
    }
    count = 0;
  }

  // Vertical Check
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (board[j][i] === token) {
        count += 1;
        if (count === 3) return true;
      }
    }
    count = 0;
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
  let board = Gameboard();

  const switchActivePlayer = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };

  const newRound = () => {
    if (turn >= 10) {
      console.log(board.getValueBoard());
      console.log(
        `%cThe game is tied. Use the game.resetBoard() command!`,
        "color: yellow; background-color: black; font-size: larger"
      );
      return false;
    }
    console.log({ turn });
    console.log(board.getValueBoard());
    console.log(
      `%cCurrent active player: ${activePlayer.name}. Your Token is: ${activePlayer.token}`,
      "color: white; background-color: black; font-size: larger"
    );
    return true;
  };

  const playRound = (row, column) => {
    try {
      board.placeToken(row, column, activePlayer.token);

      if (checkForWin(board.getValueBoard(), activePlayer.token)) {
        console.log(board.getValueBoard());
        console.log(
          `%c${activePlayer.name} has won the game. Use the game.resetBoard() function to play again!`,
          "color: yellow; background-color: black; font-size: larger"
        );
      } else {
        switchActivePlayer();

        turn += 1;

        newRound();
      }
    } catch (e) {
      console.error(
        `%c${e.message}`,
        "color: red; background-color: black; font-size: larger"
      );
    }
  };

  const resetBoard = () => {
    turn = 1;
    board = Gameboard();
    console.clear();
    newRound();
  };

  newRound();

  console.log(
    "%cYou can play using the game.playRound() function! \n",
    "color: white; background-color: black; font-size: larger"
  );

  return { playRound, resetBoard };
}

const game = gameController();
