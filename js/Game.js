import Deck from "./Deck.js";
import Player from "./Player.js";
import Print from "./Print.js";

class Game {
  constructor() {
    this.player;
    this.deck;
    this.isStart = true;
    this.isEnd = false;
    this.print;
    this.init();
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
    const print= new Print();
    print.DrawImage();
    return game;
  }

  async restart() {
    await this.init();
    this.isStart = true;
    this.isEnd = false;
  }
}

export default Game;
