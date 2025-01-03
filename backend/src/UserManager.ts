import { Game } from "./Game";
import { BOARD_UPDATE, CREATE_GAME, GAME_OVER, MOVE_PIECE } from "./messages";
import { User } from "./types";

export class UserManager {
  private users: User[];
  private games: Game[];
  private pendingGameIds: string[] = [];

  constructor() {
    this.users = [];
    this.games = [];
  }

  add(user: User) {
    this.users.push(user);
    this.messageHandler(user);
  }

  removeUser(player: User) {
    this.users = this.users.filter((user) => user !== player);
  }

  messageHandler(user: User) {
    user.socket.on("message", (data) => {
      const message = JSON.parse(data.toString());
      console.log(message);
      switch (message.message) {
        case CREATE_GAME:
          var { gameId } = message.payload;
          this.createGame(user, gameId);
          break;
        case MOVE_PIECE:
          var { gameId, move } = message.payload;
          this.handleMove(gameId, move, user);
          break;
      }
    });

    user.socket.on("close", () => {
      this.handleExit(user);
    });
  }

  // TODO: Handle dynamic game creation e.g. time
  createGame(user: User, gameId: string) {
    // if (this.pendingGameIds.length > 0) {
    const isGamePending = this.pendingGameIds.find(
      (pendingGameId) => pendingGameId === gameId
    );

    if (isGamePending) {
      const pendingGame = this.games.find((game) => game.gameId === gameId);

      if (!pendingGame) {
        console.error("No games found!");
        return;
      }

      if (user.id === pendingGame.player1.id) {
        console.error("Can't connect yourself.");
        return;
      }

      pendingGame.setPlayer2(user.id);
      this.pendingGameIds = this.pendingGameIds.filter(
        (pendingGameId) => pendingGameId !== gameId
      );
    } else {
      const game = new Game(gameId, user.id);
      this.games.push(game);
      this.pendingGameIds.push(game.gameId);
    }
  }

  removeGame(gameId: string) {
    this.games = this.games.filter((game) => game.gameId != gameId);
  }

  handleMove(gameId: string, move: string, user: User) {
    const isGamePending = this.pendingGameIds.find(
      (pendingGameId) => pendingGameId === gameId
    );

    if (isGamePending) {
      console.error("Wait for opponent.");
      return;
    }

    const game = this.games.find((game) => game.gameId === gameId);

    if (!game) {
      console.error("Game not found!");
      return;
    }

    const updatedBoard = game.move(move, user.id);

    if (updatedBoard) {
      const player1 = this.users.find((user) => user.id === game.player1.id);
      const player2 = this.users.find((user) => user.id === game.player2?.id);

      if (player1 && player2) {
        player1.socket.emit(BOARD_UPDATE, updatedBoard);
        player2.socket.emit(BOARD_UPDATE, updatedBoard);
      }
    }
  }

  handleExit(user: User) {
    this.removeUser(user);

    const game = this.games.find(
      (game) => game.player1.id === user.id || game.player2?.id === user.id
    );
    if (!game) return;

    const pendingGameId = this.pendingGameIds.find(
      (pendingGameId) => pendingGameId === game.gameId
    );

    if (pendingGameId) {
      this.pendingGameIds = this.pendingGameIds.filter(
        (id) => id !== pendingGameId
      );
    } else {
      const winner = game.abort(user.id);

      if (winner === "w") {
        const player1 = this.users.find((user) => user.id === game.player1.id);

        if (!player1) return;

        player1.socket.emit(GAME_OVER, "Black Aborted");
        player1.socket.close();
      } else {
        const player2 = this.users.find((user) => user.id === game.player2?.id);

        if (!player2) return;

        player2.socket.emit(GAME_OVER, "White Aborted");
        player2.socket.close();
      }
    }

    this.removeGame(game.gameId);
  }
}
