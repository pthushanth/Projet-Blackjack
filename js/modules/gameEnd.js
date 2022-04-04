import { buttonStand, buttonTake, buttonUndo, imgDiv } from "./domElements.js";
import vibrate, { setVibration } from "./vibrate.js";
import { showModalResult } from "./modal.js";

export const gameEnd = (game) => {
  buttonTake.disabled = true;
  buttonStand.disabled = true;
  buttonUndo.disabled = true;

  if (game.player.isWin) {
    setTimeout(animWin, 1500);
    setVibration([300, 100, 300, 100, 300]);

    if (game.player.score == "21" && !game.player.isHold) {
      setTimeout(animBJ, 1500);
      showModalResult(game, "blackjack");
    }
    showModalResult(game, "won");
  } else {
    setTimeout(animLose, 1000);
    setVibration([
      100, 50, 100, 50, 100, 50, 100, 50, 100, 50, 100, 50, 100, 50, 100,
    ]);

    showModalResult(game, "lost");
  }
  vibrate();
};

function animLose() {
  let allImages = document.querySelectorAll("#img img");
  console.log(allImages);
  allImages.forEach((img) => {
    img.animate(
      [{ transform: "rotate(-360deg)" }, { transform: "rotate(360deg)" }],
      { duration: 1000 }
    );
  });
}

function animBJ() {
  let allImages = document.querySelectorAll("#img img");
  let i = 0;
  allImages.forEach((img) => {
    i++;
    if (i % 2) {
      console.log("test");
      img.animate(
        [
          { transform: "translate(0px,0px)" },
          { transform: "translate(-250px,250px)" },
        ],
        { duration: 1500 }
      );
    } else {
      img.animate(
        [
          { transform: "translate(0px,0px)" },
          { transform: "translate(250px,-250px)" },
        ],
        { duration: 1500 }
      );
    }
  });
}

function animWin() {
  let allImages = document.querySelectorAll("#img img");
  let i = 0;
  allImages.forEach((img) => {
    i++;
    if (i % 2) {
      console.log("test");
      img.animate(
        [
          { transform: "translate(0px,0px)" },
          { transform: "translate(-250px,250px)" },
        ],
        { duration: 1500 }
      );
    } else {
      img.animate(
        [
          { transform: "translate(0px,0px)" },
          { transform: "translate(250px,-250px)" },
        ],
        { duration: 1500 }
      );
    }
  });
}
