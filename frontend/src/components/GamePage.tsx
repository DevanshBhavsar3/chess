import { useEffect, useState } from "react";
import Board from "./Board";
import { v4 } from "uuid";

export default function GamePage() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const userId = window.location.href.split("?id=")[1];

    const socket = new WebSocket(`ws://localhost:8080?id=${userId}`);

    const data = {
      message: "create-game",
      payload: {
        gameId: v4(),
      },
    };

    socket.addEventListener("open", () => {
      socket.send(JSON.stringify(data));
    });
  }, []);

  return (
    <div className="h-screen w-screen bg-black/80 text-white flex justify-center items-center">
      {isLoading ? (
        <div className="absolute flex justify-center items-center w-full h-full bg-black/30">
          <p>Loading</p>
        </div>
      ) : undefined}

      <div
        className={`flex flex-col justify-center items-start gap-5 ${
          isLoading ? "pointer-events-none" : ""
        }`}
      >
        <h1 className="text-xl ">Player 1 (1500)</h1>
        <Board />
        <h1 className="text-xl">Player 2 (1495)</h1>
      </div>
    </div>
  );
}
