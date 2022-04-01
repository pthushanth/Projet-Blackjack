import Game from "./Game.js";
import { restart } from "./modules/restart.js";
import {
  buttonTake,
  buttonStand,
  buttonRestart,
  scoreDiv,
  networkStatusDiv,
} from "./modules/domElements.js";
import { hit } from "./modules/hit.js";
import { hold } from "./modules/hold.js";

const game = await Game.create();
buttonRestart.disabled = true;

if (game.player.score == 0) {
  const startScore = `Score : -- `;
  scoreDiv.innerHTML = startScore;
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

document.addEventListener("keypress", function (e) {
  if (e.key === "d") {
    console.log("test");
    if (game.isStart && !game.isEnd) {
      hit(game);
    }
  }
});

// documenthit().addEventListener("keypress", function (e) {
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

// const checkOnlineStatus = async () => {
//   try {
//     const online = await fetch("http://www.1x1px.me/");
//     return online.status >= 200 && online.status < 300; // either true or false
//   } catch (err) {
//     return false; // offline
//   }
// };
// setInterval(async () => {
//   const result = await checkOnlineStatus();
//   networkStatusDiv.innerHTML = result ? onlineText : offlineText;
// }, 3000);

// window.addEventListener("load", async (event) => {
//   statusDisplay.innerHTML = (await checkOnlineStatus())
//     ? onlineText
//     : offlineText;
// });
