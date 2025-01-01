import { Chess } from "chess.js";
import { v4 } from "uuid";

interface Player {
  id: string;
  color: "w" | "b";
}

export class Game {
  public gameId: string;
  public player1: Player;
  public player2: Player | null = null;
  public chess = new Chess();

  constructor(gameId: string | null, player1Id: string) {
    this.gameId = gameId || v4();
    this.player1 = { id: player1Id, color: "w" };
  }

  setPlayer2(id: string) {
    this.player2 = { id, color: "b" };
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
    }
  }

  abort(id: string) {
    if (this.player1.id === id) {
      return "b";
    } else {
      return "w";
    }
  }
}
