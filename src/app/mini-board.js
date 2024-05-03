"use client";
import { useState } from "react";

function Square({ value, onClick}) {
    const readVal = value == null ? null : value[0];
    const winColor = readVal == 'x' ? "bg-blue-300" : "bg-red-300";
    const color = value == null || value.length == 1 ? "bg-white" : winColor;
    return (
      <button 
        className={color + " text-5xl flex justify-center items-center w-16 h-16 border-2 border-black"}
        onClick={onClick}
      >
        { readVal }
      </button>
    );
}

export default function Board({ winner, squares, squareClick }) {
  let color = "border-emerald-600";
  if (winner != null) {
    color = winner[0] == 'x'? "border-blue-400" : "border-red-400";
  }
  return (
    <div className={"border-4 " + color}>
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