// Punto de entrada principal
import { UI } from "./ui.js";
import { initEvents } from "./events.js";

document.addEventListener("DOMContentLoaded", () => {
  UI.startScreen.classList.add("start-visible");
  initEvents();
});
