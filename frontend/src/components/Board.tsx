import { Chess, Move, Square, SQUARES } from "chess.js";
import { useState } from "react";

const chess = new Chess();

export default function Board() {
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [availableMoves, setAvailaleMoves] = useState<string[]>([]);

  function movePiece(to: string) {
    if (!selectedSquare) return;

    if (selectedSquare === to) {
      setSelectedSquare(null);
      setAvailaleMoves([]);
      return;
    }

    try {
      chess.move({
        from: selectedSquare,
        to,
      });

      if (chess.isGameOver()) {
      }
    } catch (error) {
      console.error(error);
      setSelectedSquare(null);
      setAvailaleMoves([]);
      return;
    }

    setAvailaleMoves([]);
    setSelectedSquare(null);
  }

  function showAvailableMoves(square: Square) {
    const tempChess = new Chess(chess.fen());
    const availableMoves = [];

    for (const toSquare of SQUARES) {
      try {
        const move = tempChess.move({ from: square, to: toSquare });
        availableMoves.push(move.to);
        tempChess.undo();
      } catch (error) {
        continue;
      }
    }

    setAvailaleMoves(availableMoves);
    setSelectedSquare(square);
  }

  return (
    <div className="border-2 rounded-md m-1 grid grid-cols-8">
      {SQUARES.map((square, index) => (
        <div
          id={square}
          key={square}
          onClick={() => movePiece(square)}
          className={`h-16 w-16 flex justify-center items-center relative
            ${selectedSquare === square ? "bg-[#fff35f]" : ""}
            ${
              (index + parseInt(square[1])) % 2 !== 0
                ? "bg-blue-400"
                : "bg-blue-100"
            }`}
        >
          {chess.get(square) && (
            <img
              id={square}
              className={
                availableMoves.includes(square)
                  ? "border-4 border-black/30 rounded-full"
                  : ""
              }
              src={`${chess.get(square).color}${chess.get(square).type}.png`}
              onClick={() => showAvailableMoves(square)}
            />
          )}
          {availableMoves.includes(square) && (
            <div id={square} className="bg-black/30 h-5 w-5 rounded-full" />
          )}
        </div>
      ))}
    </div>
  );
}
