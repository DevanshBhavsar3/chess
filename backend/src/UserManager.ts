import { WebSocket } from "ws";
import { Game } from "./Game";
import { CREATE_GAME, MOVE_PIECE } from "./messages";
import { v4 } from "uuid";

interface User {
  id: string;
  socket: WebSocket;
}

export class UserManager {
  private users: User[];
  private games: Game[];
  private pendingGameId: string | null = null;

  constructor() {
    this.users = [];
    this.games = [];
  }

  add(socket: WebSocket) {
    const user: User = {
      id: v4(),
      socket: socket,
    };

    this.users.push(user);
    this.messageHandler(user);
  }

  remove(user: User) {
    this.users = this.users.filter((socket) => user !== socket);
  }

  messageHandler(user: User) {
    user.socket.on("message", (data) => {
      const message = JSON.parse(data.toString());

      switch (message.message) {
        case CREATE_GAME:
          var { gameId } = message.payload;
          this.createGame(user, gameId);
          break;
        case MOVE_PIECE:
          var { gameId, move } = message.payload;
          this.handleMove(gameId, move);
          break;
      }
    });
  }

  // TODO: Handle dynamic game creation e.g. time
  createGame(user: User, gameId: string) {
    if (this.pendingGameId) {
      if (this.pendingGameId === gameId) {
        const pendingGame = this.games.find((game) => game.gameId === gameId);

        if (!pendingGame) {
          console.error("No games found!");
          return;
        }

        if (user.id === pendingGame.player1Id) {
          console.error("Can't connect yourself.");
          return;
        }

        pendingGame.player2Id = user.id;
        this.pendingGameId = null;
      }
    } else {
      const game = new Game(gameId, user.id, null);
      this.games.push(game);
      this.pendingGameId = game.gameId;
    }
  }

  removeGame(gameId: string) {
    this.games.filter((game) => game.gameId != gameId);
  }

  handleMove(gameId: string, move: string) {
    if (this.pendingGameId === gameId) {
      console.error("Wait for opponent.");
      return;
    }

    const game = this.games.find((game) => game.gameId === gameId);

    if (!game) {
      console.error("Game not found!");
      return;
    }

    game.move(move);
  }
}
