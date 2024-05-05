"use client";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="flex p-44 bg-orange-300 flex-col rounded-3xl justify-center">
        <p className="font-bold text-6xl text-slate-700 mb-16">Ultimate Tic-Tac-Toe</p>
        <div className="flex align-center flex-col mx-3 space-y-5 ">
          <Link href="/multiplayer" className="w-full bg-slate-50 p-3 rounded-lg flex justify-center">
            Multiplayer
          </Link>
          <Link href="/pass-play" className="w-full bg-slate-50 p-3 rounded-lg flex justify-center">
            Pass and Play
          </Link>
          <button className="bg-slate-50 py-3 rounded-lg">
            Single Player
          </button>
        </div>
      </div>
    </div>
  );
}
