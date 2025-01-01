import { Game } from "./Game";
import { CREATE_GAME, MOVE_PIECE } from "./messages";
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
      this.handleExit(user);

      console.log(this.users);
      console.log(this.games);
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

  handleMove(gameId: string, move: string) {
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

    const moveResult = game.move(move);

    if (moveResult) {
      const player1 = this.users.find((user) => user.id === game.player1.id);
      const player2 = this.users.find((user) => user.id === game.player2?.id);

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

  handleExit(user: User) {
    // if (this.pendingGameId) {
    //   this.removeGame(this.pendingGameId);
    //   this.pendingGameId = null;
    // } else {
    console.log("user", user.id);

    this.removeUser(user);

    const game = this.games.find(
      (game) => game.player1.id === user.id || game.player2?.id === user.id
    );
    if (!game) return;

    console.log("game", game.gameId);

    const pendingGameId = this.pendingGameIds.find(
      (pendingGameId) => pendingGameId === game.gameId
    );

    console.log("pending", pendingGameId);

    if (pendingGameId) {
      this.pendingGameIds = this.pendingGameIds.filter(
        (id) => id !== pendingGameId
      );
    } else {
      const winner = game.abort(user.id);

      if (winner === "w") {
        const player1 = this.users.find((user) => user.id === game.player1.id);

        if (!player1) return;

        player1.socket.send("Black Aborted");
        player1.socket.close();
      } else {
        const player2 = this.users.find((user) => user.id === game.player2?.id);

        if (!player2) return;

        player2.socket.send("White Aborted");
        player2.socket.close();
      }
    }

    this.removeGame(game.gameId);
  }
}
