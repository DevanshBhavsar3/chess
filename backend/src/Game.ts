import { Chess } from "chess.js";
import { v4 } from "uuid";

export class Game {
  public gameId: string;
  public player1Id: string;
  public player2Id: string | null;
  public chess = new Chess();

  constructor(
    gameId: string | null,
    player1Id: string,
    player2Id: string | null
  ) {
    this.gameId = gameId || v4();
    this.player1Id = player1Id;
    this.player2Id = player2Id;
  }

  move(move: string) {
    if (!this.chess.isGameOver()) {
      try {
        this.chess.move(move);
      } catch (error) {
        console.error(error);
      }
    }
  }
}
