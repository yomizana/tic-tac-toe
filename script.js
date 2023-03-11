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

// Checks the board and returns the winning coordinates if there's any
function checkForWin(board, mark) {
  const winningCoordinates = [];
  let count = 0;

  // Horizontal Check
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (board[i][j] === mark) {
        winningCoordinates.push([i, j]);
        count += 1;
        if (count === 3) {
          return winningCoordinates;
        }
      }
    }
    winningCoordinates.length = 0;
    count = 0;
  }

  // Vertical Check
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (board[j][i] === mark) {
        winningCoordinates.push([j, i]);
        count += 1;
        if (count === 3) {
          return winningCoordinates;
        }
      }
    }
    winningCoordinates.length = 0;
    count = 0;
  }

  // Diagonal Check #1
  for (let i = 0; i < 3; i += 1) {
    if (board[i][i] === mark) {
      winningCoordinates.push([i, i]);
      count += 1;
      if (count === 3) {
        return winningCoordinates;
      }
    } else {
      winningCoordinates.length = 0;
      count = 0;
    }
  }

  // Diagonal Check #2
  let column = 2;
  for (let i = 0; i < 3; i += 1) {
    if (board[i][column] === mark) {
      winningCoordinates.push([i, column]);
      count += 1;
      column -= 1;
      if (count === 3) {
        return winningCoordinates;
      }
    } else {
      winningCoordinates.length = 0;
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
  let gameState = "ongoing";

  const switchActivePlayer = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };

  const playRound = (row, column) => {
    try {
      if (gameState === "ongoing") {
        gameBoard.placeMark(row, column, activePlayer.mark);

        if (checkForWin(board, activePlayer.mark)) {
          gameState = "won";
        } else {
          switchActivePlayer();
          turn += 1;

          if (turn === 10) gameState = "tied";
        }
      }

      return false;
    } catch (e) {
      console.error(
        `%c${e.message}`,
        "color: red; background-color: black; font-size: larger"
      );

      return false;
    }
  };

  const newGame = () => {
    activePlayer = playerOne;
    turn = 1;
    gameState = "ongoing";
    board = gameBoard.generateBoard();
  };

  newGame();

  const getTurn = () => turn;
  const getActivePlayer = () => activePlayer;
  const getBoard = () => board;
  const getGameState = () => gameState;

  return {
    getBoard,
    playRound,
    newGame,
    getActivePlayer,
    getTurn,
    getGameState,
  };
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
    const turn = game.getTurn();
    const activePlayer = game.getActivePlayer();
    const turnInfo = document.querySelector(".turn");
    const playerInfo = document.querySelector(".player-info");

    turnInfo.textContent = `Turn: ${turn}`;
    playerInfo.textContent = `The current active player is ${activePlayer.name} (${activePlayer.mark})`;
  };

  const gameStateHandler = () => {
    const gameState = game.getGameState();
    const announcement = document.querySelector(".announcement");
    const activePlayer = game.getActivePlayer();

    if (gameState === "won")
      announcement.textContent = `The winner is ${activePlayer.name}`;

    if (gameState === "tied") announcement.textContent = "The game is tied!";
  };

  const clickEventHandler = () => {
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.querySelector(".reset-button");

    const cellClickEvent = (row, column) => {
      game.playRound(row, column);
      populateGrid();
      updatePlayerInfo();
      gameStateHandler();
    };

    cells.forEach((cell) => {
      cell.addEventListener("click", () =>
        cellClickEvent(cell.dataset.row, cell.dataset.column)
      );
    });

    resetButton.addEventListener("click", () => {
      game.newGame();
      populateGrid();
      updatePlayerInfo();
    });
  };

  generateGrid();
  populateGrid();
  updatePlayerInfo();
  clickEventHandler();
})();
