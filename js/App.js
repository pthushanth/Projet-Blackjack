import Game from "./Game.js";
import { restart } from "./modules/restart.js";
import {
  buttonTake,
  buttonStand,
  buttonRestart,
  buttonUndo,
  loader,
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
  if (game.player.cards.length >= 2 && !game.isEnd) undo(game);
});

document.addEventListener("keypress", function (e) {
  if (e.key === "d") {
    console.log("kep*y 'd'");
    if (game.isStart && !game.isEnd && !game.deck.isPendingFetch) {
      hit(game);
    }
  }
});
document.addEventListener("keypress", function (e) {
  if (e.key === "c" || e.key === "C") {
    if (game.deck.isPendingFetch) {
      game.player.cancelHit();
      if (loader.classList.contains("display")) {
        loader.classList.remove("display");
      }
      // alert("Take card Canceled");
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
