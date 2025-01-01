import { WebSocketServer } from "ws";
import { UserManager } from "./UserManager";
import { User } from "./types";

const wss = new WebSocketServer({ port: 8080 });
const userManager = new UserManager();

wss.on("connection", (socket, request) => {
  const url = request.url;

  if (!url) {
    return socket.send("Cannot Get Url.");
  }

  try {
    const id = url.split("?")[1].split("=")[1];

    const user: User = {
      id: id,
      socket: socket,
    };

    userManager.add(user);
  } catch (error) {
    console.error("Can't Get User Id.");
  }
});
