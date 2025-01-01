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

  setPlayer2Id(id: string) {
    this.player2Id = id;
  }

  move(move: string) {
    if (!this.chess.isGameOver()) {
      try {
        this.chess.move(move);
      } catch (error) {
        console.error("Invalid Move");
      }
    } else {
      return this.gameover();
    }
  }

  gameover() {
    if (this.chess.isCheckmate()) {
      if (this.chess.turn() === "w") {
        return "b";
      } else {
        return "w";
      }
    } else if (
      this.chess.isStalemate() ||
      this.chess.isThreefoldRepetition() ||
      this.chess.isInsufficientMaterial()
    ) {
      return "draw";
    } else {
      //TODO: Add an aborted game logic
      return "aborted";
    }
  }
}
