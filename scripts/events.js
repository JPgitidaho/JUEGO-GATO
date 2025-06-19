import { UI } from "./ui.js";
import { GameBoard } from "./gameBoard.js";

let game;

function handleMarkSelection() {
  const { xStart, oStart, xPlayer, oPlayer } = UI;

  xStart.addEventListener("click", () => {
    xStart.classList.add("active");
    oStart.classList.remove("active");
    xPlayer.textContent = "(YOU)";
    oPlayer.textContent = "(CPU)";
    if (game) game.playerMark = "X";
  });

  oStart.addEventListener("click", () => {
    oStart.classList.add("active");
    xStart.classList.remove("active");
    xPlayer.textContent = "(CPU)";
    oPlayer.textContent = "(YOU)";
    if (game) game.playerMark = "O";
  });
}

function handleStartGame() {
  const { btnVsCPU, btnVsPlayer, xStart, xPlayer, oPlayer } = UI;

  btnVsCPU.addEventListener("click", () => {
    const mark = xStart.classList.contains("active") ? "X" : "O";
    game = new GameBoard(false, mark);
    game.startGame();
    if (game.playerMark === "O") game.computerMove();
    handleCellEvents();
  });

  btnVsPlayer.addEventListener("click", () => {
    game = new GameBoard(true, "X");

    const isYou = xPlayer.textContent === "(YOU)";
    xPlayer.textContent = isYou ? "P1" : "P2";
    oPlayer.textContent = isYou ? "P2" : "P1";

    game.startGame();
    handleCellEvents();
  });
}

function handleBannerActions() {
  const {
    btnRestart,
    overlay, banner,
    restartScreen, btnCancel, btnRestartGame,
    btnTieQuit, btnTieNext,
    btnWinQuit, btnWinNext
  } = UI;

  // Mostrar pantalla de confirmación de reinicio
  btnRestart.addEventListener("click", () => {
    overlay.style.display = "flex";
    banner.style.display = "flex";
    restartScreen.style.display = "flex";
    btnCancel.style.display = "block";
    btnRestartGame.style.display = "block";
  });

  // Confirmar reinicio total
  btnRestartGame.addEventListener("click", () => {
    game.resetGame();
  });

  // Cancelar reinicio
  btnCancel.addEventListener("click", () => {
    overlay.style.display = "none";
    banner.style.display = "none";
    restartScreen.style.display = "none";
    btnCancel.style.display = "none";
    btnRestartGame.style.display = "none";
  });

  // Botones de “QUIT” (empate o victoria)
  btnTieQuit.addEventListener("click", () => game.quitGame());
  btnWinQuit.addEventListener("click", () => game.quitGame());

  // Botones “NEXT ROUND”
  btnTieNext.addEventListener("click", () => game.resetGame());
  btnWinNext.addEventListener("click", () => game.resetGame());
}

function handleCellEvents() {
  const { cells } = UI;

  cells.forEach((cell, index) => {
    cell.addEventListener("mouseover", () => game.mouseOver(cell));
    cell.addEventListener("mouseout", () => game.mouseOut(cell));
    cell.addEventListener("click", () => game.selectCell(cell, index));
  });
}

export function initEvents() {
  handleMarkSelection();
  handleStartGame();
  handleBannerActions();
}
