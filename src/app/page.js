"use client";
import Board from './mini-board.js';

export default function Home() {
  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="bg-yellow-200 p-72">
        <Board />
      </div>
    </div>
  );
}
