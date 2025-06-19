// Manejo de eventos
import { UI } from "./ui.js";
import { GameBoard } from "./gameBoard.js";
import { setPlayerMark } from "./state.js";

let newGame = null;

export function initEvents() {
  UI.xStart.addEventListener("click", () => {
    UI.xStart.classList.add("active");
    UI.oStart.classList.remove("active");
    UI.xPlayer.textContent = "(YOU)";
    UI.oPlayer.textContent = "(CPU)";
    setPlayerMark("X");
  });

  UI.oStart.addEventListener("click", () => {
    UI.oStart.classList.add("active");
    UI.xStart.classList.remove("active");
    UI.xPlayer.textContent = "(CPU)";
    UI.oPlayer.textContent = "(YOU)";
    setPlayerMark("O");
  });

  UI.btnVsCPU.addEventListener("click", () => {
    newGame = new GameBoard(false, UI.xStart.classList.contains("active") ? "X" : "O");
    newGame.startGame();
    if (newGame.playerMark === "O") newGame.computerMove();
    registerCellEvents();
  });

  UI.btnVsPlayer.addEventListener("click", () => {
    newGame = new GameBoard(true, "X");
    const isYou = UI.xPlayer.textContent === "(YOU)";
    UI.xPlayer.textContent = isYou ? "P1" : "P2";
    UI.oPlayer.textContent = isYou ? "P2" : "P1";
    newGame.startGame();
    registerCellEvents();
  });

  UI.btnRestart.addEventListener("click", () => {
    UI.overlay.style.display = "flex";
    UI.banner.style.display = "flex";
    UI.restartScreen.style.display = "flex";
    UI.btnCancel.style.display = "block";
    UI.btnRestartGame.style.display = "block";
  });

  UI.btnRestartGame.addEventListener("click", () => newGame.resetGame());
  UI.btnCancel.addEventListener("click", () => {
    UI.overlay.style.display = "none";
    UI.banner.style.display = "none";
    UI.restartScreen.style.display = "none";
    UI.btnCancel.style.display = "none";
    UI.btnRestartGame.style.display = "none";
  });

  UI.btnTieNext.addEventListener("click", () => newGame.resetGame());
  UI.btnTieQuit.addEventListener("click", () => newGame.resetGame());
  UI.btnWinNext.addEventListener("click", () => newGame.resetGame());
  UI.btnWinQuit.addEventListener("click", () => newGame.resetGame());
}

function registerCellEvents() {
  UI.cells.forEach((cell, index) => {
    cell.addEventListener("mouseover", () => newGame.mouseOver(cell));
    cell.addEventListener("mouseout", () => newGame.mouseOut(cell));
    cell.addEventListener("click", () => newGame.selectCell(cell, index));
  });
}
