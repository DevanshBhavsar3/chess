"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Matchmaker = void 0;
class Matchmaker {
    constructor() {
        this.players = new Set();
    }
    //   TODO: add more logic to matchmaking like ELO and time
    match(currentPlayer) {
        for (const player of this.players) {
            if (player !== currentPlayer) {
                this.remove(player);
                this.remove(currentPlayer);
                return player;
            }
        }
        return null;
    }
    add(player) {
        this.players.add(player);
    }
    remove(player) {
        this.players.delete(player);
    }
}
exports.Matchmaker = Matchmaker;
