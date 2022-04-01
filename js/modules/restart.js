import {
  buttonStand,
  buttonTake,
  imgDiv,
  remainingCardsDiv,
  resultDiv,
  scoreAfterDiv,
  scoreDiv,
} from "./domElements.js";
import { hit } from "./hit.js";

export const restart = async (game) => {
  imgDiv.innerHTML = "";
  scoreDiv.innerHTML = "";
  scoreAfterDiv.innerHTML = "";
  resultDiv.innerHTML = "";
  remainingCardsDiv.innerHTML = "";
  buttonTake.disabled = false;
  buttonStand.disabled = false;
  await game.restart(game);
  hit(game);
};
