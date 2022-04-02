class Deck {
  constructor() {
    this.url = "https://deckofcardsapi.com/api/deck";
    this.id;
    this.remainingCard;
    this.controller = new AbortController();
    this.isPendingFetch = false;
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
    }
    if (err.name == "AbortError") {
      // handle abort()
      console.log("Aborted!");
    } else {
      throw Error(response.statusText);
    }
  }

  async drawCard() {
    this.isPendingFetch = true;
    console.log(this.isPendingFetch);
    let cards;
    let signal = this.controller.signal;
    await fetch(`${this.url}/${this.id}/draw/?count=1`, { signal })
      .then(this.checkError)
      .then((data) => {
        this.remainingCard = data.remaining;
        console.log(data);
        cards = data.cards[0];
        this.isPendingFetch = false;
      });
    return cards;
  }
}

export default Deck;
