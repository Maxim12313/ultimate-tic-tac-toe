"use client";
import BigBoard from '../../components/big-board';
import { useState } from "react";
import Link from "next/link";

export default function Page() {
  const [turn, setTurn] = useState('x');
  const [blueWins, setBlueWins] = useState(0);
  const [redWins, setRedWins] = useState(0);
  const [bigBoard, setBigBoard] = useState(Array(9).fill(' $')); 
  const [board, setBoard] = useState(Array(9).fill(Array(9).fill('  ')));

  let blueUnderline = turn == 'x' ? "underline" : null;
  let redUnderline = turn == 'o' ? "underline" : null;
  
  const resetClick = () => {
    setTurn('x');
    setBigBoard(Array(9).fill(" $"));
    setBoard(Array(9).fill(Array(9).fill("  ")));
  }
  
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


    let nextBigBoard = bigBoard.map((x) => {
      return [...x];
    })
    
    let skip = false;
    let nextTurn = turn == 'x' ? 'o' : 'x';
    if (winning(nextBoard[bigIdx])) {
      nextBigBoard[bigIdx] = turn + '@';
      if (winning(nextBigBoard)) {
        if (turn == 'x') setBlueWins(blueWins + 1);
        else setRedWins(redWins + 1);
        nextTurn = '#';
        skip = true;
      }
    }
    if (!skip) {
      if (nextBigBoard[i][1] == '@') { //local winner exists
        nextBigBoard = nextBigBoard.map((x) => {
          if (x[1] == ' ') return x[0] + '$';
          else return x;
        })
      }
      else {
        nextBigBoard = nextBigBoard.map((x) => {
          if (x[1] == '$') return x[0] + ' ';
          else return x;
        });
        nextBigBoard[i] = nextBigBoard[i][0] + '$';
      }
    }
    setTurn(nextTurn);
    setBoard(nextBoard);
    setBigBoard(nextBigBoard);
  }

  return (
    <div className="flex flex-col">
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-center my-5 p-5 w-1/2 bg-orange-300 rounded-lg">
          <Link 
            href="../"
            className="font-bold text-5xl text-slate-700 leading-none"
          >
            Ultimate Tic-Tac-Toe
          </Link>
        </div>
      </div>
      <div className="flex justify-around items-start flex-row mt-0">
        <div className="h-full flex flex-col items-center leading-snug">
          <span className={blueUnderline + " font-medium text-[16rem] text-blue-600"}>x</span>
          <span className="text-[8rem] text-black">{ blueWins }</span>
        </div>
        <BigBoard resetClick={resetClick} turn={turn} bigBoard={bigBoard} board={board} handleClick={handleClick} />
        <div className="h-full flex flex-col items-center leading-snug">
          <span className={redUnderline + " font-medium text-[16rem] text-red-600"}>o</span>
          <span className="text-[8rem] text-black-300">{ redWins }</span>
        </div>
    </div>
      
    </div>
  );
}
