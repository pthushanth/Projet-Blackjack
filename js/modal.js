export default function (result, score, restart, title = null) {
  const divModalResult = document.getElementById("modalResult");
  let content;
  if (result === "won") {
    content = `You won because your score is ${score} &#128513;`;
    title = "You Won !";
  } else if (result === "lost") {
    content = `You lost because your score is ${score} &#128557;&#128557;&#128557;`;
    title = "You Lost !";
  }

  divModalResult.classList.add(result);
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
    divModalResult.classList.remove(result);
    restart();
  });

  header.appendChild(button);

  divModalResult.appendChild(h1);
  divModalResult.appendChild(header);
}
