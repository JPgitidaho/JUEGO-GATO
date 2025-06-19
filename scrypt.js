const xStart = document.querySelector(".choice-box__container-x");
const oStart = document.querySelector(".choice-box__container-o");
const btnVsCPU = document.querySelector(".btn-vs-cpu");
const btnVsPlayer = document.querySelector(".btn-vs-player");
const btnRestart = document.querySelector(".restart-btn");
const btnTieNext = document.querySelector(".tie-screen .btn-next-round");
const btnTieQuit = document.querySelector(".tie-screen .btn-quit");
const btnWinNext = document.querySelector(".win-screen .btn-next-round");
const btnWinQuit = document.querySelector(".win-screen .btn-quit");
const btnCancel = document.querySelector(".restart-screen .btn-cancel");
const btnRestartGame = document.querySelector(".restart-screen .btn-restart");
const turnX = document.querySelector(".turn-x");
const turnO = document.querySelector(".turn-o");

const overlay = document.querySelector(".overlay");
const banner = document.querySelector(".banner");
const startScreen = document.querySelector(".start-screen");
const gameScreen = document.querySelector(".game-screen");
const restartScreen = document.querySelector(".restart-screen");
const tieScreen = document.querySelector(".tie-screen");
const winScreen = document.querySelector(".win-screen");
const winScreenText = document.querySelector(".win-screen-result__text");
const circleWinContainer = document.querySelector(".circle-win-container");
const crossWinContainer = document.querySelector(".cross-win-container");
const cellsContainer = document.querySelector(".cells-container");
const turnContainer = document.querySelector(".turn-icon");
const cells = document.querySelectorAll(".cell");

const xPlayer = document.querySelector(".x-player");
const oPlayer = document.querySelector(".o-player");

const xIconLink = "./assets/images/icon-x.svg";
const xOutlineLink = "./assets/images/icon-x-outline.svg";
const oIconLink = "./assets/images/icon-o.svg";
const oOutlineLink = "./assets/images/icon-o-outline.svg";
const xTurnIcon = `<svg
                class="turn-x"
                width="20"
                height="20"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                />
              </svg>`;
const oTurnIcon = `<svg
                class="turn-o"
                width="20"
                height="20"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
                  fill="currentColor"
                />
              </svg>`;
const xWinner = "./assets/images/icon-x-winner.svg";
const oWinner = "./assets/images/icon-o-winner.svg";

const countX = document.querySelector(".count-x");
const countTie = document.querySelector(".count-tie");
const countO = document.querySelector(".count-o");

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let playerMark = "O";
let gameState = ["", "", "", "", "", "", "", "", ""];

class GameBoard {
  constructor(isMultiPlayer, playerMark) {
    this.isMultiPlayer = isMultiPlayer;
    this.playerMark = playerMark || "O";
    this.playerMark2 = !isMultiPlayer
      ? ""
      : this.playerMark === "O"
      ? "X"
      : "O";
    this.currentOutline = this.playerMark === "O" ? oOutlineLink : xOutlineLink;
    this.currentMark = this.playerMark === "O" ? oIconLink : xIconLink;
    this.computerMark = this.playerMark === "O" ? xIconLink : oIconLink;
    this.turnIcon = xTurnIcon;
    this.winner = "";
    this.winnerMark = "";
    this.xScore = 0;
    this.ties = 0;
    this.oScore = 0;
  }

