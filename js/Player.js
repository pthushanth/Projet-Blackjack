class Player {
  constructor(game, deck) {
    this.name = "player 1";
    this.cards = [];
    this.score = 0;
    this.deck = deck;
    this.game = game;
    this.isWin = false;
  }

  async hitMe() {
    let card = await this.deck.drawCard();
    this.cards.push(card);
    console.log(card);
    this.addScore(card.value);
  }

  hold() {}

  addScore(cardValue) {
    let points = this.getCardIntValue(cardValue);
    this.score += points;
    if (this.score == 21) {
      this.isWin = true;
      this.game.isEnd = true;
    }
    if (this.score > 21) {
      this.win = false;
      this.game.isEnd = true;
    }
    // console.log("card value :" + cardValue);
    // console.log("card point :" + points);
    console.log("score : " + this.score);
  }

  getCardIntValue = (cardValue) => {
    if (isNaN(cardValue)) {
      if (cardValue === "ACE") cardValue = 0;
      else if (
        cardValue === "QUEEN" ||
        cardValue === "JACK" ||
        cardValue === "KING"
      )
        cardValue = "10";
    }
    // console.log(typeof(cardValue)+" --- "+cardValue)

    return Number(cardValue);
  };
}

export default Player;
