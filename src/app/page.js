"use client";


export default function Home() {
  return (
    <div className="flex justify-center items-center h-dvh">
      <div className="flex p-44 bg-orange-300 flex-col rounded-3xl justify-center">
        <p className="font-bold text-6xl text-slate-700 mb-16">Ultimate Tic-Tac-Toe</p>
        <div className="flex align-center flex-col mx-3 space-y-5 ">
          <form className="flex flex-row items-stretch justify-center space-x-4">
            <input className="w-full px-4 rounded-lg" placeholder="username"></input> 
            <button className="shrink-0 bg-slate-50 p-3 rounded-lg">Create Game</button>
          </form>
          <a href="http://localhost:3000/game" className="w-full">
            <button className="w-full bg-slate-50 p-3 rounded-lg">
              Pass and Play
            </button>
          </a>
          <button className="bg-slate-50 py-3 rounded-lg">
            Single Player
          </button>
        </div>
      </div>
    </div>
  );
}