  nextRound() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => {
      cell.classList.remove("active", "x", "o");
      cell.querySelector("img").src = "";
      cell.style.boxShadow = "inset 0 -0.8rem 0 #111c22";
      cell.style.backgroundColor = "#1f3641";
    });

    crossWinContainer.style.display = "none";
    circleWinContainer.style.display = "none";
    overlay.style.display = "none";
    banner.style.display = "none";
    winScreen.style.display = "none";
    tieScreen.style.display = "none";

    this.turnIcon = this.playerMark === "O" ? oTurnIcon : xTurnIcon;
    turnContainer.innerHTML = this.turnIcon;

    if (!this.isMultiPlayer && this.playerMark === "O") {
      this.computerMove();
      cellsContainer.classList.remove("no-click");
    } else if (this.playerMark === "X") {
      this.switchPlayer();
      cellsContainer.classList.remove("no-click");
    }
  }

  resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    this.xScore = 0;
    this.oScore = 0;
    this.ties = 0;
    countX.textContent = "0";
    countO.textContent = "0";
    countTie.textContent = "0";
    cells.forEach((cell) => {
      cell.classList.remove("active", "x", "o");
      cell.querySelector("img").src = "";
      cell.style.boxShadow = "inset 0 -0.8rem 0 #111c22";
      cell.style.backgroundColor = "#1f3641";
    });
    crossWinContainer.style.display = "none";
    circleWinContainer.style.display = "none";
    overlay.style.display = "none";
    banner.style.display = "none";
    winScreen.style.display = "none";
    tieScreen.style.display = "none";
    restartScreen.style.display = "none";
    cellsContainer.classList.remove("no-click");
  }

  quitGame() {
    this.resetGame();
    startScreen.classList.add("start-visible");
    gameScreen.classList.remove("game-visible");
    cellsContainer.classList.remove("no-click");
  }

  displayTie() {
    overlay.style.display = "flex";
    banner.style.display = "flex";
    tieScreen.style.display = "flex";
    tieScreen.style.flexDirection = "column";
    btnTieQuit.style.display = "flex";
    btnTieNext.style.display = "flex";
  }

  checkTie() {
    let countEmptyCells = 0;
    cells.forEach((cell) => {
      if (!cell.classList.contains("active")) countEmptyCells++;
    });
    if (countEmptyCells === 0) {
      this.ties++;
      countTie.textContent = this.ties;
      return true;
    }
    return false;
  }

  assignWinner(winningMark) {
    if (this.isMultiPlayer) {
      if (winningMark === "X") {
        this.winner = xPlayer.textContent === "P1" ? "Player 1" : "Player 2";
      } else {
        this.winner = oPlayer.textContent === "P1" ? "Player 1" : "Player 2";
      }
    } else {
      if (this.playerMark === winningMark) this.winner = "Player";
      else this.winner = "Computer";
    }
  }

  markWinningCells(a, b, c, winnerIcon) {
    cells[a].style.backgroundColor =
      winnerIcon === xWinner ? "#65E9E4" : "#F2B137";
    cells[b].style.backgroundColor =
      winnerIcon === xWinner ? "#65E9E4" : "#F2B137";
    cells[c].style.backgroundColor =
      winnerIcon === xWinner ? "#65E9E4" : "#F2B137";
    cells[a].querySelector("img").src = winnerIcon;
    cells[b].querySelector("img").src = winnerIcon;
    cells[c].querySelector("img").src = winnerIcon;
  }

  displayWinner() {
    winScreenText.style.display = "block";
    overlay.style.display = "flex";
    banner.style.display = "flex";
    winScreen.style.display = "flex";
    winScreen.style.flexDirection = "column";
    btnWinNext.style.display = "flex";
    btnWinQuit.style.display = "flex";
    if (this.winnerMark === "X") crossWinContainer.style.display = "flex";
    else circleWinContainer.style.display = "flex";

    if (this.isMultiPlayer) {
      winScreenText.textContent = `${this.winner.toUpperCase()} WINS!`;
    } else {
      winScreenText.textContent =
        this.winner === "Player" ? "YOU WON!" : "YOU LOST...";
    }
  }

  checkWinner() {
    for (let i = 0; i < winningConditions.length; i++) {
      const [a, b, c] = winningConditions[i];
      if (gameState[a] === gameState[b] && gameState[b] === gameState[c]) {
        if (gameState[a] === "X") {
          this.markWinningCells(a, b, c, xWinner);
          this.winnerMark = "X";
          this.xScore++;
          countX.textContent = this.xScore;
          this.assignWinner("X");
          return true;
        } else if (gameState[a] === "O") {
          this.markWinningCells(a, b, c, oWinner);
          this.winnerMark = "O";
          this.oScore++;
          countO.textContent = this.oScore;
          this.assignWinner("O");
          return true;
        }
      }
    }
    return false;
  }

  startGame() {
    startScreen.classList.remove("start-visible");
    gameScreen.classList.add("game-visible");
    turnContainer.innerHTML = this.turnIcon;
  }

  updateIcons() {
    this.currentOutline = this.playerMark === "O" ? oOutlineLink : xOutlineLink;
    this.currentMark = this.playerMark === "O" ? oIconLink : xIconLink;
  }

  switchPlayer() {
    this.turnIcon = this.turnIcon === oTurnIcon ? xTurnIcon : oTurnIcon;
    turnContainer.innerHTML = this.turnIcon;
    if (this.isMultiPlayer) {
      this.playerMark = this.playerMark === "O" ? "X" : "O";
      this.updateIcons();
    }
  }

  checkEmpty(c) {
    return !c.classList.contains("active");
  }

  mouseOver(c) {
    const cell = c.querySelector("img");
    if (this.checkEmpty(c)) cell.src = this.currentOutline;
  }

  mouseOut(c) {
    const cell = c.querySelector("img");
    if (this.checkEmpty(c)) cell.src = "";
  }

  computerMove() {
    cellsContainer.classList.add("no-click");
    setTimeout(() => {
      let emptyCells = [];
      let iconClass = this.playerMark === "O" ? "x" : "o";
      cells.forEach((cell, index) => {
        if (!cell.classList.contains("active"))
          emptyCells.push({ cell, index });
      });
      if (emptyCells.length > 0) {
        const randomCell =
          emptyCells[Math.floor(Math.random() * emptyCells.length)];
        randomCell.cell.style.boxShadow = "inset 0 -0.4rem 0 #0f191e";
        const cell = randomCell.cell.querySelector("img");
        cell.src = this.computerMark;
        randomCell.cell.classList.add("active");
        randomCell.cell.classList.add(iconClass);
        gameState[randomCell.index] = this.playerMark === "O" ? "X" : "O";
        if (this.checkWinner()) {
          this.displayWinner();
        } else if (this.checkTie()) {
          this.displayTie();
        } else {
          this.switchPlayer();
          cellsContainer.classList.remove("no-click");
        }
      }
    }, 1000);
  }

  selectCell(c, index) {
    if (cellsContainer.classList.contains("no-click")) return;
    let iconClass = this.playerMark === "O" ? "o" : "x";
    c.style.boxShadow = "inset 0 -0.4rem 0 #0f191e";
    const cell = c.querySelector("img");
    if (this.checkEmpty(c)) {
      cell.src = this.currentMark;
      c.classList.add("active");
      c.classList.add(iconClass);
      gameState[index] = this.playerMark;
      this.switchPlayer();
      if (this.checkWinner()) {
        this.displayWinner();
      } else if (this.checkTie()) {
        this.displayTie();
      } else {
        if (!this.isMultiPlayer) {
          this.computerMove();
        }
      }
    }
  }
}

