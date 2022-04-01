import Deck from "./Deck.js";
import Player from "./Player.js";

class Game {
  constructor() {
    this.player;
    this.deck;
    this.isStart = true;
    this.isEnd = false;
    // this.init();
  }

  // async init(){
  //     this.deck = await Deck.create();
  //     this.player = new Player(this.deck);

  // }
  async init() {
    this.deck = await Deck.create();
    this.player = new Player(this, this.deck);
  }

  static async create() {
    const game = new Game();
    await game.init();
    return game;
  }

  async restart() {
    await this.init();
    this.isStart = true;
    this.isEnd = false;
  }
}

export default Game;
