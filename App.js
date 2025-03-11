import "./App.css";
import Board from "./components/Board";
import React, { useState } from "react";
import { ScoreBoard } from "./components/ScoreBoard"; // ✅ Correct
import ResetButton from "./components/ResetButton";

function App() {
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [board, setBoard] = useState(Array(9).fill(null));
  const [xPlaying, setXPlaying] = useState(true);
  const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  const [gameOver, setGameOver] = useState(false);

  // ✅ Moved checkWinner function OUTSIDE handleBoxClick
  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x]; // Return "X" or "O" as the winner
      }
    }
    return null; // Explicitly return null if no winner
  };

  const handleBoxClick = (boxIdx) => {
    if (gameOver || board[boxIdx]) return; // Prevent move if game is over or box is taken

    const updatedBoard = board.map((value, idx) => 
      idx === boxIdx ? (xPlaying ? "X" : "O") : value
    );

    setBoard(updatedBoard); // ✅ Update board regardless of winner

    const winner = checkWinner(updatedBoard);
    if (winner) {
      setScores((prevScores) => ({
        ...prevScores,
        [winner === "O" ? "oScore" : "xScore"]: prevScores[winner === "O" ? "oScore" : "xScore"] + 1,
      }));
    } else {
      setXPlaying(!xPlaying); // ✅ Only switch turns if no winner
    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  };

  return (
    <div className="App">
      <ScoreBoard scores={scores} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard} />
    </div>
  );
}

export default App;
