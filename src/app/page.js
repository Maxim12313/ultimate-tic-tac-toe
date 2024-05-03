"use client";
import BigBoard from './big-board';

export default function Home() {
  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="bg-yellow-200 p-72">
        <BigBoard />
      </div>
    </div>
  );
}
