import { buttonStand, buttonTake } from "./domElements.js";
import { setVibration } from "./vibrate.js";
import showModalResult from "./modal.js";

export const gameEnd = (game) => {
  buttonTake.disabled = true;
  buttonStand.disabled = true;
  if (game.player.isWin) {
    setVibration([300, 100, 300, 100, 300]);

    if (game.player.score == "21") {
      //console.log("blackjack");
      modalBj.style.display = "block";
      const text = `Congrats ! You won because your score is ${game.player.score} and it\s BLACKJACK !!!!!!!! &#129321;&#129321;&#129321;`;
      contentBj.innerHTML = text;
      buttonRestart.onclick = function () {
        modalBj.style.display = "none";
      };
    }
  } else {
    setVibration([
      100, 50, 100, 50, 100, 50, 100, 50, 100, 50, 100, 50, 100, 50, 100,
    ]);
    showModalResult(game, "lost");
  }
};
