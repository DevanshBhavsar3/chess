import { WebSocket } from "ws";
import { Game } from "./Game";
import { CREATE_GAME } from "./messages";

interface User {
  id: string;
  socket: WebSocket;
}

export class UserManager {
  private users: WebSocket[];
  private games: Game[];

  constructor() {
    this.users = [];
    this.games = [];
  }

  add(user: WebSocket) {
    this.users.push(user);
    this.messageHandler(user);
  }

  remove(user: WebSocket) {
    this.users = this.users.filter((socket) => user !== socket);
  }

  messageHandler(user: WebSocket) {
    user.on("message", (data) => {
      const message = data.toString();

      if (message === CREATE_GAME) {
        console.log("Create Game");
      }
    });
  }

  // TODO: Handle dynamic game creation
  createGame(gameId: string, user: User) {
    const game = new Game(gameId, user.id, null);
    this.games.push(game);
  }

  removeGame(gameId: string) {
    this.games.filter((game) => game.gameId != gameId);
  }
}
