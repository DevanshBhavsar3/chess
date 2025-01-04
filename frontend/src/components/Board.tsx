import Draggable from "react-draggable";

const board = [
  [
    { square: "a8", type: "r", color: "b" },
    { square: "b8", type: "n", color: "b" },
    { square: "c8", type: "b", color: "b" },
    { square: "d8", type: "q", color: "b" },
    { square: "e8", type: "k", color: "b" },
    { square: "f8", type: "b", color: "b" },
    { square: "g8", type: "n", color: "b" },
    { square: "h8", type: "r", color: "b" },
  ],
  [
    { square: "a7", type: "p", color: "b" },
    { square: "b7", type: "p", color: "b" },
    { square: "c7", type: "p", color: "b" },
    { square: "d7", type: "p", color: "b" },
    { square: "e7", type: "p", color: "b" },
    { square: "f7", type: "p", color: "b" },
    { square: "g7", type: "p", color: "b" },
    { square: "h7", type: "p", color: "b" },
  ],
  [
    { square: "a6", type: null, color: null },
    { square: "b6", type: null, color: null },
    { square: "c6", type: null, color: null },
    { square: "d6", type: null, color: null },
    { square: "e6", type: null, color: null },
    { square: "f6", type: null, color: null },
    { square: "g6", type: null, color: null },
    { square: "h6", type: null, color: null },
  ],
  [
    { square: "a5", type: null, color: null },
    { square: "b5", type: null, color: null },
    { square: "c5", type: null, color: null },
    { square: "d5", type: null, color: null },
    { square: "e5", type: null, color: null },
    { square: "f5", type: null, color: null },
    { square: "g5", type: null, color: null },
    { square: "h5", type: null, color: null },
  ],
  [
    { square: "a4", type: null, color: null },
    { square: "b4", type: null, color: null },
    { square: "c4", type: null, color: null },
    { square: "d4", type: null, color: null },
    { square: "e4", type: null, color: null },
    { square: "f4", type: null, color: null },
    { square: "g4", type: null, color: null },
    { square: "h4", type: null, color: null },
  ],
  [
    { square: "a3", type: null, color: null },
    { square: "b3", type: null, color: null },
    { square: "c3", type: null, color: null },
    { square: "d3", type: null, color: null },
    { square: "e3", type: null, color: null },
    { square: "f3", type: null, color: null },
    { square: "g3", type: null, color: null },
    { square: "h3", type: null, color: null },
  ],
  [
    { square: "a2", type: "p", color: "w" },
    { square: "b2", type: "p", color: "w" },
    { square: "c2", type: "p", color: "w" },
    { square: "d2", type: "p", color: "w" },
    { square: "e2", type: "p", color: "w" },
    { square: "f2", type: "p", color: "w" },
    { square: "g2", type: "p", color: "w" },
    { square: "h2", type: "p", color: "w" },
  ],
  [
    { square: "a1", type: "r", color: "w" },
    { square: "b1", type: "n", color: "w" },
    { square: "c1", type: "b", color: "w" },
    { square: "d1", type: "q", color: "w" },
    { square: "e1", type: "k", color: "w" },
    { square: "f1", type: "b", color: "w" },
    { square: "g1", type: "n", color: "w" },
    { square: "h1", type: "r", color: "w" },
  ],
];

export default function Board() {
  return (
    <div className="border-2 rounded-md m-1">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((square, squareIndex) => (
            <div
              key={squareIndex}
              className={`h-16 w-16 ${
                (squareIndex % 2 !== 0 && rowIndex % 2 !== 0) ||
                (squareIndex % 2 === 0 && rowIndex % 2 === 0)
                  ? "bg-blue-100"
                  : "bg-blue-400"
              }`}
            >
              {square.color && square.type ? (
                <Draggable axis="y">
                  <img
                    className="w-full h-full"
                    src={`${square.color + square.type}.png`}
                    alt={square.type}
                  />
                </Draggable>
              ) : undefined}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
