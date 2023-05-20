import React from "react";

function Square({ value, onClick, isWinningSquares }) {
  return (
    <button
      className={`square ${value === "X" ? "text-green" : "text-orange"} ${
        isWinningSquares ? "winning" : ""
      }`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Square;
