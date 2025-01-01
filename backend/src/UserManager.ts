import { Game } from "./Game";
import { CREATE_GAME, MOVE_PIECE } from "./messages";
import { User } from "./types";

export class UserManager {
  private users: User[];
  private games: Game[];
  private pendingGameId: string | null = null;

  constructor() {
    this.users = [];
    this.games = [];
  }

  add(user: User) {
    this.users.push(user);
    this.messageHandler(user);
    console.log(this.users);
  }

  removeUser(player: User) {
    this.users = this.users.filter((user) => user !== player);
  }

  messageHandler(user: User) {
    user.socket.on("message", (data) => {
      const message = JSON.parse(data.toString());

      switch (message.message) {
        case CREATE_GAME:
          var { gameId } = message.payload;
          this.createGame(user, gameId);

          console.log(this.games);

          break;
        case MOVE_PIECE:
          var { gameId, move } = message.payload;
          this.handleMove(gameId, move);
          break;
      }
    });

    user.socket.on("close", () => {
      this.removeUser(user);

      // TODO: Finish the game where this user was playing.
      if (this.pendingGameId) {
        this.removeGame(this.pendingGameId);
        this.pendingGameId = null;
      }

      console.log(this.users);
      console.log(this.games);
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

        pendingGame.setPlayer2Id(user.id);
        this.pendingGameId = null;
      }
    } else {
      const game = new Game(gameId, user.id, null);
      this.games.push(game);
      this.pendingGameId = game.gameId;
    }
  }

  removeGame(gameId: string) {
    this.games = this.games.filter((game) => game.gameId != gameId);
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

    const moveResult = game.move(move);

    if (moveResult) {
      const player1 = this.users.find((user) => user.id === game.player1Id);
      const player2 = this.users.find((user) => user.id === game.player2Id);

      if (player1 && player2) {
        player1.socket.send(moveResult);
        player1.socket.close();

        player2.socket.send(moveResult);
        player2.socket.close();

        this.removeUser(player1);
        this.removeUser(player2);
      }

      this.removeGame(game.gameId);
    }

    console.log(moveResult);
  }
}
