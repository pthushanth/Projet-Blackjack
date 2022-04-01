import { imgDiv, remainingCardsDiv, scoreDiv } from "./domElements.js";

let newImg;
export const displayCardImage = (img) => {
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

export const displayHoldCardImage = (img) => {
  newImg = document.createElement("img");
  newImg.style.marginTop = "-100px";
  newImg.onload = () => {
    imgDiv.append(newImg);
  };
  newImg.src = img;
};

export const displayScore = (score) => {
  const text = `Score : ${score}`;
  scoreDiv.innerHTML = text;
};

export const displayRemainingCards = (remainingCard) => {
  remainingCardsDiv.innerHTML = "Remaining : " + remainingCard + " cards";
};
