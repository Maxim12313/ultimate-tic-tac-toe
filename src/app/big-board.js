"use client";
import { useState } from "react";
import Board from "./mini-board";

//board data = val, winner / non-winner
//# = winner
//' ' inactive
//
//big board data = (winner if exists), localwinner / globalwinner / active / inactive
//x,o = winner
//local winner = @
//global winner = #
//active = $
//inactive = ' '
export default function BigBoard() {
  const [turn, setTurn] = useState('x');
  const [playIdx, setPlayIdx] = useState(-1); //-1 means all 
  const [bigBoard, setBigBoard] = useState(Array(9).fill(' $')); 
  const [board, setBoard] = useState(Array(9).fill(Array(9).fill('  ')));

  const winning = (squares) => {
    for (let i = 0; i < 3; i++) {
      const base = i * 3;
      //hor
      if (squares[base][0] != ' ' && squares[base][0] == squares[base + 1][0] && squares[base][0] == squares[base + 2][0]) {
        squares[base] = squares[base + 1]= squares[base + 2] = squares[base][0] + '#';
        return true;
      }
      //ver
      if (squares[i][0] != ' ' && squares[i][0] == squares[i + 3][0] && squares[i][0] == squares[i + 6][0]) {
        squares[i] = squares[i + 3] = squares[i + 6] = squares[i][0] + '#';
        return true;
      }
    }
    //diag
    if (squares[0][0] != ' ' && squares[0][0] == squares[4][0] && squares[0][0] == squares[8][0]) {
      squares[0] = squares[4] = squares[8] = squares[0][0] + '#';
      return true;
    }
    if (squares[2][0] != ' ' && squares[2][0] == squares[4][0] && squares[2][0] == squares[6][0]) {
      squares[2] = squares[4] = squares[6] = squares[2][0] + '#';
      return true;
    }
    return false;
  }
  const handleClick = (bigIdx, i) => {
    if (bigBoard[bigIdx][1] != '$' || board[bigIdx][i][0] != ' ' || turn == '#') return;

    const nextBoard = board.map((val) => {
      return [...val];
    });
    
    nextBoard[bigIdx][i] = turn;

    let nextBigBoard;
    let nextPlayIdx;
    if (bigBoard[i][1] == '@') { //local winner exists
      nextPlayIdx == -1;      
      nextBigBoard = bigBoard.map((x) => {
        if (x[1] == ' ') return x[0] + '$';
        else return x;
      })
    }
    else {
      nextPlayIdx = i;      
      nextBigBoard = bigBoard.map((x) => {
        if (x[1] == '$') return x[0] + ' ';
        else return x;
      });
      nextBigBoard[i] = nextBigBoard[i][0] + '$';
    }

    
    let nextTurn = turn == 'x' ? 'o' : 'x';
    if (winning(nextBoard[bigIdx])) {
      nextBigBoard[bigIdx] = turn + '@';
      if (winning(nextBigBoard)) {
        nextBigBoard[i] = nextBigBoard[i][0] + ' '; //reset inactive
        nextTurn = '#';
      }
    }
    
    setTurn(nextTurn);
    setBoard(nextBoard);
    setBigBoard(nextBigBoard);
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
