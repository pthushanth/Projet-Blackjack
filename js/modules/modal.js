import { divModalResult } from "./domElements.js";
import { restart } from "./restart.js";

export default function (game, result, message = null) {
  let score = game.player.score;
  let title;
  let content;
  if (result === "won") {
    content = `Good Job ! You won because your score is ${score} &#128513; 😎🙌`;
    title = "You Won 👏!";
  } else if (result === "lost") {
    content = `So bad ! You lost because your score is ${score} 😭😭😭 `;
    title = "You Lost 👎!";
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

  const button = document.createElement("button");
  button.classList.add("btn-restart");
  button.append(document.createTextNode("restart"));
  button.addEventListener("click", () => {
    divModalResult.innerHTML = "";
    divModalResult.classList.remove(result, "show");
    restart(game);
  });

  header.appendChild(button);

  divModalResult.appendChild(h1);
  divModalResult.appendChild(header);
}
