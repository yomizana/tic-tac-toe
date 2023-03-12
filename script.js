function Player(name, mark) {
  return { name, mark };
}

const gameBoard = (() => {
  const board = [];

  const generateBoard = () => {
    for (let i = 0; i < 9; i += 1) {
      board.push("");
    }

    return board;
  };

  const placeMark = (index, mark) => {
    if (board[index] === "") {
      board[index] = mark;
      return true;
    }

    throw new Error("This position already contains a value!");
  };

  return { generateBoard, placeMark };
})();

function checkForWin(board, mark) {
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < 8; i += 1) {
    const winCondition = winConditions[i];
    const cells = [
      board[winCondition[0]],
      board[winCondition[1]],
      board[winCondition[2]],
    ];

    if (cells[0] === mark && cells[1] === mark && cells[2] === mark) {
      return winCondition;
    }
  }

  return false;
}

function gameController() {
  const playerOne = Player("Player One", "X");
  const playerTwo = Player("Player Two", "O");

  let activePlayer = playerOne;
  const board = gameBoard.generateBoard();
  let turn = 1;
  let gameState = "ongoing";

  let winCoordinates = [];

  const switchActivePlayer = () => {
    activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
  };

  const playRound = (index) => {
    try {
      if (gameState === "ongoing") {
        gameBoard.placeMark(index, activePlayer.mark);

        winCoordinates = checkForWin(board, activePlayer.mark);

        if (winCoordinates) {
          gameState = "won";
        } else {
          switchActivePlayer();
          turn += 1;
        }

        if (turn === 10) gameState = "tied";
      }

      return false;
    } catch (e) {
      return false;
    }
  };

  const getTurn = () => turn;
  const getActivePlayer = () => activePlayer;
  const getBoard = () => board;
  const getGameState = () => gameState;
  const getWinCoordinates = () => winCoordinates;

  return {
    getBoard,
    playRound,
    getActivePlayer,
    getTurn,
    getGameState,
    getWinCoordinates,
  };
}

(function displayController() {
  const game = gameController();

  const generateGrid = () => {
    const gridContainer = document.querySelector(".grid-container");

    for (let i = 0; i < 9; i += 1) {
      const cell = document.createElement("button");
      cell.classList.add("cell");

      gridContainer.appendChild(cell);
    }
  };

  const populateCells = () => {
    const board = game.getBoard();

    for (let i = 0; i < 9; i += 1) {
      const cell = document.querySelectorAll(".cell");

      cell[i].textContent = board[i];
    }
  };

  const updatePlayerInfo = () => {
    const activePlayer = game.getActivePlayer();
    const playerInfo = document.querySelector(".player-info");

    playerInfo.textContent = `The current active player is ${activePlayer.name} (${activePlayer.mark})`;
  };

  const highlightWinCoordinates = () => {
    const winCoordinates = game.getWinCoordinates();

    winCoordinates.forEach((index) => {
      const winCell = document.querySelectorAll(".cell")[index];

      winCell.classList.add("win-cell");
    });
  };

  const gameStateHandler = () => {
    const gameState = game.getGameState();
    const announcement = document.querySelector(".announcement");
    const activePlayer = game.getActivePlayer();

    if (gameState === "won") {
      announcement.textContent = `${activePlayer.name} has won the game!`;
      highlightWinCoordinates();
    }

    if (gameState === "tied") announcement.textContent = "The game is tied!";
  };

  const clickEventHandler = () => {
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.querySelector(".reset-button");

    const cellClickEvent = (index) => {
      game.playRound(index);
      populateCells();
      updatePlayerInfo();
      gameStateHandler();
    };

    cells.forEach((cell, index) => {
      cell.addEventListener("click", () => cellClickEvent(index));
    });

    resetButton.addEventListener("click", () => {
      window.location.reload();
    });
  };

  generateGrid();
  populateCells();
  updatePlayerInfo();
  clickEventHandler();
})();
