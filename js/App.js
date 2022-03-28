import Game from "./Game.js";
import { restart } from "./modules/restart.js";
import {
  buttonTake,
  buttonStand,
  buttonRestart,
  scoreDiv,
  networkStatusDiv,
  imgDiv,
  buttonUndo,
} from "./modules/domElements.js";
import { hit } from "./modules/hit.js";
import { hold } from "./modules/hold.js";
import {
  displayCardImage,
  displayRemainingCards,
  displayScore,
} from "./modules/display.js";
import { undo } from "./modules/undo.js";

const game = await Game.create();
buttonRestart.disabled = true;
if (game.player.score == 0) {
  const startScore = `Score : -- `;
  scoreDiv.innerHTML = startScore;
}

buttonTake.addEventListener("click", () => {
  buttonUndo.disabled = false;
  hit(game);
});
buttonStand.addEventListener("click", () => {
  hold(game);
});
buttonRestart.addEventListener("click", () => {
  restart(game);
});

buttonUndo.addEventListener("click", () => {
  if (game.player.cards.length > 1) undo(game);
});

document.addEventListener("keypress", function (e) {
  if (e.key === "d") {
    console.log("test");
    if (game.isStart && !game.isEnd) {
      hit(game);
    }
  }
});

// document.addEventListener("keypress", function (e) {
//   if (e.key === "r") {
//     console.log("restart");
//     if (game.isEnd) {
//       console.log("finished");
//       restart();
//     }
//   }
// });

const onlineText =
  '<p>Network status : <span style="color:green">Online</span> </p>';
const offlineText =
  '<p>Network status : <span style="color:red">Offline</span></p>';

if (navigator.onLine) {
  networkStatusDiv.innerHTML = onlineText;
} else {
  networkStatusDiv.innerHTML = offlineText;
}

window.addEventListener("online", function (e) {
  networkStatusDiv.innerHTML = onlineText;
});

window.addEventListener("offline", function (e) {
  networkStatusDiv.innerHTML = offlineText;
});

window.addEventListener("userproximity", function (event) {
  if (event.near) {
    if (game.isStart && !game.isEnd) {
      hit(game);
    }
  }
});
