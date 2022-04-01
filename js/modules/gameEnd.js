import { buttonStand, buttonTake } from "./domElements.js";
import { setVibration } from "./vibrate.js";
import showModalResult from "./modal.js";

export const gameEnd = (game) => {
  buttonTake.disabled = true;
  buttonStand.disabled = true;
  if (game.player.isWin) {
    setVibration([300, 100, 300, 100, 300]);

    if (game.player.score == "21") {
      showModalResult(game, "blackjack");
    }
  } else {
    setVibration([
      100, 50, 100, 50, 100, 50, 100, 50, 100, 50, 100, 50, 100, 50, 100,
    ]);
    showModalResult(game, "lost");
  }
};
