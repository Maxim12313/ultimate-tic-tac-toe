"use client";
import { useState } from "react";
import Board from "./mini-board";

export default function BigBoard() {
  return (
    <div>
      <div className="flex flex-row">
        <Board />
        <Board />
        <Board />
      </div>
      <div className="flex flex-row">
        <Board />
        <Board />
        <Board />
      </div>
      <div className="flex flex-row">
        <Board />
        <Board />
        <Board />
      </div>
    </div>
  );
}
