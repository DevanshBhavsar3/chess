import { Link } from "react-router";
import { MdCancel } from "react-icons/md";
import { useState } from "react";

export default function GameOverPopup({ winner }: { winner: string }) {
  const [visibility, setVisibility] = useState<boolean>(true);
  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 rounded-md text-white bg-black select-none overflow-hidden flex-col justify-center items-end ${
        visibility ? "flex" : "hidden"
      }`}
    >
      <div
        className="cursor-pointer w-fit"
        onClick={() => setVisibility(false)}
      >
        <MdCancel className="text-xl" />
      </div>
      <div className="whitespace-nowrap my-5 text-center mx-20">
        <p className="text-3xl">Game Over</p>
        <p className="text-xl">{winner} Won!</p>
      </div>
      <button
        className="bg-blue-700 hover:bg-blue-600 text-center py-3 w-full rounded-lg border-b-4 border-b-blue-900"
        onClick={() => window.location.reload()}
      >
        Play Again
      </button>
    </div>
  );
}
