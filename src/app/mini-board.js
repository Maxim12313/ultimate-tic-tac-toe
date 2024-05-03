"use client";
import { useState } from "react";

function Square({ value, onClick}) {
    const readVal = value == null ? null : value[0];
    const winColor = readVal == 'x' ? "bg-blue-300" : "bg-red-300";
    const color = value == null || value.length == 1 ? "bg-white" : winColor;
    return (
      <button 
        className={color + " flex justify-center items-center w-10 h-10 text-lg border-2 border-black"}
        onClick={onClick}
      >
        { readVal }
      </button>
    );
}

export default function Board() {
  const [turn, setTurn] = useState('x');
  const [squares, setSquares] = useState(Array(9).fill(null));
  
  const winning = () => {
    for (let i = 0; i < 3; i++) {
      const base = i * 3;
      //hor
      if (squares[base] != null && squares[base] == squares[base + 1] && squares[base] == squares[base + 2]) {
        squares[base] = squares[base + 1] = squares[base + 2] = squares[base] + '#';
        return true;
      }
      //ver
      if (squares[i] != null && squares[i] == squares[i + 3] && squares[i] == squares[i + 6]) {
        squares[i] = squares[i + 3] = squares[i + 6] = squares[i] + '#';
        return true;
      }
    }
    //diag
    if (squares[0] != null && squares[0] == squares[4] && squares[0] == squares[8]) {
      squares[0] = squares[4] = squares[8] = squares[0] + '#';
      return true;
    }
    if (squares[2] != null && squares[2] == squares[4] && squares[2] == squares[6]) {
      squares[2] = squares[4] = squares[6] = squares[2] + '#';
      return true;
    }
    return false;
  }

  const squareClick = (i) => {
    if (squares[i] != null || turn == '#') return; //# = game finished

    const nextSquares = squares;
    nextSquares[i] = turn;
    setSquares(nextSquares);

    const nextVal = turn == 'x' ? 'o' : 'x';
    const nextTurn = winning() ? '#' : nextVal;
    setTurn(nextTurn);
  }
  
  return (
    <div className="border-4 border-emerald-600">
      <div className="flex flex-row">
        <Square value={squares[0]} onClick={() => squareClick(0)} />
        <Square value={squares[1]} onClick={() => squareClick(1)} />
        <Square value={squares[2]} onClick={() => squareClick(2)} />
      </div>
      <div className="flex flex-row">
        <Square value={squares[3]} onClick={() => squareClick(3)} />
        <Square value={squares[4]} onClick={() => squareClick(4)} />
        <Square value={squares[5]} onClick={() => squareClick(5)} />
      </div>
      <div className="flex flex-row">
        <Square value={squares[6]} onClick={() => squareClick(6)} />
        <Square value={squares[7]} onClick={() => squareClick(7)} />
        <Square value={squares[8]} onClick={() => squareClick(8)} />
      </div>
    </div>
  );
}