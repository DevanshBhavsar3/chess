import { WebSocketServer } from "ws";
import { UserManager } from "./UserManager";

const wss = new WebSocketServer({ port: 8080 });
const userManager = new UserManager();

wss.on("connection", (socket) => {
  userManager.add(socket);
});
