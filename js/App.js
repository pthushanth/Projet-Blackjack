import Game from "./Game.js";
import showModalResult from "./modal.js";

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

/*********************** */

/********************** */

const gameEnd = () => {
  buttonTake.disabled = true;
  buttonStand.disabled = true;
  if (game.player.isWin) {
    vibrateDuration = [300, 100, 300, 100, 300];
    //resultDiv.innerHTML = "<div class='modal-win'><h1 class='title'>You Won !</h1><div class='text-modal'><p>'You won because your score futur would be'" + game.player.scoreAfterHold + "' and it's over than 21'</p></div></div>"

    if (game.player.score == "21") {
      //console.log("blackjack");
      modalBj.style.display = "block";
      const text = `Congrats ! You won because your score is ${game.player.score} and it\s BLACKJACK !!!!!!!! &#129321;&#129321;&#129321;`;
      contentBj.innerHTML = text;
      buttonRestart.onclick = function () {
        modalBj.style.display = "none";
      };
    }
  } else {
    vibrateDuration = [
      100, 50, 100, 50, 100, 50, 100, 50, 100, 50, 100, 50, 100, 50, 100,
    ];
    showModalResult("lost", game.player.score, restart);
  }
};

const hold = async () => {
  await game.player.hold();
  const cardImg = game.player.cards[game.player.cards.length - 1].images["png"];
  displayHoldCardImage(cardImg);
  if (game.isEnd) {
    buttonTake.disabled = true;
    buttonStand.disabled = true;
    if (game.player.isWin) {
      const text = `You won because your score futur would be ${game.player.scoreAfterHold} and it\'s over than 21`;
      console.log(text);
      showModalResult("won", game.player.score, restart, text);
    } else {
      const text = `You lost because your score futur would be ${game.player.scoreAfterHold} and it\'s under than 21`;
      console.log(text);
      showModalResult("lost", game.player.score, restart, text);
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

if (game.player.score == 0) {
  const startScore = `Score : -- `;
  scoreDiv.innerHTML = startScore;
}

const displayScore = () => {
  const text = `Score : ${game.player.score}`;
  scoreDiv.innerHTML = text;
};

const displayRemainingCards = () => {
  RemainingCardsDiv.innerHTML =
    "Remaining : " + game.deck.remainingCard + " cards";
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

// document.addEventListener("keypress", function (e) {
//   if (e.key === "r") {
//     console.log("restart");
//     if (game.isEnd) {
//       console.log("finished");
//       restart();
//     }
//   }
// });

const onlineText =
  '<p>Network status : <span style="color:green">Online</span> </p>';
const offlineText =
  '<p>Network status : <span style="color:red">Offline</span></p>';

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

// function close() {
//   var x = document.getElementById("close");
//   if (x.style.display === "none") {
//     x.style.display = "block";
//   } else {
//     x.style.display = "none";
//   }
// }

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
