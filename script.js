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

    playerInfo.textContent = `The current active player is ${activePlayer.name} (${activePlayer.mark})`;
  };

  const highlightWinCoordinates = () => {
    const winningCoordinates = game.getWinningCoordinates();

    winningCoordinates.forEach((coordinate) => {
      console.log(coordinate);
      const winCell = document.querySelector(
        `[data-row="${coordinate[0]}"][data-column="${coordinate[1]}"]`
      );

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
      window.location.reload();
    });
  };

  generateGrid();
  populateGrid();
  updatePlayerInfo();
  clickEventHandler();
})();
