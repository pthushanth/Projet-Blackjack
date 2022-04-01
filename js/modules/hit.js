import { displayRemainingCards, displayScore } from "./display.js";
import { buttonRestart, buttonTake, loader } from "./domElements.js";
import { gameEnd } from "./gameEnd.js";
import { displayHoldCardImage } from "./display.js";
import { setVibration } from "./vibrate.js";

export const hit = async (game) => {
  loader.classList.add("display");
  //to not take a card while waiting for a card
  buttonTake.disabled = true;
  setVibration(200);
  if (buttonRestart.disabled) buttonRestart.disabled = false;
  await game.player.hitMe();
  const cardImg = game.player.cards[game.player.cards.length - 1].images["png"];

  var img = document.getElementById("img").getElementsByTagName("img");
  console.log(img[0]);

  displayHoldCardImage(cardImg);
  loader.classList.remove("display");
  displayScore(game.player.score);
  displayRemainingCards(game.deck.remainingCard);
  buttonTake.disabled = false;
  if (game.isEnd) {
    // buttonTake.disabled = true;

    gameEnd(game);
  }
};
