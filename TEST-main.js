// app state
// let deckID = "";
// let playerCards = [];
// let score = 0;
// let remainingCard ;
// const buttonTake = document.getElementById('takeCard');
// const buttonStand = document.getElementById('stand');

// function CheckError(response) {
//     if (response.status >= 200 && response.status <= 299) {
//       return response.json();
//     } else {
//       throw Error(response.statusText);
//     }
//   }

// function getNewDeck(){
//      fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
//     .then(CheckError)
//     .then(data => {
//         deckID = data.deck_id;
//     remainingCard=data.remaining;
//         console.log(data)
//     })
//     .catch(error => console.error("Erreur : " + error));
// }

// async function takeCard() {
// const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
// if (response.status >= 200 && response.status <= 299) {
//     const data = await response.json();
//     playerCards.push(data.cards[0])
//     remainingCard=data.remaining;
//     console.log(remainingCard)
//     addScore(data.cards[0]);
//           if (score > 21) {
//         alert("you lost")
//         startNewGame()
//         }
//         if (score == 21) {
//           alert("you won");
//           startNewGame()
//           }
//   } else {
//     // Handle errors
//     console.log(response.status, response.statusText);
//   }
// }

// const stand = () => {

// }

// const getCardIntValue =(cardValue) =>{
//     if(isNaN(cardValue)){
//         if(cardValue ==="ACE") cardValue = 0;
//         else if(cardValue ==="QUEEN" || cardValue ==="JACK" || cardValue ==="KING") cardValue = "10";
//     }
//     // console.log(typeof(cardValue)+" --- "+cardValue)

//     return Number(cardValue);
// }

// const addScore = (card) =>{
//   let val= getCardIntValue(card.value)
//     score+=val ;
//       console.log("card value :" +card.value)
//       console.log("card point :" +val)
//       console.log("score : "+score)
// }

// // const initializeGame()
// const startNewGame =() =>{
//   score=0;
//   playerCards=[]
//   deckID = "";
//   getNewDeck();

// }
// startNewGame();
// buttonTake.addEventListener("click", takeCard)
// buttonStand.addEventListener("click", takeCard)
