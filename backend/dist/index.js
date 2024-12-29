"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const Game_1 = require("./Game");
const Matchmaker_1 = require("./Matchmaker");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const matchmaker = new Matchmaker_1.Matchmaker();
wss.on("connection", (socket) => {
    matchmaker.add(socket);
    try {
        const opponent = matchmaker.match(socket);
        if (!opponent)
            throw new Error("Opponent not found.");
        new Game_1.Game(10, opponent, socket);
    }
    catch (error) {
        console.log(error);
    }
});
