"use client";
import { useState, useEffect } from "react";
import { socket } from "../socket";
import Top from "../../components/top";
import ChatBox from "../../components/chat";

const Status = Object.freeze({
  lobby: 0,
  queue: 1,
  game: 2
});

export default function Page() {
  const [status, setStatus] = useState(Status.lobby);


  useEffect(() => {
    const onJoin = (id1, id2) => {
      setStatus(Status.game);
    }
    
    socket.on("join", onJoin);
    
    return () => { //cleanup
      socket.off("join", onJoin);
    }

  }, []);

  const game = (
    <h1>In Game</h1>
  );
  
  const lobby = (
    <div className="bg-slate-200 p-5 rounded-lg">
      <form className="flex flex-col space-y-2" onSubmit={(event) =>{
        const input = event.target.querySelector("input");
        event.preventDefault();
        if (input.value) {
          socket.playerName = input.value;
        }
        else {
          socket.playerName = "default name";
        }
        socket.connect();
        setStatus(Status.queue);
      }}>
        <input placeholder="username" className="text-center"></input>
        <button className="bg-gray-100">Join Queue</button>
      </form>
    </div>
  );
  
  const queue = (
    <h1>In Queue</h1>
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
      <Top mode="Mutliplayer"/>
      <div className="flex justify-center items-center flex-grow">
        { curr }
      </div>
    </div>
  );
}