import Game from "./Game.js";

const buttonTake = document.getElementById("takeCard");
const buttonStand = document.getElementById("stand");
const buttonRestart = document.getElementById("restart");
const imgDiv = document.getElementById("img");
const loader = document.getElementById("loader");
const scoreDiv = document.getElementById("score");
const scoreAfterDiv = document.getElementById("scoreAfter");
const resultDiv = document.getElementById("result");
const RemainingCardsDiv = document.getElementById("remainingCards");
const networkStatusDiv = document.getElementById("networkStatus");
let newImg;
let vibrateDuration;
const game = await Game.create();
buttonRestart.disabled = true;
// let hold = false;

const hit = async () => {
  loader.classList.add("display");
  //to not take a card while waiting for a card
  buttonTake.disabled = true;
  vibrateDuration = 200;
  if (buttonRestart.disabled) buttonRestart.disabled = false;
  await game.player.hitMe();
  const cardImg = game.player.cards[game.player.cards.length - 1].images["png"];

  var img = document.getElementById("img").getElementsByTagName("img");
  console.log(img[0]);

  displayCardImage(cardImg);
  loader.classList.remove("display");
  displayScore();
  displayRemainingCards();
  buttonTake.disabled = false;
  if (game.isEnd) {
    // buttonTake.disabled = true;

    gameEnd();
  }
  //avoid vibrate error on mac
  const canVibrate = window.navigator.vibrate;
  if (canVibrate) window.navigator.vibrate(vibrateDuration);
};

const gameEnd = () => {
  buttonTake.disabled = true;
  buttonStand.disabled = true;
  if (game.player.isWin) {
    vibrateDuration = [300, 100, 300, 100, 300];
    resultDiv.innerHTML = "<h1 style='color:green'>You Won</h1>";
  } else {
    vibrateDuration = [
      100, 50, 100, 50, 100, 50, 100, 50, 100, 50, 100, 50, 100, 50, 100,
    ];
    resultDiv.innerHTML = "<h1 style='color:red'>You Lost</h1>";
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

document.addEventListener("keypress", function (e) {
  if (e.key === "d") {
    console.log("test");
    if (game.isStart && !game.isEnd) {
      hit();
    }
  }
});

const onlineText =
  '<p>network status : <span style="color:green">Online</span> </p>';
const offlineText =
  '<p>network status : <span style="color:red">Offline</span></p>';

if (navigator.onLine) {
  networkStatusDiv.innerHTML = onlineText;
} else {
  networkStatusDiv.innerHTML = offlineText;
}

window.addEventListener("online", function (e) {
  networkStatusDiv.innerHTML = onlineText;
});

window.addEventListener("offline", function (e) {
  networkStatusDiv.innerHTML = offlineText;
});

window.addEventListener("userproximity", function (event) {
  if (event.near) {
    if (game.isStart && !game.isEnd) {
      hit();
    }
  }
});
// const checkOnlineStatus = async () => {
//   try {
//     const online = await fetch("http://www.1x1px.me/");
//     return online.status >= 200 && online.status < 300; // either true or false
//   } catch (err) {
//     return false; // offline
//   }
// };
// setInterval(async () => {
//   const result = await checkOnlineStatus();
//   networkStatusDiv.innerHTML = result ? onlineText : offlineText;
// }, 3000);

// window.addEventListener("load", async (event) => {
//   statusDisplay.innerHTML = (await checkOnlineStatus())
//     ? onlineText
//     : offlineText;
// });
