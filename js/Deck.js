class Deck {
  constructor() {
    this.url = "https://deckofcardsapi.com/api/deck";
    this.id;
    this.remainingCard;
    // this.init();
  }

  async init() {
    await fetch(`${this.url}/new/shuffle/?deck_count=1`)
      .then(this.checkError)
      .then((data) => {
        this.id = data.deck_id;
        this.remainingCard = data.remaining;
        // console.log(this.id)
      })
      .catch((error) => console.error("Erreur : " + error));
  }

  static async create() {
    const deck = new Deck();
    await deck.init();
    return deck;
  }

  checkError(response) {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  }

  async drawCard() {
    let cards;
    await fetch(`${this.url}/${this.id}/draw/?count=1`)
      .then(this.checkError)
      .then((data) => {
        this.remainingCard = data.remaining;
        console.log(data);
        cards = data.cards[0];
      });

    return cards;

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
  }
}

export default Deck;
