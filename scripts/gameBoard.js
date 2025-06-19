// Clase principal que controla la lógica del juego
import { UI } from "./ui.js";
import { Icons } from "./icons.js";
import { gameState, resetGameState, playerMark } from "./state.js";

export class GameBoard {
  constructor(isMultiPlayer, mark) {
    this.isMultiPlayer = isMultiPlayer;
    this.playerMark = mark || playerMark;
    this.playerMark2 = isMultiPlayer ? (this.playerMark === "O" ? "X" : "O") : "";
    this.turnIcon = this.playerMark === "O" ? Icons.oTurn : Icons.xTurn;
    this.updateIcons();
    this.resetScores();
  }

  updateIcons() {
    this.currentOutline = this.playerMark === "O" ? Icons.oOutline : Icons.xOutline;
    this.currentMark = this.playerMark === "O" ? Icons.o : Icons.x;
    this.computerMark = this.playerMark === "O" ? Icons.x : Icons.o;
  }

  resetScores() {
    this.xScore = 0;
    this.oScore = 0;
    this.ties = 0;
    UI.countX.textContent = "0";
    UI.countO.textContent = "0";
    UI.countTie.textContent = "0";
  }

  startGame() {
    UI.startScreen.classList.remove("start-visible");
    UI.gameScreen.classList.add("game-visible");
    UI.turnContainer.innerHTML = this.turnIcon;
  }

  resetGame() {
    resetGameState();
    UI.cells.forEach(cell => {
      cell.classList.remove("active", "x", "o");
      cell.querySelector("img").src = "";
      cell.style.boxShadow = "inset 0 -0.8rem 0 #111c22";
      cell.style.backgroundColor = "#1f3641";
    });
    UI.crossWinContainer.style.display = "none";
    UI.circleWinContainer.style.display = "none";
    UI.overlay.style.display = "none";
    UI.banner.style.display = "none";
    UI.winScreen.style.display = "none";
    UI.tieScreen.style.display = "none";
    UI.restartScreen.style.display = "none";
    UI.cellsContainer.classList.remove("no-click");
  }

  displayWinner() {
    UI.winScreenText.style.display = "block";
    UI.overlay.style.display = "flex";
    UI.banner.style.display = "flex";
    UI.winScreen.style.display = "flex";
    UI.winScreen.style.flexDirection = "column";
    UI.btnWinNext.style.display = "flex";
    UI.btnWinQuit.style.display = "flex";
    if (this.winnerMark === "X") UI.crossWinContainer.style.display = "flex";
    else UI.circleWinContainer.style.display = "flex";

    UI.winScreenText.textContent = this.isMultiPlayer
      ? `${this.winner.toUpperCase()} WINS!`
      : this.winner === "Player" ? "YOU WON!" : "YOU LOST...";
  }

  checkWinner() {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (let [a, b, c] of winPatterns) {
      if (gameState[a] === gameState[b] && gameState[b] === gameState[c] && gameState[a]) {
        this.winnerMark = gameState[a];
        const winnerIcon = this.winnerMark === "X" ? Icons.xWinner : Icons.oWinner;
        [a, b, c].forEach(i => {
          UI.cells[i].style.backgroundColor = this.winnerMark === "X" ? "#65E9E4" : "#F2B137";
          UI.cells[i].querySelector("img").src = winnerIcon;
        });
        this.assignWinner(this.winnerMark);
        if (this.winnerMark === "X") UI.countX.textContent = ++this.xScore;
        else UI.countO.textContent = ++this.oScore;
        return true;
      }
    }
    return false;
  }

  assignWinner(mark) {
    if (this.isMultiPlayer) {
      this.winner = mark === "X" ? (UI.xPlayer.textContent === "P1" ? "Player 1" : "Player 2") : (UI.oPlayer.textContent === "P1" ? "Player 1" : "Player 2");
    } else {
      this.winner = this.playerMark === mark ? "Player" : "Computer";
    }
  }

  displayTie() {
    UI.overlay.style.display = "flex";
    UI.banner.style.display = "flex";
    UI.tieScreen.style.display = "flex";
    UI.tieScreen.style.flexDirection = "column";
    UI.btnTieQuit.style.display = "flex";
    UI.btnTieNext.style.display = "flex";
  }

  checkTie() {
    if ([...UI.cells].every(cell => cell.classList.contains("active"))) {
      UI.countTie.textContent = ++this.ties;
      return true;
    }
    return false;
  }

  switchPlayer() {
    this.turnIcon = this.turnIcon === Icons.oTurn ? Icons.xTurn : Icons.oTurn;
    UI.turnContainer.innerHTML = this.turnIcon;
    if (this.isMultiPlayer) {
      this.playerMark = this.playerMark === "O" ? "X" : "O";
      this.updateIcons();
    }
  }

  mouseOver(cell) {
    if (!cell.classList.contains("active")) {
      cell.querySelector("img").src = this.currentOutline;
    }
  }

  mouseOut(cell) {
    if (!cell.classList.contains("active")) {
      cell.querySelector("img").src = "";
    }
  }

  selectCell(cell, index) {
    if (UI.cellsContainer.classList.contains("no-click")) return;
    if (!cell.classList.contains("active")) {
      cell.querySelector("img").src = this.currentMark;
      cell.classList.add("active", this.playerMark.toLowerCase());
      gameState[index] = this.playerMark;
      if (this.checkWinner()) return this.displayWinner();
      if (this.checkTie()) return this.displayTie();
      this.switchPlayer();
      if (!this.isMultiPlayer) this.computerMove();
    }
  }

  computerMove() {
    UI.cellsContainer.classList.add("no-click");
    setTimeout(() => {
      const empty = [...UI.cells].map((cell, i) => cell.classList.contains("active") ? null : { cell, index: i }).filter(Boolean);
      if (empty.length) {
        const { cell, index } = empty[Math.floor(Math.random() * empty.length)];
        cell.querySelector("img").src = this.computerMark;
        cell.classList.add("active", this.playerMark === "O" ? "x" : "o");
        gameState[index] = this.playerMark === "O" ? "X" : "O";
        if (this.checkWinner()) return this.displayWinner();
        if (this.checkTie()) return this.displayTie();
        this.switchPlayer();
        UI.cellsContainer.classList.remove("no-click");
      }
    }, 1000);
  }
}