let newGame;

cells.forEach((cell, index) => {
  cell.addEventListener("mouseover", () => newGame.mouseOver(cell));
  cell.addEventListener("mouseout", () => newGame.mouseOut(cell));
  cell.addEventListener("click", () => newGame.selectCell(cell, index));
});

btnVsCPU.addEventListener("click", () => {
  newGame = new GameBoard(false, playerMark);
  newGame.startGame();
  if (playerMark === "O") newGame.computerMove();
});

btnVsPlayer.addEventListener("click", () => {
  newGame = new GameBoard(true, "X");
  if (xPlayer.textContent === "(YOU)") {
    xPlayer.textContent = "P1";
    oPlayer.textContent = "P2";
  } else {
    xPlayer.textContent = "P2";
    oPlayer.textContent = "P1";
  }
  newGame.startGame();
});

xStart.addEventListener("click", () => {
  xStart.classList.add("active");
  oStart.classList.remove("active");
  xPlayer.textContent = "(YOU)";
  oPlayer.textContent = "(CPU)";
  playerMark = "X";
});

oStart.addEventListener("click", () => {
  oStart.classList.add("active");
  xStart.classList.remove("active");
  xPlayer.textContent = "(CPU)";
  oPlayer.textContent = "(YOU)";
  playerMark = "O";
});

document.addEventListener("DOMContentLoaded", () => {
  startScreen.classList.add("start-visible");
});

btnTieNext.addEventListener("click", () => newGame.nextRound());
btnWinNext.addEventListener("click", () => newGame.nextRound());
btnTieQuit.addEventListener("click", () => newGame.quitGame());
btnWinQuit.addEventListener("click", () => newGame.quitGame());
btnRestart.addEventListener("click", () => {
  overlay.style.display = "flex";
  banner.style.display = "flex";
  restartScreen.style.display = "flex";
  btnCancel.style.display = "block";
  btnRestartGame.style.display = "block";
});
btnRestartGame.addEventListener("click", () => newGame.resetGame());
btnCancel.addEventListener("click", () => {
  overlay.style.display = "none";
  banner.style.display = "none";
  restartScreen.style.display = "none";
  btnCancel.style.display = "none";
  btnRestartGame.style.display = "none";
});
