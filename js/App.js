import Game from "./Game.js";
import { restart } from "./modules/restart.js";
import {
  buttonTake,
  buttonStand,
  buttonRestart,
  buttonUndo,
} from "./modules/domElements.js";
import { hit } from "./modules/hit.js";
import { hold } from "./modules/hold.js";

import { undo } from "./modules/undo.js";
import { displayScore, showNetworkStatus } from "./modules/display.js";

const game = await Game.create();
buttonRestart.disabled = true;
buttonUndo.disabled = true;
buttonStand.disabled = true;

if (game.player.score == 0) {
  displayScore("--");
}

buttonTake.addEventListener("click", () => {
  hit(game);
});
buttonStand.addEventListener("click", () => {
  hold(game);
});
buttonRestart.addEventListener("click", () => {
  restart(game);
});
buttonUndo.addEventListener("click", () => {
  if (game.player.cards.length >= 1 && !game.isEnd) undo(game);
});

document.addEventListener("keypress", function (e) {
  if (e.key === "d") {
    console.log("test");
    if (game.isStart && !game.isEnd) {
      hit(game);
    }
  }
});

showNetworkStatus();
window.addEventListener("online", function (e) {
  showNetworkStatus("online");
});

window.addEventListener("offline", function (e) {
  showNetworkStatus("offline");
});

window.addEventListener("userproximity", function (event) {
  if (event.near) {
    if (game.isStart && !game.isEnd) {
      hit(game);
    }
  }
});
