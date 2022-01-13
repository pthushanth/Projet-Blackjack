import Game from "./Game.js";

const buttonTake = document.getElementById("takeCard");
const buttonStand = document.getElementById("stand");
const imgDiv = document.getElementById("img");
const scoreDiv = document.getElementById("score");
const resultDiv = document.getElementById("result");
let newImg;
const game = await Game.create();

const hit = async () => {
  await game.player.hitMe();
  const cardImg = game.player.cards[game.player.cards.length - 1].image;
  displayCardImage(cardImg);
  displayScore();
  if (game.isEnd) {
    buttonTake.disabled = true;
    buttonStand.disabled = true;
    if (game.player.isWin) {
      resultDiv.innerHTML = "<h1 style='color:green'>You Won</h1>";
      // console.log("you Won");
    } else {
      resultDiv.innerHTML = "<h1 style='color:red'>You Lost</h1>";
      console.log("you Lost");
    }
    // restart();
  }
};
const hold = () => {
  game.player.hold();
};
const displayCardImage = (img) => {
  newImg = document.createElement("img");
  newImg.onload = () => {
    imgDiv.append(newImg);
  };
  newImg.src = img;
  // return new Promise((resolve, reject) => {
  //   const newImg = document.createElement("img");
  //   newImg.onload = () => resolve();
  //   newImg.onerror = reject;
  //   newImg.src = img;
  // });
};
const displayScore = () => {
  const text = `<h2 style="color:blue">Score : ${game.player.score}</h2>`;
  scoreDiv.innerHTML = text;
};
const restart = () => {
  imgDiv.innerHTML = "";
  scoreDiv.innerHTML = "";
  game.restart();
};
buttonTake.addEventListener("click", hit);
buttonStand.addEventListener("click", hold);
