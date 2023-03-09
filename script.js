/* eslint-disable no-console */

function Player(name, mark) {
  return { name, mark };
}

const gameBoard = (() => {
  const board = [];

  // Generates a 3x3 array grid filled with 0s
  const generateBoard = () => {
    for (let i = 0; i < 3; i += 1) {
      board[i] = [];
      for (let j = 0; j < 3; j += 1) {
        board[i].push("");
      }
    }

    return board;
  };

  // Places player.mark in the provided coordinates
  const placeMark = (row, column, mark) => {
    if (board[row][column] === "") {
      board[row][column] = mark;
      return true;
    }

    throw new Error("This position already contains a value!");
  };

  // Displays the board on the console
  const displayBoard = () => console.log(board);

  return { generateBoard, placeMark, displayBoard };
})();

function checkForWin(board, mark) {
  let count = 0;

  // Horizontal Check
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (board[i][j] === mark) {
        count += 1;
        if (count === 3) return true;
      }
    }
    count = 0;
  }

  // Vertical Check
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (board[j][i] === mark) {
        count += 1;
        if (count === 3) return true;
      }
    }
    count = 0;
  }

  // Diagonal Check #1
  for (let i = 0; i < 3; i += 1) {
    if (board[i][i] === mark) {
      count += 1;
      if (count === 3) return true;
    } else {
      count = 0;
    }
  }

  // Diagonal Check #2
  let column = 2;
  for (let i = 0; i < 3; i += 1) {
    if (board[i][column] === mark) {
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

  let activePlayer = playerOne;
  let board = gameBoard.generateBoard();
  let turn = 1;

  const switchActivePlayer = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };

  const newRound = () => {
    if (turn >= 10) {
      gameBoard.displayBoard();
      console.log(
        `%cThe game is tied. Use the game.resetBoard() command!`,
        "color: yellow; background-color: black; font-size: larger"
      );
      return false;
    }
    console.log({ turn });
    gameBoard.displayBoard();
    console.log(
      `%cCurrent active player: ${activePlayer.name}. Your Token is: ${activePlayer.mark}`,
      "color: white; background-color: black; font-size: larger"
    );
    return true;
  };

  const playRound = (row, column) => {
    try {
      gameBoard.placeMark(row, column, activePlayer.mark);

      if (checkForWin(board, activePlayer.mark)) {
        gameBoard.displayBoard();
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

  const startOver = () => {
    turn = 1;
    board = gameBoard.generateBoard();
    console.clear();
    newRound();
  };

  newRound();

  console.log(
    "%cYou can play using the game.playRound() function! \n",
    "color: white; background-color: black; font-size: larger"
  );

  const getActivePlayer = () => activePlayer;
  const getBoard = () => board;

  return { getBoard, playRound, startOver, getActivePlayer };
}

(function displayController() {
  const game = gameController();

  // Generates 3x3 grid
  const generateGrid = () => {
    const gridContainer = document.querySelector(".grid-container");

    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        const cell = document.createElement("button");
        cell.classList.add("cell");
        cell.dataset.row = [i];
        cell.dataset.column = [j];

        gridContainer.appendChild(cell);
      }
    }
  };

  // Populates 3x3 grid with board values
  const populateGrid = () => {
    const board = game.getBoard();

    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        const cell = document.querySelector(
          `[data-row="${i}"][data-column="${j}"]`
        );

        cell.textContent = board[i][j];
      }
    }
  };

  const updatePlayerInfo = () => {
    const activePlayer = game.getActivePlayer();
    const playerInfo = document.querySelector(".player-info");
    const message = activePlayer.name;

    console.log(message);

    playerInfo.textContent = message;
  };

  const clickEventHandler = () => {
    const cells = document.querySelectorAll(".cell");

    const clickEvent = (row, column) => {
      game.playRound(row, column);
      populateGrid();
    };

    cells.forEach((cell) => {
      cell.addEventListener("click", () =>
        clickEvent(cell.dataset.row, cell.dataset.column)
      );
    });
  };

  clickEventHandler();
})();
