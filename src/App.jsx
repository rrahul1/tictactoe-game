import React, { useState } from "react";
import "./components/style.scss";
import Board from "./components/Board";
import { calculateWinner } from "./components/winner";
import StatusMessage from "./components/StatusMessage";
import History from "./components/History";

const NEW_GAME = [{ squares: Array(9).fill(null), isXNext: false }];

function App() {
  const [history, setHistory] = useState(NEW_GAME);
  const [currentMove, setCurrentMove] = useState(0);
  const gamingBoard = history[currentMove];

  const { winner, winningSquares } = calculateWinner(gamingBoard.squares);

  const handleSquareClick = (clickedPosition) => {
    if (gamingBoard.squares[clickedPosition] || winner) {
      return;
    }

    setHistory((currentHistory) => {
      const isTraversing = currentMove + 1 !== currentHistory.length;

      const lastGamingState = isTraversing
        ? currentHistory[currentMove]
        : history[history.length - 1];

      const nextSquareState = lastGamingState.squares.map(
        (sqValue, position) => {
          if (clickedPosition === position) {
            return lastGamingState.isXNext ? "X" : "0";
          }
          return sqValue;
        }
      );

      const base = isTraversing
        ? currentHistory.slice(0, currentHistory.indexOf(lastGamingState) + 1)
        : currentHistory;

      return currentHistory.concat({
        squares: nextSquareState,
        isXNext: !lastGamingState.isXNext,
      });
    });
    setCurrentMove((move) => move + 1);
  };

  const moveTo = (move) => {
    setCurrentMove(move);
  };

  const onNewGameStart = () => {
    setHistory(NEW_GAME);
    setCurrentMove(0);
  };

  return (
    <div className="app">
      <h1>
        TIC <span className="text-green">TAC</span> TOE
      </h1>
      <StatusMessage winner={winner} gamingBoard={gamingBoard} />
      <Board
        squares={gamingBoard.squares}
        winningSquares={winningSquares}
        handleSquareClick={handleSquareClick}
      />
      <button className="btn-reset" onClick={onNewGameStart}>
        Start New Game
      </button>
      <h2
        style={{
          fontWeight: "normal",
        }}
      >
        Current Game History
      </h2>
      <History history={history} moveTo={moveTo} currentMove={currentMove} />
      <div className="bg-balls"></div>
    </div>
  );
}

export default App;
