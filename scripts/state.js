// Estado global del juego

export let playerMark = "O";
export let gameState = Array(9).fill("");

export function setPlayerMark(mark) {
  playerMark = mark;
}

export function resetGameState() {
  gameState = Array(9).fill("");
}
