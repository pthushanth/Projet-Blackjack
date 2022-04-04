import { displayRemainingCards, displayScore } from "./display.js";
import { buttonUndo, imgDiv, loader } from "./domElements.js";

export const undo = (game) => {
  buttonUndo.disabled = true;
  game.player.undoHit();
  console.log(game.player.score);
  imgDiv.removeChild(imgDiv.lastElementChild);
  loader.classList.remove("display");
  displayScore(game.player.score);
  displayRemainingCards(game.deck.remainingCard);
  if (game.player.cards.length >= 2) {
    buttonUndo.disabled = false;
  }
};
