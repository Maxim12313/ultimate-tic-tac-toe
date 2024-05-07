"use client";
import { useState, useEffect } from "react";
import { socket } from "../socket";
import Header from "../../components/Header";
import Game from "../../components/Game";
import Image from "next/image";
import walkingPenguin from "../../images/penguin-walk.gif";

const Status = Object.freeze({
  lobby: 0,
  queue: 1,
  game: 2
});

export default function Page() {
  const [status, setStatus] = useState(Status.lobby);
  const [otherName, setOtherName] = useState("");
  const [thisName, setThisName] = useState("");
  const [isX, setIsX] = useState(false);

  useEffect(() => {
    const onJoin = () => {
      setStatus(Status.game);
      socket.emit("name", thisName);
    }

    const onName = (name) => {
      setOtherName(name);
    }
    const onSetX = () => {
      setIsX(true);
    }
    
    socket.on("join", onJoin);
    socket.on("name", onName);
    socket.on("setX", onSetX);
    
    return () => { 
      socket.off("join", onJoin);
      socket.off("name", onName);
      socket.off("setX", onSetX);
    }
  }, [thisName]);

  const nameX = isX ? thisName : otherName;
  const nameO = !isX ? thisName : otherName;

  const lobby = (
    <div className="flex justify-center items-center flex-grow">
      <div className="bg-slate-200 p-5 rounded-lg">
        <form className="flex flex-col space-y-2" onSubmit={(event) =>{
          const input = event.target.querySelector("input");
          event.preventDefault();
          if (input.value) {
            setThisName(input.value);
            input.value = '';
            socket.connect();
            setStatus(Status.queue);
          }
        }}>
          <input placeholder="username" className="text-center"></input>
          <button className="bg-gray-100">Join Queue</button>
        </form>
      </div>
    </div>
  );
  
  const queue = (
    <div className="flex justify-center items-center flex-grow">
      <div className="flex flex-col justify-center items-center" >
        <Image src={walkingPenguin} width={300} height={300} alt="walking penguin"/>
        <span>In Queue</span>
      </div>
    </div>
  );

  const game = (
    <div>
      <Game
        nameX={nameX}
        nameO={nameO}
        isMultiplayer={true}
        isX={isX}
      />
    </div>
  );
  
  let curr;
  switch(status) {
    case Status.lobby:
      curr = lobby;
      break;
    case Status.queue:
      curr = queue;
      break;
    case Status.game:
      curr = game;
      break;
  }

  return (
    <div className="h-dvh flex flex-col">
        <Header className="flex flex-grow" mode="Mutliplayer"/>
      { curr }
    </div>
  );
}