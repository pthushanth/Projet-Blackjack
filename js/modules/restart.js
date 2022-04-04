import {
  buttonRestart,
  buttonStand,
  buttonTake,
  buttonUndo,
  divModalResult,
  imgDiv,
  remainingCardsDiv,
  resultDiv,
  scoreAfterDiv,
  scoreDiv,
} from "./domElements.js";
import { hit } from "./hit.js";

export const restart = async (game) => {
  divModalResult.innerHTML = "";
  divModalResult.className = "";
  imgDiv.innerHTML = "";
  scoreDiv.innerHTML = "";
  scoreAfterDiv.innerHTML = "";
  resultDiv.innerHTML = "";
  remainingCardsDiv.innerHTML = "";
  buttonRestart.disabled = true;
  buttonUndo.disabled = true;
  buttonStand.disabled = true;
  buttonTake.disabled = false;
  await game.restart(game);
  hit(game);
};
