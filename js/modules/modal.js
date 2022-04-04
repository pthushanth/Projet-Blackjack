import { divModalResult } from "./domElements.js";
import { restart } from "./restart.js";

const divOverlay = document.getElementById("overlay");
export function showModalResult(game, result, message = null) {
  console.log("testtttttttt");
  let score = game.player.score;
  let title;
  let content;
  if (result === "won") {
    title = "You Won 👏!";
    if (game.player.isHold) {
      content = `Well done ! You won because your score futur would be ${game.player.scoreAfterHold} and it\'s over than 21 !! 😏🤙`;
    } else {
      content = `Good Job ! You won because your score is ${score} &#128513; 😎🙌`;
    }
  } else if (result === "lost") {
    title = "You Lost 👎!";
    if (game.player.isHold) {
      content = `You lost because your score futur would be ${game.player.scoreAfterHold} and it\'s under than 21... 😒😒😒`;
    } else {
      content = `So bad ! You lost because your score is ${score} 😭😭😭 `;
    }
  } else if (result === "blackjack") {
    content = `Congrats ! You won because your score is ${score} and it\s BLACKJACK !!!! 🤩🤩🤩`;
    title = "BLACKJACK 🎉🎊 !!!";
  }
  if (message !== null) content = message;

  divModalResult.classList.add(result, "show");
  const h1 = document.createElement("h1");
  h1.classList.add("title");
  h1.append(document.createTextNode(title));

  const header = document.createElement("div");
  header.classList.add("modal-header", result);

  const p = document.createElement("p");
  p.classList.add("modal-content", result);
  p.append(document.createTextNode(content));
  header.appendChild(p);
  divOverlay.style.visibility = "visible";

  const button = document.createElement("button");
  button.classList.add("btn-restart");
  button.append(document.createTextNode("Restart"));
  button.addEventListener("click", () => {
    restart(game);
    RemoveModalResult();
  });

  header.appendChild(button);

  divModalResult.appendChild(h1);
  divModalResult.appendChild(header);
}

export function RemoveModalResult() {
  divModalResult.innerHTML = "";
  divModalResult.classList.remove(result, "show");
  divOverlay.style.visibility = "hidden";
}
