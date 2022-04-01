import {
  imgDiv,
  networkStatusDiv,
  remainingCardsDiv,
  scoreDiv,
} from "./domElements.js";

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

export const showNetworkStatus = (status) => {
  let text;
  if (navigator.onLine || status === "online") {
    text = '<p>Network status : <span style="color:green">Online</span> </p>';
  } else {
    text = '<p>Network status : <span style="color:red">Offline</span></p>';
  }
  networkStatusDiv.innerHTML = text;
};
