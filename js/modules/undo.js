import { displayRemainingCards, displayScore } from "./display.js";
import { buttonUndo, imgDiv, loader } from "./domElements.js";

export const undo = (game) => {
  buttonUndo.disable = false;
  
  game.player.undoHit();
  console.log(game.player.score);
  imgDiv.removeChild(imgDiv.lastElementChild);
  loader.classList.remove("display");
  displayScore(game.player.score);
  displayRemainingCards(game.deck.remainingCard);
};
