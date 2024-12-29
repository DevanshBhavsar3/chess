import { Chess } from "chess.js";
import { WebSocket } from "ws";

export class Game {
  public time: number;
  public white: WebSocket;
  public black: WebSocket;

  constructor(time: number, white: WebSocket, black: WebSocket) {
    this.time = time;
    this.white = white;
    this.black = black;

    let chess = new Chess();
    console.log("Game started");
  }
}
