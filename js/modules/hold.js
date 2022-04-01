import { displayHoldCardImage } from "./display.js";
import { buttonStand, buttonTake } from "./domElements.js";
import showModalResult from "./modal.js";

export const hold = async (game) => {
  await game.player.hold(game);
  const cardImg = game.player.cards[game.player.cards.length - 1].images["png"];
  displayHoldCardImage(cardImg);
  if (game.isEnd) {
    buttonTake.disabled = true;
    buttonStand.disabled = true;
    if (game.player.isWin) {
      const text = `You won because your score futur would be ${game.player.scoreAfterHold} and it\'s over than 21`;
      console.log(text);
      showModalResult(game, "won", text);
    } else {
      const text = `You lost because your score futur would be ${game.player.scoreAfterHold} and it\'s under than 21`;
      console.log(text);
      showModalResult(game, "lost", text);
    }
  }
};
