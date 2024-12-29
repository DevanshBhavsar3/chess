import { WebSocket } from "ws";

export class Matchmaker {
  private players: Set<WebSocket> = new Set();

  //   TODO: add more logic to matchmaking like ELO and time
  match(currentPlayer: WebSocket) {
    for (const player of this.players) {
      if (player !== currentPlayer) {
        this.remove(player);
        this.remove(currentPlayer);
        return player;
      }
    }

    return null;
  }

  add(player: WebSocket) {
    this.players.add(player);
  }

  remove(player: WebSocket) {
    this.players.delete(player);
  }
}
