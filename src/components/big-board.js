"use client";
import { useState } from "react";
import Board from "./mini-board";
import Image from "next/image";
import restartImage from "../images/restart.png";

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
export default function BigBoard({ turn, bigBoard, board, handleClick, resetClick }) { //put turn state in outer and keep track of winner that way plus underline next player
  let hidden = turn != '#' ? "hidden" : null;
  return (
    <div className="relative">
      <button 
        className={"absolute top-[calc(50%-200px)] left-[calc(50%-200px)] " + hidden}
        onClick={resetClick}
      >
        <Image 
          src={restartImage} 
          width={400}
          height={400}
          alt="restart"
        />
      </button>
    
      <div className="flex flex-row">
        <Board turn={turn} winner={bigBoard[0]} squares={board[0]} squareClick={(i) => handleClick(0, i)} />
        <Board turn={turn} winner={bigBoard[1]} squares={board[1]} squareClick={(i) => handleClick(1, i)} />
        <Board turn={turn} winner={bigBoard[2]} squares={board[2]} squareClick={(i) => handleClick(2, i)} />
      </div>
      <div className="flex flex-row">
        <Board turn={turn} winner={bigBoard[3]} squares={board[3]} squareClick={(i) => handleClick(3, i)} />
        <Board turn={turn} winner={bigBoard[4]} squares={board[4]} squareClick={(i) => handleClick(4, i)} />
        <Board turn={turn} winner={bigBoard[5]} squares={board[5]} squareClick={(i) => handleClick(5, i)} />
      </div>
      <div className="flex flex-row">
        <Board turn={turn} winner={bigBoard[6]} squares={board[6]} squareClick={(i) => handleClick(6, i)} />
        <Board turn={turn} winner={bigBoard[7]} squares={board[7]} squareClick={(i) => handleClick(7, i)} />
        <Board turn={turn} winner={bigBoard[8]} squares={board[8]} squareClick={(i) => handleClick(8, i)} />
      </div>
    </div>
  );
}
