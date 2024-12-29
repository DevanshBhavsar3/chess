"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const chess_js_1 = require("chess.js");
class Game {
    constructor(time, white, black) {
        this.time = time;
        this.white = white;
        this.black = black;
        let chess = new chess_js_1.Chess();
        console.log("Game started");
    }
}
exports.Game = Game;
