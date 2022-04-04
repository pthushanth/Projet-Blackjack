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
  setTimeout(anim,10);
  function anim(){
    let imgfirst = imgDiv.lastElementChild;
  let imglast = imgDiv.lastElementChild;
   console.log(imglast);
    if (imglast == null){
      imgfirst.animate(
      [   
       {transform: 'translate(-100px,-100px)'},
       {transform: 'translate(0px,-75px)'},
       {transform: 'translate(0px,0px)'}
      ],
      {duration: 400}
      );}else{
        imglast.animate(
          [   
           {transform: 'translate(-100px,-100px)'},
           {transform: 'translate(0px,-75px)'},
           {transform: 'translate(0px,0px)'}
          ],
          {duration: 400}
          );
      }}

};


export const displayScore = (score) => {
  const text = `Score : ${score}`;
  scoreDiv.innerHTML = text;
};

export const displayRemainingCards = (remainingCard) => {
  remainingCardsDiv.innerHTML = "Remaining : " + remainingCard + "<img src='/assets/img/deck.png'>";
};

export const showNetworkStatus = (status) => {
  let text;
  if (navigator.onLine || status === "online") {
    text = '<p>Network status : <span>🟢</span> </p>';
  } else {
    text = '<p>Network status : <span>🔴</span></p>';
  }
  networkStatusDiv.innerHTML = text;
};
