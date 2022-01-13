import Game from "./Game.js";

const buttonTake = document.getElementById("takeCard");
const buttonStand = document.getElementById("stand");
const buttonRestart = document.getElementById("restart");
const imgDiv = document.getElementById("img");
const scoreDiv = document.getElementById("score");
const scoreAfterDiv = document.getElementById("scoreAfter");
const resultDiv = document.getElementById("result");
const RemainingCardsDiv = document.getElementById("remainingCards");
let newImg;
const game = await Game.create();
buttonRestart.disabled = true;
// let hold = false;
const hit = async () => {
  if (buttonRestart.disabled) buttonRestart.disabled = false;
  await game.player.hitMe();
  const cardImg = game.player.cards[game.player.cards.length - 1].images["png"];
  displayCardImage(cardImg);
  displayScore();
  displayRemainingCards();
  if (game.isEnd) {
    buttonTake.disabled = true;
    buttonStand.disabled = true;
    if (game.player.isWin) {
      resultDiv.innerHTML = "<h1 style='color:green'>You Won</h1>";
    } else {
      resultDiv.innerHTML = "<h1 style='color:red'>You Lost</h1>";
    }
  }
};

const hold = async () => {
  await game.player.hold();
  const cardImg = game.player.cards[game.player.cards.length - 1].images["png"];
  displayHoldCardImage(cardImg);
  // displayScore();
  // displayRemainingCards();
  if (game.isEnd) {
    buttonTake.disabled = true;
    buttonStand.disabled = true;
    if (game.player.isWin) {
      resultDiv.innerHTML = "<h1 style='color:green'>You Won</h1>";
      scoreAfterDiv.innerHTML =
        "You won because your score futur " +
        game.player.scoreAfterHold +
        " is over 21";
    } else {
      resultDiv.innerHTML = "<h1 style='color:red'>You Lost</h1>";
      scoreAfterDiv.innerHTML =
        "You lost because your futur " +
        game.player.scoreAfterHold +
        " is under 21";
    }
  }
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
const displayHoldCardImage = (img) => {
  newImg = document.createElement("img");
  newImg.style.marginTop = "-100px";
  newImg.onload = () => {
    imgDiv.append(newImg);
  };
  newImg.src = img;
};
const displayScore = () => {
  const text = `<h2 style="color:blue">Score : ${game.player.score}</h2>`;
  scoreDiv.innerHTML = text;
};

const displayRemainingCards = () => {
  RemainingCardsDiv.innerHTML = "Remaining cards : " + game.deck.remainingCard;
};

const restart = async () => {
  imgDiv.innerHTML = "";
  scoreDiv.innerHTML = "";
  scoreAfterDiv.innerHTML = "";
  resultDiv.innerHTML = "";
  RemainingCardsDiv.innerHTML = "";
  buttonTake.disabled = false;
  buttonStand.disabled = false;
  await game.restart();
  hit();
};

buttonTake.addEventListener("click", hit);
buttonStand.addEventListener("click", hold);
buttonRestart.addEventListener("click", restart);
