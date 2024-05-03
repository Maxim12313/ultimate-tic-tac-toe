"use client";
import { useState } from "react";
import Board from "./mini-board";

export default function BigBoard() {
  const [turn, setTurn] = useState('x');
  const [bigBoard, setBigBoard] = useState(Array(9).fill(null));
  const [board, setBoard] = useState(Array(9).fill(Array(9).fill(null)));

  const winning = (squares) => {
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
  const handleClick = (bigIdx, i) => {
    if (bigBoard[bigIdx] != null || board[bigIdx][i] != null || turn == '#') return;

    const nextBoard = board.map((val) => {
      return val.map((x) => {
        return x;
      });
    });
    
    nextBoard[bigIdx][i] = turn;
    setBoard(nextBoard);

    
    if (winning(nextBoard[bigIdx])) {
      const nextBigBoard = bigBoard;
      nextBigBoard[bigIdx] = turn;
      setBigBoard(nextBigBoard);
    }
    
    let nextTurn = turn == 'x' ? 'o' : 'x';
    if (winning(bigBoard)) nextTurn = '#';
    setTurn(nextTurn);
  }

  return (
    <div>
      <div className="flex flex-row">
        <Board winner={bigBoard[0]} squares={board[0]} squareClick={(i) => handleClick(0, i)} />
        <Board winner={bigBoard[1]} squares={board[1]} squareClick={(i) => handleClick(1, i)} />
        <Board winner={bigBoard[2]} squares={board[2]} squareClick={(i) => handleClick(2, i)} />
      </div>
      <div className="flex flex-row">
        <Board winner={bigBoard[3]} squares={board[3]} squareClick={(i) => handleClick(3, i)} />
        <Board winner={bigBoard[4]} squares={board[4]} squareClick={(i) => handleClick(4, i)} />
        <Board winner={bigBoard[5]} squares={board[5]} squareClick={(i) => handleClick(5, i)} />
      </div>
      <div className="flex flex-row">
        <Board winner={bigBoard[6]} squares={board[6]} squareClick={(i) => handleClick(6, i)} />
        <Board winner={bigBoard[7]} squares={board[7]} squareClick={(i) => handleClick(7, i)} />
        <Board winner={bigBoard[8]} squares={board[8]} squareClick={(i) => handleClick(8, i)} />
      </div>
    </div>
  );
}
