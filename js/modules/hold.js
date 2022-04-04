import { displayHoldCardImage } from "./display.js";
import { buttonStand, buttonTake } from "./domElements.js";
import { gameEnd } from "./gameEnd.js";

export const hold = async (game) => {
  buttonStand.disabled = true;
  await game.player.hold(game);
  const cardImg = game.player.cards[game.player.cards.length - 1].images["png"];
  displayHoldCardImage(cardImg);
  if (game.isEnd) {
    gameEnd(game);
  }
};
