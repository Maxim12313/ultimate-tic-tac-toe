"use client";

function Square({ value, onClick}) {
    const readVal = value[0];
    let color = "bg-white";
    if (value[1] == '#') {
      color = readVal == 'x' ? "bg-blue-300" : "bg-red-300";
    }

    return (
      <button 
        className={color + " text-5xl flex justify-center items-center w-16 h-16 border-2 border-black"}
        onClick={onClick}
      >
        { readVal }
      </button>
    );
}

export default function Board({ winner, squares, squareClick, turn }) {
  let color;
  switch(winner[1]) {
    case '@': //no overal winner and local winner
      color = winner[0] == 'x' ? "border-blue-400" : "border-red-400";
      break;
    case '#': //overal winner
      color = winner[0] == 'x' ? "border-blue-700" : "border-red-700";
      break;
    case '$': //active board
      color = turn == 'x' ? "border-cyan-200" : "border-rose-200";
      break;
    default: //inactive board
      color = "border-slate-300";
      break;
  }
  
  return (
    <div className={"border-8 " + color}>
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