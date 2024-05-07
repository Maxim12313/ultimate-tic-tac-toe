import BigBoard from './BigBoard';
import ChatBox from "./ChatBox";
import { socket } from "../app/socket";
import { useState, useCallback, useEffect } from "react";

export default function Game({ nameX, nameO, isMultiplayer, isX }) {
  const [lastWinner, setLastWinner] = useState(isX);
  const [turn, setTurn] = useState('x');
  const [blueWins, setBlueWins] = useState(0);
  const [redWins, setRedWins] = useState(0);
  const [bigBoard, setBigBoard] = useState(Array(9).fill(' $')); 
  const [board, setBoard] = useState(Array(9).fill(Array(9).fill('  ')));
  const [thisTurn, setThisTurn] = useState(isX);
  const [thisReset, setThisReset] = useState(false);
  const [otherReset, setOtherReset] = useState(false);

  const updateBoard = (bigIdx, i) => {
    if (
      bigBoard[bigIdx][1] != "$" ||
      board[bigIdx][i][0] != " " ||
      turn == "#" 
    )
      return;

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
        setLastWinner(turn);
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

  const reset = () => {
    const loser = lastWinner != 'x' ? 'x' : 'o';
    const won = lastWinner == 'x' && isX;
    setTurn(loser);
    setThisTurn(!won);
    setBigBoard(Array(9).fill(" $"));
    setBoard(Array(9).fill(Array(9).fill("  ")));
    setThisReset(false);
    setOtherReset(false);
  }
  
  const cacheUpdateBoard = useCallback(updateBoard, [
    turn, blueWins, redWins, bigBoard, board
  ]);
  
  const cacheReset = useCallback(reset, [
    isX, lastWinner
  ]);

  
  useEffect(() => {
    if (!socket.connected) return;

    const onPlay = (bigIdx, i) => {
      cacheUpdateBoard(bigIdx, i);
      setThisTurn(true);
    }
    
    const onReset = () => {
      setOtherReset(true);
      if (thisReset) {
        cacheReset();
      }
    }
    
    socket.on("play", onPlay)
    socket.on("reset", onReset);
    
    return () =>{
      socket.off("play", onPlay);
      socket.off("reset", onReset);
    }
  }, [cacheUpdateBoard, cacheReset, thisReset]);

  
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
    if (!isMultiplayer) {
      updateBoard(bigIdx, i);
    }
    else if (thisTurn) {
      updateBoard(bigIdx, i);
      socket.emit("play", bigIdx, i);
      setThisTurn(false);
    }
  }

  const resetClick = () => {
    if (!isMultiplayer) {
      reset();
    }
    if (!thisReset) {
      socket.emit("reset");
      socket.emit("play again", thisName);
      setThisReset(true);
      if (otherReset) {
        reset();
      }
    }
  }
  
  

  const thisName = isX ? nameX : nameO;
  const otherName = !isX ? nameX : nameO;

  const blueUnderline = turn == 'x' ? "underline" : null;
  const redUnderline = turn == 'o' ? "underline" : null;

  return (
    <div>
      <div className="flex justify-center flex-row mt-0 space-x-10 mx-10">
        <div className="h-full flex flex-col items-center leading-tight flex-1">
          <span
            className={
              blueUnderline + " font-medium text-[12rem] text-blue-600"
            }
          >
            x
          </span>
          <span className="text-[6rem] text-black">{blueWins}</span>
          <span className="text-3xl" >{ nameX }</span>
        </div>
        <div className="flex-1">
          <BigBoard
            resetClick={resetClick}
            turn={turn}
            bigBoard={bigBoard}
            board={board}
            handleClick={handleClick}
          />
        </div>
        <div className="h-full flex flex-col items-center leading-tight flex-1">
          <span
            className={
              redUnderline + " font-medium text-[12rem] text-red-600"
            }
          >
            o
          </span>
          <span className="text-[6rem] text-black-300">{redWins}</span>
          <span className="text-3xl">{ nameO }</span>
          {isMultiplayer && 
            <div className="mt-5 w-full">
              <ChatBox thisName={thisName} otherName={otherName}/>
            </div>
          }
        </div>
      </div>
    </div>
  );
}
