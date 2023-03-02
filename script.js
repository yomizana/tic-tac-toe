/* eslint-disable no-console */

const GameBoard = (() => {
  const gameBoardArray = ["X", "X", "X", "X", "X", "X", "X", "X", "X"];
  return { gameBoardArray };
})();

const Player = () => {
  // Do stuff.
};

(function renderContents() {
  const fields = document.querySelectorAll(".field");

  fields.forEach((field, index) => {
    const position = field;
    position.textContent = GameBoard.gameBoardArray[index];
  });
})();
