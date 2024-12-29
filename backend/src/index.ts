import { WebSocketServer } from "ws";
import { Game } from "./Game";
import { Matchmaker } from "./Matchmaker";

const wss = new WebSocketServer({ port: 8080 });
const matchmaker = new Matchmaker();

wss.on("connection", (socket) => {
  matchmaker.add(socket);

  try {
    const opponent = matchmaker.match(socket);
    if (!opponent) throw new Error("Opponent not found.");

    new Game(10, opponent, socket);
  } catch (error) {
    console.log(error);
  }
});
