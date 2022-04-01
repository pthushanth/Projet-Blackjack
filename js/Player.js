class Player {
  constructor(game, deck) {
    this.name = "player 1";
    this.cards = [];
    this.score = 0;
    this.deck = deck;
    this.game = game;
    this.isWin = false;
    this.scoreAfterHold = 0;
  }

  async hitMe() {
    let card = await this.deck.drawCard();
    console.log(card.value);

    this.cards.push(card);
    this.addScore(card.value);
  }

  async hold() {
    let card = await this.deck.drawCard();
    this.cards.push(card);
    let points = this.getCardIntValue(card.value);
    console.log(card.value);
    console.log(points);
    this.scoreAfterHold = this.score + points;
    if (this.scoreAfterHold >= 21) {
      this.isWin = true;
    } else {
      this.win = false;
    }
    this.game.isEnd = true;
  }

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
    return Number(cardValue);
  };

  undoHit = () => {
    let lastCard = this.cards.pop();
    console.log({ lastCard });
    let lastCardValue = this.getCardIntValue(lastCard.value);
    console.log(-lastCardValue);
    this.addScore(-lastCardValue);
  };
}

export default Player;
